const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'vibe-secret-pro',
    resave: false,
    saveUninitialized: false
}));

mongoose.connect('mongodb://localhost:27017/plataformaMusica')
.then(() => console.log("✅ Servidor Conectado!"))
.catch(err => console.error(err));

// --- SCHEMAS ---
const ArtistaSchema = new mongoose.Schema({ nome: String, generoBase: String });
const Artista = mongoose.model('Artista', ArtistaSchema);

const MusicaSchema = new mongoose.Schema({
    titulo: String,
    capa: { type: String, default: 'https://via.placeholder.com/150' },
    artista: { type: mongoose.Schema.Types.ObjectId, ref: 'Artista' },
    genero: String,
    album: String,
    ano: Number,
    duracao: String
});
const Musica = mongoose.model('Musica', MusicaSchema);

const UsuarioSchema = new mongoose.Schema({
    login: String, senha: String, nome: String,
    generosPreferidos: [String],
    favoritas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Musica' }]
});
const Usuario = mongoose.model('Usuario', UsuarioSchema);

// Middleware
const requireLogin = (req, res, next) => {
    if (!req.session.userId) return res.redirect('/login');
    next();
};

// --- ROTAS DE LOGIN ---
app.get('/login', (req, res) => res.render('login', { erro: null }));
app.post('/login', async (req, res) => {
    const user = await Usuario.findOne({ login: req.body.login, senha: req.body.senha });
    if (user) { req.session.userId = user._id; return res.redirect('/'); }
    res.render('login', { erro: "Login incorreto" });
});
app.get('/logout', (req, res) => { req.session.destroy(); res.redirect('/login'); });
app.get('/signup', (req, res) => res.render('signup'));
app.post('/signup', async (req, res) => {
    const { nome, login, senha, generos } = req.body;
    let lista = generos || []; if (!Array.isArray(lista)) lista = [lista];
    const user = await Usuario.create({ nome, login, senha, generosPreferidos: lista, favoritas: [] });
    req.session.userId = user._id; res.redirect('/');
});

// --- ROTAS PRINCIPAIS ---

// 1. HOME (CORRIGIDA)
app.get('/', requireLogin, async (req, res) => {
    const usuario = await Usuario.findById(req.session.userId).populate('favoritas');
    const todas = await Musica.find().populate('artista').sort({ titulo: 1 });

    // --- CORREÇÃO DO FAVORITAR ---
    // Criamos uma lista SIMPLES de IDs (Strings) para o frontend saber o que pintar de verde
    const idsFavoritos = usuario.favoritas.map(f => f._id.toString());

    // Algoritmo de Recomendação
    let generosInteresse = new Set(usuario.generosPreferidos);
    usuario.favoritas.forEach(fav => {
        if(fav.genero) generosInteresse.add(fav.genero);
    });

        const recs = todas.filter(m =>
        generosInteresse.has(m.genero) &&
        !idsFavoritos.includes(m._id.toString())
        );

        res.render('index', { page: 'home', usuario, musicas: todas, recomendacoes: recs, idsFavoritos });
});

// 2. BUSCA (CORRIGIDA)
app.get('/search', requireLogin, async (req, res) => {
    const usuario = await Usuario.findById(req.session.userId);
    const query = req.query.q;
    let resultados = [];
    if (query) {
        resultados = await Musica.find({ titulo: { $regex: query, $options: 'i' } }).populate('artista');
    }

    // Gera a lista de IDs para verificar os botões
    const idsFavoritos = usuario.favoritas.map(f => f.toString());

    res.render('index', { page: 'search', usuario, resultados, query, idsFavoritos });
});

// 3. BIBLIOTECA
app.get('/library', requireLogin, async (req, res) => {
    const usuario = await Usuario.findById(req.session.userId).populate({
        path: 'favoritas',
        populate: { path: 'artista' }
    });
    // Aqui não precisa de idsFavoritos pois tudo que está aqui é favorito
    res.render('index', { page: 'library', usuario, minhasMusicas: usuario.favoritas });
});

// 4. PERFIL
app.get('/profile', requireLogin, async (req, res) => {
    const usuario = await Usuario.findById(req.session.userId);
    res.render('index', { page: 'profile', usuario });
});

// --- AÇÕES ---
app.post('/update-genres', requireLogin, async (req, res) => {
    const usuario = await Usuario.findById(req.session.userId);
    let gen = req.body.generos || [];
    if(!Array.isArray(gen)) gen = [gen];
    usuario.generosPreferidos = gen;
    await usuario.save();
    res.redirect('/profile');
});

// AÇÃO DE FAVORITAR (CORRIGIDA E MAIS SEGURA)
app.post('/favoritar/:id', requireLogin, async (req, res) => {
    const usuario = await Usuario.findById(req.session.userId);
    const id = req.params.id;

    // Verifica se já existe convertendo tudo para string para evitar erro
    const jaTem = usuario.favoritas.some(f => f.toString() === id);

    if (jaTem) {
        // Remove (Pull)
        usuario.favoritas.pull(id);
    } else {
        // Adiciona (Push)
        usuario.favoritas.push(id);
    }

    await usuario.save();
    res.redirect(req.query.return || '/');
});

app.listen(3000, () => console.log('🚀 Servidor pronto: http://localhost:3000'));
