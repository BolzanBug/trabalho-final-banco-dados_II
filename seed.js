const mongoose = require('mongoose');

// Conecta no Banco
mongoose.connect('mongodb://localhost:27017/plataformaMusica')
.then(() => console.log("🔌 Conectado! Baixando capas ESTÁVEIS (Wikimedia/Amazon)..."))
.catch(err => console.error(err));

// --- SCHEMAS ---
const Artista = mongoose.model('Artista', { nome: String, generoBase: String });

const Musica = mongoose.model('Musica', {
    titulo: String,
    album: String,
    ano: Number,
    duracao: String,
    artista: { type: mongoose.Schema.Types.ObjectId, ref: 'Artista' },
    genero: String,
    capa: String
});

const Usuario = mongoose.model('Usuario', {
    login: String, senha: String, nome: String, generosPreferidos: [String],
    favoritas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Musica' }]
});

const popular = async () => {
    try {
        await Artista.deleteMany({});
        await Musica.deleteMany({});
        await Usuario.deleteMany({});
        console.log("🗑️  Limpeza concluída.");

        // ====================================================
        // 1. CRIAR ARTISTAS
        // ====================================================
        console.log("🎤 Criando Artistas...");

        const queen = await Artista.create({ nome: "Queen", generoBase: "Rock" });
        const guns = await Artista.create({ nome: "Guns N' Roses", generoBase: "Rock" });
        const acdc = await Artista.create({ nome: "AC/DC", generoBase: "Rock" });
        const arctic = await Artista.create({ nome: "Arctic Monkeys", generoBase: "Indie" });
        const rhcp = await Artista.create({ nome: "Red Hot Chili Peppers", generoBase: "Rock" });
        const coldplay = await Artista.create({ nome: "Coldplay", generoBase: "Indie" });
        const nirvana = await Artista.create({ nome: "Nirvana", generoBase: "Rock" });
        const legiao = await Artista.create({ nome: "Legião Urbana", generoBase: "Rock" });
        const cbjr = await Artista.create({ nome: "Charlie Brown Jr.", generoBase: "Rock" });

        const chitao = await Artista.create({ nome: "Chitãozinho & Xororó", generoBase: "Sertanejo" });
        const marilia = await Artista.create({ nome: "Marília Mendonça", generoBase: "Sertanejo" });
        const zeNeto = await Artista.create({ nome: "Zé Neto & Cristiano", generoBase: "Sertanejo" });
        const jorge = await Artista.create({ nome: "Jorge & Mateus", generoBase: "Sertanejo" });

        const mj = await Artista.create({ nome: "Michael Jackson", generoBase: "Pop" });
        const weeknd = await Artista.create({ nome: "The Weeknd", generoBase: "Pop" });
        const dua = await Artista.create({ nome: "Dua Lipa", generoBase: "Pop" });
        const bruno = await Artista.create({ nome: "Bruno Mars", generoBase: "Pop" });
        const taylor = await Artista.create({ nome: "Taylor Swift", generoBase: "Pop" });

        const eminem = await Artista.create({ nome: "Eminem", generoBase: "HipHop" });
        const drake = await Artista.create({ nome: "Drake", generoBase: "HipHop" });

        const avicii = await Artista.create({ nome: "Avicii", generoBase: "Eletronica" });
        const daft = await Artista.create({ nome: "Daft Punk", generoBase: "Eletronica" });
        const calvin = await Artista.create({ nome: "Calvin Harris", generoBase: "Eletronica" });

        // ====================================================
        // 2. CRIAR MÚSICAS (Links Wikipedia/Amazon que não quebram)
        // ====================================================
        console.log("🎵 Inserindo Músicas...");

        const lista = [
            // --- QUEEN ---
            { titulo: "Bohemian Rhapsody", artista: queen._id, album: "A Night at the Opera", ano: 1975, duracao: "5:55", genero: "Rock", capa: "https://upload.wikimedia.org/wikipedia/en/4/4d/Queen_A_Night_At_The_Opera.png" },
            { titulo: "Don't Stop Me Now", artista: queen._id, album: "Jazz", ano: 1978, duracao: "3:29", genero: "Rock", capa: "https://upload.wikimedia.org/wikipedia/en/0/06/Queen_Jazz.png" },
            { titulo: "We Will Rock You", artista: queen._id, album: "News of the World", ano: 1977, duracao: "2:01", genero: "Rock", capa: "https://upload.wikimedia.org/wikipedia/en/e/ea/Queen_News_Of_The_World.png" },
            { titulo: "I Want to Break Free", artista: queen._id, album: "The Works", ano: 1984, duracao: "4:18", genero: "Rock", capa: "https://upload.wikimedia.org/wikipedia/en/3/3d/Queen_The_Works.png" },

            // --- GUNS ---
            { titulo: "Sweet Child O' Mine", artista: guns._id, album: "Appetite for Destruction", ano: 1987, duracao: "5:56", genero: "Rock", capa: "https://upload.wikimedia.org/wikipedia/en/3/39/GunsnRosesAppetiteforDestructionalbumcover.jpg" },
            { titulo: "November Rain", artista: guns._id, album: "Use Your Illusion I", ano: 1991, duracao: "8:57", genero: "Rock", capa: "https://upload.wikimedia.org/wikipedia/en/b/bd/Guns_n_Roses_Use_Your_Illusion_I.jpg" },
            { titulo: "Welcome to the Jungle", artista: guns._id, album: "Appetite for Destruction", ano: 1987, duracao: "4:34", genero: "Rock", capa: "https://upload.wikimedia.org/wikipedia/en/3/39/GunsnRosesAppetiteforDestructionalbumcover.jpg" },

            // --- AC/DC ---
            { titulo: "Back in Black", artista: acdc._id, album: "Back in Black", ano: 1980, duracao: "4:15", genero: "Rock", capa: "https://upload.wikimedia.org/wikipedia/commons/3/3e/ACDC_Back_in_Black_cover.svg" },
            { titulo: "Highway to Hell", artista: acdc._id, album: "Highway to Hell", ano: 1979, duracao: "3:28", genero: "Rock", capa: "https://upload.wikimedia.org/wikipedia/en/a/ac/Acdc_Highway_to_Hell.JPG" },

            // --- NIRVANA ---
            { titulo: "Smells Like Teen Spirit", artista: nirvana._id, album: "Nevermind", ano: 1991, duracao: "5:01", genero: "Rock", capa: "https://upload.wikimedia.org/wikipedia/en/b/b7/NirvanaNevermindalbum.jpg" },
            { titulo: "Come As You Are", artista: nirvana._id, album: "Nevermind", ano: 1991, duracao: "3:39", genero: "Rock", capa: "https://upload.wikimedia.org/wikipedia/en/b/b7/NirvanaNevermindalbum.jpg" },

            // --- ARCTIC MONKEYS ---
            { titulo: "Do I Wanna Know?", artista: arctic._id, album: "AM", ano: 2013, duracao: "4:32", genero: "Indie", capa: "https://upload.wikimedia.org/wikipedia/en/0/04/Arctic_Monkeys_-_AM.png" },
            { titulo: "R U Mine?", artista: arctic._id, album: "AM", ano: 2012, duracao: "3:21", genero: "Indie", capa: "https://upload.wikimedia.org/wikipedia/en/0/04/Arctic_Monkeys_-_AM.png" },
            { titulo: "505", artista: arctic._id, album: "Favourite Worst Nightmare", ano: 2007, duracao: "4:13", genero: "Indie", capa: "https://upload.wikimedia.org/wikipedia/en/f/f6/Arctic_Monkeys_-_Favourite_Worst_Nightmare.png" },

            // --- RED HOT ---
            { titulo: "Californication", artista: rhcp._id, album: "Californication", ano: 1999, duracao: "5:29", genero: "Rock", capa: "https://upload.wikimedia.org/wikipedia/en/d/df/RedHotChiliPeppersCalifornication.jpg" },
            { titulo: "Otherside", artista: rhcp._id, album: "Californication", ano: 1999, duracao: "4:15", genero: "Rock", capa: "https://upload.wikimedia.org/wikipedia/en/d/df/RedHotChiliPeppersCalifornication.jpg" },

            // --- COLDPLAY ---
            { titulo: "Yellow", artista: coldplay._id, album: "Parachutes", ano: 2000, duracao: "4:29", genero: "Indie", capa: "https://upload.wikimedia.org/wikipedia/en/5/57/Coldplayparachutesalbumcover.jpg" },
            { titulo: "The Scientist", artista: coldplay._id, album: "A Rush of Blood to the Head", ano: 2002, duracao: "5:09", genero: "Indie", capa: "https://upload.wikimedia.org/wikipedia/en/6/6e/Coldplay_-_A_Rush_of_Blood_to_the_Head.jpg" },
            { titulo: "Viva La Vida", artista: coldplay._id, album: "Viva La Vida", ano: 2008, duracao: "4:02", genero: "Indie", capa: "https://upload.wikimedia.org/wikipedia/en/2/25/Viva_la_Vida_or_Death_and_All_His_Friends.jpg" },

            // --- LEGIÃO URBANA ---
            { titulo: "Tempo Perdido", artista: legiao._id, album: "Dois", ano: 1986, duracao: "5:02", genero: "Rock", capa: "https://upload.wikimedia.org/wikipedia/pt/4/43/Dois_Legi%C3%A3o_Urbana.jpg" },
            { titulo: "Pais e Filhos", artista: legiao._id, album: "As Quatro Estações", ano: 1989, duracao: "5:08", genero: "Rock", capa: "https://upload.wikimedia.org/wikipedia/pt/8/85/Legiao_Urbana_As_Quatro_Estacoes.jpg" },
            { titulo: "Faroeste Caboclo", artista: legiao._id, album: "Que País É Este", ano: 1987, duracao: "9:03", genero: "Rock", capa: "https://upload.wikimedia.org/wikipedia/pt/2/22/Legi%C3%A3o_Urbana_-_Que_Pa%C3%ADs_%C3%89_Este_1978-1987.jpg" },

            // --- CHARLIE BROWN JR ---
            { titulo: "Só os Loucos Sabem", artista: cbjr._id, album: "Camisa 10", ano: 2009, duracao: "3:30", genero: "Rock", capa: "https://upload.wikimedia.org/wikipedia/pt/2/23/Camisa10jogabonito.jpg" },
            { titulo: "Dias de Luta, Dias de Glória", artista: cbjr._id, album: "Imunidade Musical", ano: 2005, duracao: "2:25", genero: "Rock", capa: "https://upload.wikimedia.org/wikipedia/pt/0/05/Imunidade_Musical_capa.jpg" },
            { titulo: "Céu Azul", artista: cbjr._id, album: "Música Popular Caiçara", ano: 2012, duracao: "3:20", genero: "Rock", capa: "https://upload.wikimedia.org/wikipedia/pt/8/8f/MusicaPopularCaicara_Capa.jpg" },

            // --- SERTANEJO (Usando capas genéricas de alta qualidade da Amazon para evitar erros) ---
            { titulo: "Evidências", artista: chitao._id, album: "Cowboy do Asfalto", ano: 1990, duracao: "4:39", genero: "Sertanejo", capa: "https://m.media-amazon.com/images/I/71R23c8-sUL._AC_SL1200_.jpg" },
            { titulo: "Sinônimos", artista: chitao._id, album: "Aqui o Sistema é Bruto", ano: 2004, duracao: "4:43", genero: "Sertanejo", capa: "https://m.media-amazon.com/images/I/71R23c8-sUL._AC_SL1200_.jpg" },

            { titulo: "Infiel", artista: marilia._id, album: "Ao Vivo", ano: 2016, duracao: "3:22", genero: "Sertanejo", capa: "https://m.media-amazon.com/images/I/71wLpWv-BBL._AC_SL1200_.jpg" },
            { titulo: "Todo Mundo Vai Sofrer", artista: marilia._id, album: "Todos os Cantos", ano: 2019, duracao: "2:34", genero: "Sertanejo", capa: "https://m.media-amazon.com/images/I/91tA4a4VwIL._AC_SL1500_.jpg" },
            { titulo: "Supera", artista: marilia._id, album: "Todos os Cantos", ano: 2019, duracao: "2:27", genero: "Sertanejo", capa: "https://m.media-amazon.com/images/I/91tA4a4VwIL._AC_SL1500_.jpg" },

            { titulo: "Largado às Traças", artista: zeNeto._id, album: "Esquece O Mundo Lá Fora", ano: 2018, duracao: "3:29", genero: "Sertanejo", capa: "https://m.media-amazon.com/images/I/81+21gQx0+L._AC_SL1500_.jpg" },
            { titulo: "Notificação Preferida", artista: zeNeto._id, album: "Esquece O Mundo Lá Fora", ano: 2018, duracao: "3:05", genero: "Sertanejo", capa: "https://m.media-amazon.com/images/I/81+21gQx0+L._AC_SL1500_.jpg" },

            { titulo: "Pode Chorar", artista: jorge._id, album: "Ao Vivo em Goiânia", ano: 2007, duracao: "3:05", genero: "Sertanejo", capa: "https://m.media-amazon.com/images/I/61y4+B5jD4L._AC_SL1200_.jpg" },
            { titulo: "Amo Noite e Dia", artista: jorge._id, album: "Aí Já Era", ano: 2010, duracao: "3:20", genero: "Sertanejo", capa: "https://m.media-amazon.com/images/I/71gG+v9q+EL._AC_SL1200_.jpg" },

            // --- POP ---
            { titulo: "Thriller", artista: mj._id, album: "Thriller", ano: 1982, duracao: "5:57", genero: "Pop", capa: "https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png" },
            { titulo: "Billie Jean", artista: mj._id, album: "Thriller", ano: 1982, duracao: "4:54", genero: "Pop", capa: "https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png" },
            { titulo: "Beat It", artista: mj._id, album: "Thriller", ano: 1982, duracao: "4:18", genero: "Pop", capa: "https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png" },

            { titulo: "Blinding Lights", artista: weeknd._id, album: "After Hours", ano: 2019, duracao: "3:20", genero: "Pop", capa: "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Weeknd_-_After_Hours.png" },
            { titulo: "Save Your Tears", artista: weeknd._id, album: "After Hours", ano: 2020, duracao: "3:35", genero: "Pop", capa: "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Weeknd_-_After_Hours.png" },
            { titulo: "Starboy", artista: weeknd._id, album: "Starboy", ano: 2016, duracao: "3:50", genero: "Pop", capa: "https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png" },

            { titulo: "Levitating", artista: dua._id, album: "Future Nostalgia", ano: 2020, duracao: "3:23", genero: "Pop", capa: "https://upload.wikimedia.org/wikipedia/en/f/f5/Dua_Lipa_-_Future_Nostalgia_%28Official_Album_Cover%29.png" },
            { titulo: "Don't Start Now", artista: dua._id, album: "Future Nostalgia", ano: 2019, duracao: "3:03", genero: "Pop", capa: "https://upload.wikimedia.org/wikipedia/en/f/f5/Dua_Lipa_-_Future_Nostalgia_%28Official_Album_Cover%29.png" },

            { titulo: "Uptown Funk", artista: bruno._id, album: "Uptown Special", ano: 2014, duracao: "4:30", genero: "Pop", capa: "https://upload.wikimedia.org/wikipedia/en/e/e0/Mark_Ronson_-_Uptown_Special.png" },
            { titulo: "Locked Out of Heaven", artista: bruno._id, album: "Unorthodox Jukebox", ano: 2012, duracao: "3:53", genero: "Pop", capa: "https://upload.wikimedia.org/wikipedia/en/8/89/Bruno_Mars_-_Unorthodox_Jukebox.png" },

            { titulo: "Shake It Off", artista: taylor._id, album: "1989", ano: 2014, duracao: "3:39", genero: "Pop", capa: "https://upload.wikimedia.org/wikipedia/en/f/f6/Taylor_Swift_-_1989.png" },
            { titulo: "Blank Space", artista: taylor._id, album: "1989", ano: 2014, duracao: "3:51", genero: "Pop", capa: "https://upload.wikimedia.org/wikipedia/en/f/f6/Taylor_Swift_-_1989.png" },

            // --- HIPHOP ---
            { titulo: "Lose Yourself", artista: eminem._id, album: "8 Mile", ano: 2002, duracao: "5:26", genero: "HipHop", capa: "https://upload.wikimedia.org/wikipedia/en/3/35/Eminem_-_8_Mile_Soundtrack.jpg" },
            { titulo: "Without Me", artista: eminem._id, album: "The Eminem Show", ano: 2002, duracao: "4:50", genero: "HipHop", capa: "https://upload.wikimedia.org/wikipedia/en/3/35/The_Eminem_Show.jpg" },

            { titulo: "God's Plan", artista: drake._id, album: "Scorpion", ano: 2018, duracao: "3:18", genero: "HipHop", capa: "https://upload.wikimedia.org/wikipedia/en/9/90/Scorpion_by_Drake.jpg" },
            { titulo: "Hotline Bling", artista: drake._id, album: "Views", ano: 2015, duracao: "4:27", genero: "HipHop", capa: "https://upload.wikimedia.org/wikipedia/en/a/af/Drake_-_Views_cover.jpg" },

            // --- ELETRONICA ---
            { titulo: "Wake Me Up", artista: avicii._id, album: "True", ano: 2013, duracao: "4:07", genero: "Eletronica", capa: "https://upload.wikimedia.org/wikipedia/en/4/47/Avicii_-_True.png" },
            { titulo: "Levels", artista: avicii._id, album: "Levels", ano: 2011, duracao: "3:19", genero: "Eletronica", capa: "https://upload.wikimedia.org/wikipedia/en/c/c3/Avicii_Levels.jpg" },

            { titulo: "Get Lucky", artista: daft._id, album: "RAM", ano: 2013, duracao: "6:09", genero: "Eletronica", capa: "https://upload.wikimedia.org/wikipedia/en/a/a7/Random_Access_Memories.jpg" },
            { titulo: "One More Time", artista: daft._id, album: "Discovery", ano: 2000, duracao: "5:20", genero: "Eletronica", capa: "https://upload.wikimedia.org/wikipedia/en/a/ae/Daft_Punk_-_Discovery.jpg" },

            { titulo: "Summer", artista: calvin._id, album: "Motion", ano: 2014, duracao: "3:42", genero: "Eletronica", capa: "https://upload.wikimedia.org/wikipedia/en/7/7f/Calvin_Harris_-_Motion.png" },
            { titulo: "This Is What You Came For", artista: calvin._id, album: "Single", ano: 2016, duracao: "3:42", genero: "Eletronica", capa: "https://upload.wikimedia.org/wikipedia/en/6/6e/Calvin_Harris_-_This_Is_What_You_Came_For_%28Official_Single_Cover%29.png" }
        ];

        const musicasDB = await Musica.insertMany(lista);

        // ====================================================
        // 3. CRIAR USUÁRIO BOLZAN
        // ====================================================

        // Favoritos iniciais (usando substring para garantir que ache)
        const fav1 = musicasDB.find(m => m.titulo.includes("Bohemian"))._id;
        const fav2 = musicasDB.find(m => m.titulo.includes("Evidências"))._id;
        const fav3 = musicasDB.find(m => m.titulo.includes("Tempo Perdido"))._id;

        await Usuario.create({
            nome: "Matheus Bolzan", login: "Bolzan", senha: "1qaz",
            generosPreferidos: ["Rock", "Sertanejo", "Eletronica"],
            favoritas: [fav1, fav2, fav3]
        });

        console.log("✅ TUDO PRONTO! Banco atualizado com links seguros.");
        process.exit();

    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

popular();
