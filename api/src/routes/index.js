const { Router } = require('express');
const videogameRoute = require("./videogameRoute");
const generoRoute = require("./generoRoute");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use("/videogames", videogameRoute);
router.use("/generos", generoRoute);

module.exports = router;
