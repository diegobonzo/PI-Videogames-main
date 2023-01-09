const { Router } = require('express');

require('dotenv').config();
const { API_KEY }= process.env;

const axios = require("axios"); 
const { Videogame, Genero } = require("../db");
// const Videogame = require('../models/Videogame');
const router = Router();




const API_URL = "https://api.rawg.io/api/games";


const getApi = async () => {
  // Creamos una matriz para almacenar los resultados
  const games = [];

  // Realizamos un bucle for para hacer varias solicitudes a la API y obtener los resultados en bloques de 20
  for (let i = 1; i <= 5; i++) {
    const apiUrl = await axios.get(`${API_URL}?key=${API_KEY}&page=${i}`, {
      headers: {
        "accept-encoding": null,
      },
    });

    // Añadimos los resultados a la matriz
    games.push(...apiUrl.data.results);
  }

  // Procesamos los datos de cada videojuego
  const apiInfo = await games.map(async (el) => {
    // Hacemos una segunda solicitud GET a la API para obtener la descripción de cada videojuego
    const data = await axios.get(
      `${API_URL}/${el.id}?key=${API_KEY}`,
      {
        headers: {
          "accept-encoding": null,
        },
      }
    );

    // Devolvemos la información del videojuego en un objeto
    return {
      id: data.data.id,
      name: data.data.name,
      image: data.data.background_image,
      released: data.data.released,
      rating: data.data.rating,
      description: data.data.description_raw,
      genres: data.data.genres.map((el) => el.name),
      platforms: data.data.platforms.map((el) => el.platform.name),      
    };
  });
  // Esperamos a que todos los procesos se completen y devolvemos la información final
  const finalData = await Promise.all(apiInfo).then((data) => data);  
  return finalData;
};



const getDbInfo = async () => {
    return await Videogame.findAll({
        include: {
            model: Genero,
            attributes: ["name"],
            through: {
                attributes: [],
            }
        }
    })
};

const getAllVideogame = async () => {
    const apiInfo = await getApi();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
};

const updateGame = async ({id,name,image,released,rating,description,genres,platforms}) => {
    let game = await Videogame.findByPk(id);
    if(!game) return {error:"Game not found"};

    
    game.name = name;
    game.image = image;
    game.released = released;
    game.rating = rating;
    game.description = description;
    game.genres = genres;
    game.platforms = platforms;
    return game;
};


module.exports = {
    getApi,
    getDbInfo,
    getAllVideogame,
    updateGame
};