const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// CONEXÃO COM O DOCKER (Porta 27017)
mongoose.connect('mongodb://localhost:27017/plataformaMusica')
.then(() => console.log("✅ Conectado ao MongoDB!"))
.catch(err => console.error("Erro ao conectar:", err));

// MODELO (Como os dados são salvos)
const Musica = mongoose.model('Musica', {
    titulo: String,
    artista: String,
    genero: String
});

// ROTA PRINCIPAL (Mostra o site)
app.get('/', async (req, res) => {
    const musicas = await Musica.find(); // Busca tudo no banco
    res.render('index', { musicas });
});

// ROTA DE CADASTRO (Salva no banco)
app.post('/adicionar', async (req, res) => {
    await Musica.create(req.body);
    res.redirect('/');
});

app.listen(3000, () => console.log('🚀 Servidor rodando em http://localhost:3000'));
