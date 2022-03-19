const { Router } = require('express');
const GameRoutes = require("./GameRoutes")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/", GameRoutes);

module.exports = router;
