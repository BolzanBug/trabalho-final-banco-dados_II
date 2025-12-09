const mongoose = require('mongoose');

// Conexão
mongoose.connect('mongodb://localhost:27017/plataformaMusica')
.then(() => console.log("🔌 Conectado! Preparando injeção massiva de dados..."))
.catch(err => console.error(err));

// Schemas (Iguais ao server.js)
const Musica = mongoose.model('Musica', {
    titulo: String,
    artista: String,
    genero: String,
    album: String,
    ano: Number,      // Novo campo
    duracao: String   // Novo campo
});

const Usuario = mongoose.model('Usuario', {
    login: String,    // Usaremos para o login "Bolzan"
    senha: String,    // Campo de senha adicionado
    nome: String,
    generosPreferidos: [String],
    favoritas: [String]
});

// --- LISTA GIGANTE DE MÚSICAS ---
const musicasData = [
    // ROCK
    { titulo: "Bohemian Rhapsody", artista: "Queen", genero: "Rock", album: "A Night at the Opera", ano: 1975, duracao: "5:55" },
{ titulo: "Don't Stop Me Now", artista: "Queen", genero: "Rock", album: "Jazz", ano: 1978, duracao: "3:29" },
{ titulo: "We Will Rock You", artista: "Queen", genero: "Rock", album: "News of the World", ano: 1977, duracao: "2:01" },
{ titulo: "Sweet Child O' Mine", artista: "Guns N' Roses", genero: "Rock", album: "Appetite for Destruction", ano: 1987, duracao: "5:56" },
{ titulo: "Paradise City", artista: "Guns N' Roses", genero: "Rock", album: "Appetite for Destruction", ano: 1987, duracao: "6:46" },
{ titulo: "November Rain", artista: "Guns N' Roses", genero: "Rock", album: "Use Your Illusion I", ano: 1991, duracao: "8:57" },
{ titulo: "Smells Like Teen Spirit", artista: "Nirvana", genero: "Rock", album: "Nevermind", ano: 1991, duracao: "5:01" },
{ titulo: "Come As You Are", artista: "Nirvana", genero: "Rock", album: "Nevermind", ano: 1991, duracao: "3:39" },
{ titulo: "Back in Black", artista: "AC/DC", genero: "Rock", album: "Back in Black", ano: 1980, duracao: "4:15" },
{ titulo: "Highway to Hell", artista: "AC/DC", genero: "Rock", album: "Highway to Hell", ano: 1979, duracao: "3:28" },
{ titulo: "Hotel California", artista: "Eagles", genero: "Rock", album: "Hotel California", ano: 1976, duracao: "6:30" },
{ titulo: "Stairway to Heaven", artista: "Led Zeppelin", genero: "Rock", album: "Led Zeppelin IV", ano: 1971, duracao: "8:02" },
{ titulo: "Numb", artista: "Linkin Park", genero: "Rock", album: "Meteora", ano: 2003, duracao: "3:07" },
{ titulo: "In The End", artista: "Linkin Park", genero: "Rock", album: "Hybrid Theory", ano: 2000, duracao: "3:36" },
{ titulo: "Seven Nation Army", artista: "The White Stripes", genero: "Rock", album: "Elephant", ano: 2003, duracao: "3:51" },

// SERTANEJO
{ titulo: "Evidências", artista: "Chitãozinho & Xororó", genero: "Sertanejo", album: "Cowboy do Asfalto", ano: 1990, duracao: "4:39" },
{ titulo: "Fio de Cabelo", artista: "Chitãozinho & Xororó", genero: "Sertanejo", album: "Somos Apaixonados", ano: 1982, duracao: "2:52" },
{ titulo: "Sinônimos", artista: "Chitãozinho & Xororó", genero: "Sertanejo", album: "Aqui o Sistema é Bruto", ano: 2004, duracao: "4:43" },
{ titulo: "Batom de Cereja", artista: "Israel & Rodolffo", genero: "Sertanejo", album: "Aqui e Agora", ano: 2021, duracao: "2:19" },
{ titulo: "Esqueça-me Se For Capaz", artista: "Marília Mendonça", genero: "Sertanejo", album: "Patroas 35%", ano: 2021, duracao: "2:57" },
{ titulo: "Infiel", artista: "Marília Mendonça", genero: "Sertanejo", album: "Marília Mendonça Ao Vivo", ano: 2016, duracao: "3:22" },
{ titulo: "Todo Mundo Vai Sofrer", artista: "Marília Mendonça", genero: "Sertanejo", album: "Todos os Cantos", ano: 2019, duracao: "2:34" },
{ titulo: "Dormi na Praça", artista: "Bruno & Marrone", genero: "Sertanejo", album: "Acústico", ano: 2001, duracao: "2:44" },
{ titulo: "Boate Azul", artista: "Bruno & Marrone", genero: "Sertanejo", album: "Acústico", ano: 2001, duracao: "3:00" },
{ titulo: "Ai Se Eu Te Pego", artista: "Michel Teló", genero: "Sertanejo", album: "Na Balada", ano: 2011, duracao: "2:50" },
{ titulo: "Notificação Preferida", artista: "Zé Neto & Cristiano", genero: "Sertanejo", album: "Esquece O Mundo Lá Fora", ano: 2018, duracao: "3:05" },
{ titulo: "Largado às Traças", artista: "Zé Neto & Cristiano", genero: "Sertanejo", album: "Esquece O Mundo Lá Fora", ano: 2018, duracao: "3:29" },

// POP
{ titulo: "Thriller", artista: "Michael Jackson", genero: "Pop", album: "Thriller", ano: 1982, duracao: "5:57" },
{ titulo: "Billie Jean", artista: "Michael Jackson", genero: "Pop", album: "Thriller", ano: 1982, duracao: "4:54" },
{ titulo: "Beat It", artista: "Michael Jackson", genero: "Pop", album: "Thriller", ano: 1982, duracao: "4:18" },
{ titulo: "Shape of You", artista: "Ed Sheeran", genero: "Pop", album: "Divide", ano: 2017, duracao: "3:53" },
{ titulo: "Perfect", artista: "Ed Sheeran", genero: "Pop", album: "Divide", ano: 2017, duracao: "4:23" },
{ titulo: "Blinding Lights", artista: "The Weeknd", genero: "Pop", album: "After Hours", ano: 2019, duracao: "3:20" },
{ titulo: "Save Your Tears", artista: "The Weeknd", genero: "Pop", album: "After Hours", ano: 2020, duracao: "3:35" },
{ titulo: "Levitating", artista: "Dua Lipa", genero: "Pop", album: "Future Nostalgia", ano: 2020, duracao: "3:23" },
{ titulo: "Don't Start Now", artista: "Dua Lipa", genero: "Pop", album: "Future Nostalgia", ano: 2019, duracao: "3:03" },
{ titulo: "As It Was", artista: "Harry Styles", genero: "Pop", album: "Harry's House", ano: 2022, duracao: "2:47" },
{ titulo: "Bad Romance", artista: "Lady Gaga", genero: "Pop", album: "The Fame Monster", ano: 2009, duracao: "4:54" },
{ titulo: "Poker Face", artista: "Lady Gaga", genero: "Pop", album: "The Fame", ano: 2008, duracao: "3:57" },

// HIP HOP / RAP
{ titulo: "Lose Yourself", artista: "Eminem", genero: "HipHop", album: "8 Mile", ano: 2002, duracao: "5:26" },
{ titulo: "Without Me", artista: "Eminem", genero: "HipHop", album: "The Eminem Show", ano: 2002, duracao: "4:50" },
{ titulo: "The Real Slim Shady", artista: "Eminem", genero: "HipHop", album: "The Marshall Mathers LP", ano: 2000, duracao: "4:44" },
{ titulo: "God's Plan", artista: "Drake", genero: "HipHop", album: "Scorpion", ano: 2018, duracao: "3:18" },
{ titulo: "Hotline Bling", artista: "Drake", genero: "HipHop", album: "Views", ano: 2015, duracao: "4:27" },
{ titulo: "SICKO MODE", artista: "Travis Scott", genero: "HipHop", album: "Astroworld", ano: 2018, duracao: "5:12" },
{ titulo: "Goosebumps", artista: "Travis Scott", genero: "HipHop", album: "Birds in the Trap", ano: 2016, duracao: "4:03" },
{ titulo: "Nuthin' But A G Thang", artista: "Dr. Dre", genero: "HipHop", album: "The Chronic", ano: 1992, duracao: "3:58" },
{ titulo: "Still D.R.E.", artista: "Dr. Dre", genero: "HipHop", album: "2001", ano: 1999, duracao: "4:30" },
{ titulo: "Gangsta's Paradise", artista: "Coolio", genero: "HipHop", album: "Dangerous Minds", ano: 1995, duracao: "4:00" },

// ELETRONICA
{ titulo: "Wake Me Up", artista: "Avicii", genero: "Eletronica", album: "True", ano: 2013, duracao: "4:07" },
{ titulo: "Levels", artista: "Avicii", genero: "Eletronica", album: "Levels", ano: 2011, duracao: "3:19" },
{ titulo: "Titanium", artista: "David Guetta", genero: "Eletronica", album: "Nothing but the Beat", ano: 2011, duracao: "4:05" },
{ titulo: "Animals", artista: "Martin Garrix", genero: "Eletronica", album: "Animals", ano: 2013, duracao: "2:56" },
{ titulo: "Clarity", artista: "Zedd", genero: "Eletronica", album: "Clarity", ano: 2012, duracao: "4:31" },
{ titulo: "Don't You Worry Child", artista: "Swedish House Mafia", genero: "Eletronica", album: "Until Now", ano: 2012, duracao: "3:32" },
{ titulo: "One More Time", artista: "Daft Punk", genero: "Eletronica", album: "Discovery", ano: 2000, duracao: "5:20" },
{ titulo: "Get Lucky", artista: "Daft Punk", genero: "Eletronica", album: "Random Access Memories", ano: 2013, duracao: "6:09" },

// INDIE / ALTERNATIVO (Extra para volume)
{ titulo: "Do I Wanna Know?", artista: "Arctic Monkeys", genero: "Indie", album: "AM", ano: 2013, duracao: "4:32" },
{ titulo: "R U Mine?", artista: "Arctic Monkeys", genero: "Indie", album: "AM", ano: 2012, duracao: "3:21" },
{ titulo: "Fluorescent Adolescent", artista: "Arctic Monkeys", genero: "Indie", album: "Favourite Worst Nightmare", ano: 2007, duracao: "2:57" },
{ titulo: "Mr. Brightside", artista: "The Killers", genero: "Indie", album: "Hot Fuss", ano: 2004, duracao: "3:42" },
{ titulo: "Somebody Told Me", artista: "The Killers", genero: "Indie", album: "Hot Fuss", ano: 2004, duracao: "3:17" },
{ titulo: "Pumped Up Kicks", artista: "Foster The People", genero: "Indie", album: "Torches", ano: 2010, duracao: "4:00" },
{ titulo: "Sweater Weather", artista: "The Neighbourhood", genero: "Indie", album: "I Love You.", ano: 2013, duracao: "4:00" },
{ titulo: "Sex on Fire", artista: "Kings of Leon", genero: "Indie", album: "Only by the Night", ano: 2008, duracao: "3:23" }
];

const popular = async () => {
    try {
        await Musica.deleteMany({});
        await Usuario.deleteMany({});
        console.log("🗑️  Banco limpo.");

        // Inserir todas as músicas
        const docs = await Musica.insertMany(musicasData);
        console.log(`🎵 ${docs.length} músicas inseridas.`);

        // --- CRIAR SEU USUÁRIO BOLZAN ---
        // Vamos dar alguns favoritos iniciais para ele
        const favoritosIniciais = docs.slice(0, 3).map(m => m._id); // As 3 primeiras músicas

        await Usuario.create({
            nome: "Gabriel Bolzan",
            login: "Bolzan",
            senha: "1qaz",  // Senha definida
            generosPreferidos: ["Rock", "HipHop", "Eletronica"], // Gosto eclético
            favoritas: favoritosIniciais
        });
        console.log("👤 Usuário 'Bolzan' criado com a senha '1qaz'.");

        console.log("✅ TUDO PRONTO! Reinicie o servidor.");
        process.exit();
    } catch (error) {
        console.error("Erro:", error);
        process.exit(1);
    }
};

popular();
