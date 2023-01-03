const { Router } = require('express');
const { Videogame, Genero } = require("../db");
const { getApi, getDbInfo, getAllVideogame, updateGame } = require("./controllersVideogame");
const axios = require("axios");
const router = Router();




router.get('/', async (req , res, next) =>{
	try{
        let { name } = req.query;
        let total = await getAllVideogame();   
        // console.log(total);     
        if(name){
            let videogameName = await total.filter(
                (el) => el.name.toLowerCase().includes(name.toLowerCase()))
                videogameName.length ?
                res.status(200).send(videogameName) 
                : res.status(400).send("Not Found")
            }else{                                
                
                res.status(200).send(total)
            }
	} catch(error){
		next(error);
	}
});


router.get("/:id", async (req,res,next) =>{
    let { id } = req.params;
    let total = await getAllVideogame();
    if(id){ 
        let gameId = await total.filter(el=>el.id == id);
        gameId.length ?
        res.status(200).send(gameId) :
        res.status(404).send("No se encontro el juego");
    }else{
        res.send(total);
    }
});






router.post("/", async (req,res,next) => {
        let { name,image,description,released,rating,platforms,createdInDb,generos } = req.body;

        let newGame = await Videogame.create({
            name,image,description,released,rating,platforms,createdInDb
        });    
        let genreDb = await Genero.findAll({ where: { name: generos } })
        newGame.addGenero(genreDb);        
        res.status(200).send("El juego se creo con exito");    
});

router.put("/", async (req,res,next) => {
    try {
        let { id,name,image,released,rating,description,generos,platforms } = req.body;
        if( !name || !image || !released || !rating || !description || !generos || !platforms){
            return res.status(400).send({error:"Missing info"});
        }else{
            let juegoModificado = await updateGame({id,name,image,released,rating,description,generos,platforms});
        
            return res.status(200).send(juegoModificado);
        }
        
    } catch (error) {
        console.log(error);
        return res.status(400).send("Error");
        
    }
}); 

router.delete("/:id", async (req,res,next) => {
    try {
        let { id } = req.params;
        let game = await Videogame.findByPk(id);
       await game.destroy();
       res.status(200).send("Videogame delete");
    } catch (error) {
        res.status(400).send(error.message);
    }
});




module.exports = router;
