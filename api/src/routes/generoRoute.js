const { Router } = require('express');
const { default: axios } = require('axios');
const { Genero } = require("../db");
const router = Router();

require('dotenv').config();
const { API_KEY }= process.env;

const API_URL = "https://api.rawg.io/api/genres";


router.get("/", async (req,res,next) => {
    const genresApi = await axios(`${API_URL}?key=${API_KEY}`,{headers: {
            "accept-encoding": null //me traigo de la api los generos, el header es por la actualizacion del axios
        }})
    const genres = genresApi.data.results.map(el => el.name);
    genres.forEach(el => {        
        Genero.findOrCreate({//me creo en la db los generos que no existen
            where: {name: el}
        });
    });
    const allGenresApi = await Genero.findAll();
    res.status(200).send(allGenresApi); 
});





module.exports = router;
