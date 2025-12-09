const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'vibe-stream-secret',
    resave: false,
    saveUninitialized: false
}));

mongoose.connect('mongodb://localhost:27017/plataformaMusica')
.then(() => console.log("✅ VibeStream Conectado!"))
.catch(err => console.error(err));

// --- MODELS ---
const Musica = mongoose.model('Musica', {
    titulo: String,
    artista: String,
    genero: String,
    album: String,
    ano: Number,
    duracao: String
});

const Usuario = mongoose.model('Usuario', {
    login: String,
    senha: String,
    nome: String,
    generosPreferidos: [String],
    favoritas: [String]
});

const requireLogin = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    next();
};

// --- ROTAS DE AUTENTICAÇÃO ---
app.get('/login', (req, res) => res.render('login', { erro: null }));

app.post('/login', async (req, res) => {
    const { login, senha } = req.body;
    const user = await Usuario.findOne({ login, senha });
    if (user) {
        req.session.userId = user._id;
        return res.redirect('/');
    }
    res.render('login', { erro: "Dados incorretos." });
});

app.get('/signup', (req, res) => res.render('signup'));

app.post('/signup', async (req, res) => {
    const { nome, login, senha, generos } = req.body;
    let lista = generos || [];
    if (!Array.isArray(lista)) lista = [lista];

    const user = await Usuario.create({ nome, login, senha, generosPreferidos: lista, favoritas: [] });
    req.session.userId = user._id;
    res.redirect('/');
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

// --- ROTAS DA APLICAÇÃO (FUNCIONALIDADES) ---

// 1. HOME (🏠 Início)
app.get('/', requireLogin, async (req, res) => {
    const usuario = await Usuario.findById(req.session.userId);
    const todas = await Musica.find().sort({ artista: 1 });

    // Sugestões
    const recs = todas.filter(m =>
    usuario.generosPreferidos.includes(m.genero) &&
    !usuario.favoritas.includes(m._id.toString())
    );

    res.render('index', { page: 'home', usuario, musicas: todas, recomendacoes: recs });
});

// 2. BUSCA (🔍 Buscar)
app.get('/search', requireLogin, async (req, res) => {
    const usuario = await Usuario.findById(req.session.userId);
    const query = req.query.q;
    let resultados = [];

    if (query) {
        // Busca inteligente (case insensitive) no Título OU Artista
        resultados = await Musica.find({
            $or: [
                { titulo: { $regex: query, $options: 'i' } },
                { artista: { $regex: query, $options: 'i' } }
            ]
        });
    }

    res.render('index', { page: 'search', usuario, resultados, query });
});

// 3. BIBLIOTECA (📚 Sua Biblioteca)
app.get('/library', requireLogin, async (req, res) => {
    const usuario = await Usuario.findById(req.session.userId);

    // Busca APENAS as músicas que estão na lista de favoritas do usuário
    const minhasMusicas = await Musica.find({
        '_id': { $in: usuario.favoritas }
    });

    res.render('index', { page: 'library', usuario, minhasMusicas });
});

// 4. PERFIL (Configurações)
app.get('/profile', requireLogin, async (req, res) => {
    const usuario = await Usuario.findById(req.session.userId);
    res.render('index', { page: 'profile', usuario });
});

// AÇÃO: Atualizar Gêneros
app.post('/update-genres', requireLogin, async (req, res) => {
    const usuario = await Usuario.findById(req.session.userId);
    let novosGeneros = req.body.generos || [];
    if (!Array.isArray(novosGeneros)) novosGeneros = [novosGeneros];

    usuario.generosPreferidos = novosGeneros;
    await usuario.save();
    res.redirect('/profile'); // Volta pro perfil
});

// AÇÃO: Favoritar
app.post('/favoritar/:id', requireLogin, async (req, res) => {
    const usuario = await Usuario.findById(req.session.userId);
    const id = req.params.id;
    const returnUrl = req.query.return || '/'; // Volta pra onde estava

    if (usuario.favoritas.includes(id)) {
        usuario.favoritas = usuario.favoritas.filter(fav => fav !== id);
    } else {
        usuario.favoritas.push(id);
    }
    await usuario.save();
    res.redirect(returnUrl);
});

// AÇÃO: Adicionar Música
app.post('/musica', requireLogin, async (req, res) => {
    await Musica.create(req.body);
    res.redirect('/');
});

app.listen(3000, () => console.log('🚀 http://localhost:3000'));
