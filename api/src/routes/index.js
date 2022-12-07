const { Router } = require('express');
const videogameRoute = require("./videogameRoute");
const generoRoute = require("./generoRoute");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use("/videogame", videogameRoute);
router.use("/genero", generoRoute);

module.exports = router;
