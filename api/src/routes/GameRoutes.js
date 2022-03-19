const axios = require("axios");
const e = require("express");
const app = require("express").Router();
const { Genres, Videogame, API_KEY } = require("../db");

// Ruta de Juegos de la API
app.get("/apiGames", async function (req, res) {
  try {
    const promise1 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${1}&page_size=50`);
    const promise2 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${2}&page_size=50`);
    const promise3 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${3}&page_size=50`);
    
    await Promise.all([promise1, promise2, promise3])
                  .then(function(values) {
                    const apiresult = values[0].data.results.concat(values[1].data.results).concat(values[2].data.results)
                    res.send(apiresult)
                  })
  } catch (error) {
    console.log(error);
  }
});

// Ruta de juegos de la Database
app.get("/dbGames", async (req, res) => {
  let games = await Videogame.findAll();
  let arrgames = [];
  for (let i = 0; i < games.length; i++) {
    let juego = games[i];
    let genero = await juego.getGenres();
    juego = juego.dataValues;
    genero = genero.map((el) => el.dataValues.name);
    juego.genero = genero
    arrgames.push(juego);
  }
  res.send(arrgames);
  }); 
    
//- Obtener un listado de los videojuegos
//- Debe devolver solo los datos necesarios para la ruta principal
//(imagen, nombre, y géneros),Descripción,Fecha de lanzamiento,Rating,Plataformas

app.get("/games", async (req, res) => {
    let games = await Videogame.findAll();
    let arrgames = [];
    for (let i = 0; i < games.length; i++) {
      let juego = games[i];
      let genres = await juego.getGenres();
      juego = juego.dataValues;
      genres = genres.map((el) => el.dataValues);
      juego.genres = genres;
      arrgames.push(juego);
    }
    try {
      const promise1 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${1}&page_size=50`);
      const promise2 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${2}&page_size=50`);
      const promise3 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${3}&page_size=50`);
      
      await Promise.all([promise1, promise2, promise3])
                    .then(function(values) {
                      const apiresult = values[0].data.results.concat(values[1].data.results).concat(values[2].data.results)
                      const Vicio = [...arrgames, ...apiresult]
                      res.send(Vicio)
                    })
    } catch (error) {
      console.log(error);
    }
});

//Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
// - Si no existe ningún videojuego mostrar un mensaje adecuado

app.get("/games/:name", (req, res) => {
  axios.get(`http://localhost:3001/games`)
  .then((respuesta)=>{
    let total = respuesta.data;
    let tuJuego = total.filter((el) => el.name.toLowerCase().includes(req.params.name.toLowerCase()));
    if (!tuJuego.length){
      res.send([]);
    }
    if (tuJuego.length > 15){
     let tusjuegos = tuJuego.slice(0, 14);
      res.send(tusjuegos)
    }
    if(tuJuego.length > 0 && tuJuego.length < 15 ){
      res.send(tuJuego)
    }
    res.end();
  })
   .catch((error)=>{
    console.log(error);
  })
});

// Obtener el detalle de un videojuego en particular
//- Debe traer solo los datos pedidos en la ruta de detalle de videojuego
//- Incluir los géneros asociados

app.get("/game/:id", async (req,res) =>{
  const id = req.params.id;
  if(id && !id.includes('-')){
  axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
   .then((respuesta)=>{
    resultApi = respuesta.data;
    let { id, name, background_image, genres, description, released: releaseDate, rating, platforms } = resultApi;
    genres = genres.map(g => g.name);
    platforms = platforms.map(p => p.platform.name);
    const resultId = {
      id,
      name,
      background_image,
      genres,
      description,
      releaseDate,
      rating,
      platforms
    };
    res.send(resultId);
   })
   .catch((error) => {
     console.log(error)
   })
  } if (id && id.includes('-')){
    try {
      const resultDb = await Videogame.findByPk(id, {include: Genres});
      const filterGen =resultDb.genres.map(e=> e.name)
      console.log(filterGen)
      const resultId = {
        name: resultDb.name,
        genres: filterGen,
        background_image: resultDb.background_image,
        description: resultDb.description,
        releaseDate: resultDb.releaseDate,
        rating: resultDb.rating,
        platforms: resultDb.platforms
      };
      res.send(resultId);
    } catch (error) {
      console.log(error)
    }
  } 
})

//Obtener todos los tipos de géneros de videojuegos posibles
//En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

app.get("/generos", async (req, res) => {
  let generosdb = await Genres.findAll();
  if (generosdb.length !== 0) {
    res.send(generosdb);
  } else {
    axios
      .get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
      .then(async (respuesta) => {
        let finGen = [];
        let sinResult = respuesta.data.results;
        let GenApi = sinResult.map((el) => el.name);
        let sinnull = GenApi.filter((e) => typeof e === "string");
        sinnull.forEach((el) => {
          if (finGen.indexOf(el) < 0) finGen.push(el);
        });
        for (let i = 0; i < finGen.length - 1; i++) {
          await Genres.create({
            name: finGen[i],
          });
        }
        res.send(finGen);
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

//Obtengo todas las plataformas

app.get("/plataformas", (req, res)=> {
  axios
      .get(`http://localhost:3001/apiGames`)
      .then((respuesta) => {
        let finPlat = [];
        let plataformas1 = [];
        let sinResult = respuesta.data;
        let plataformas = sinResult.map(e => e.platforms)
        console.log(plataformas[1])
        for (let i = 0; i < plataformas.length-1; i++) {
           plataformas[i].map((e)=> plataformas1.push(e.platform))
        }
        let plataforma = plataformas1.map(e => e.name)
        plataforma.forEach((el) => {
          if(finPlat.indexOf(el) < 0) finPlat.push(el);
        });
        res.send(finPlat);
 })
})

// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
// Crea un videojuego en la base de datos

app.post("/game-add", function (req, res) {
  let genresId = req.body.genresId;
  Videogame.create({
    name: req.body.juegoNuevo.name,
    description: req.body.juegoNuevo.description,
    releaseDate: req.body.juegoNuevo.releaseDate,
    rating: req.body.juegoNuevo.rating,
    platforms: req.body.juegoNuevo.platforms,
    background_image: req.body.juegoNuevo.background_image,
  })
    .then((game) => {
      game.setGenres(genresId);
      res.status(200).send(game);
    })
    .catch((error) => console.log(error));
})


module.exports = app;
