const express = require('express');
const router = express.Router();

const {
    listarEmbarcaciones,
    verEmbarcacion,
    modificarEmbarcacion,
    eliminarEmbarcacion,
    crearEmbarcacion,
} = require('../controladores/embarcacion.controller');

//Ver todos los embarcaciones
router.get('/embarcaciones', listarEmbarcaciones);

//Ver un Embarcacion en especifico
router.get('/embarcaciones/:id', verEmbarcacion);

//Modificar embarcacion
router.put('/embarcaciones/:id', modificarEmbarcacion);

//Eliminar Embarcacion
router.delete('/embarcaciones/:id', eliminarEmbarcacion);

//Crear Embarcacion
router.post('/embarcaciones', crearEmbarcacion);

module.exports = router;


