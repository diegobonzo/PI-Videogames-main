const { Router } = require('express');
const { default: axios } = require('axios');
const { Genero } = require("../db");

const router = Router();

router.get("/", async (req,res,next) => {
    const genresApi = await axios(
        `https://api.rawg.io/api/genres?key=18b124ecd74e4fdc9014a658956a8886`,{headers: {
            "accept-encoding": null //me traigo de la api los generos, el header es por la actualizacion del axios
        }})
    const genres = genresApi.data.results.map(el => el.name);
    genres.forEach(el => {
        console.log(el);
        Genero.findOrCreate({//me creo en la db los generos que no existen
            where: {name: el}
        });
    });
    const allGenresApi = await Genero.findAll();
    res.status(200).send(allGenresApi); 
});






module.exports = router;
