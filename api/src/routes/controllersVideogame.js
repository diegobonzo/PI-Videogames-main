const { Router } = require('express');

require('dotenv').config();
const { API_KEY }= process.env;

const axios = require("axios"); 
const { Videogame, Genero } = require("../db");
// const Videogame = require('../models/Videogame');
const router = Router();




const getApi = async () => {
    const apiUrl = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}`,{headers: {
            "accept-encoding": null
        }})       
        const apiInfo = await apiUrl.data.results.map( async (el)  =>  {
            let data = await axios.get(
                `https://api.rawg.io/api/games/${el.id}?key=${API_KEY}`,{headers: {
                    "accept-encoding": null
                }});
            return{
                id: el.id,
                name: el.name,
                image: el.background_image,                
                released: el.released,
                rating: el.rating,
                description: data.data.description,
                genres: el.genres.map(el=>el.name),
                platforms: el.platforms.map(el=>el.platform.name),
            };
        });
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

// const updateGame = async (id,name,image,released,rating,description,generos,platforms) => {
//     let game = await Videogame.findByPk(id);
//     if(!game) return {error:"Game not found"};

    
//     game.name = name;
//     game.image = image;
//     game.released = released;
//     game.rating = rating;
//     game.description = description;
//     game.generos = generos;
//     game.platforms = platforms;
//     return game;
// };


module.exports = {
    getApi,
    getDbInfo,
    getAllVideogame,
    updateGame
};