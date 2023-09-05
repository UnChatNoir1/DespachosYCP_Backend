const express = require('express');
const router = express.Router();

const {
    listarDestinos,   
    eliminarDestino,
    crearDestino
} = require('../controladores/destino.controller.js');

//Ver todos los Destinos
router.get('/destinos', listarDestinos);

//Eliminar Destino
router.delete('/destinos/:id', eliminarDestino)

//Crear Destino
router.post('/destinos', crearDestino);

module.exports = router;