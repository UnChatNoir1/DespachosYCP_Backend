const express = require('express');
const router = express.Router();

const {
    listarBrevets,   
    eliminarBrevet,
    crearBrevet
} = require('../controladores/brevet.controller.js');

//Ver todos los Brevets
router.get('/brevets', listarBrevets);

//Eliminar Brevet
//router.delete('/brevets/:id', eliminarBrevet)

//Crear Brevet
router.post('/brevets', crearBrevet);

module.exports = router;