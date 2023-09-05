const express = require('express');
const router = express.Router();

const {
    listarNotificaciones,
    verNotificacion,
    eliminarNotificacion,
    obtenerNotificacionesUsuario,
} = require('../controladores/notificacion.controller.js');

router.get('/notificaciones', listarNotificaciones);

// SHOW
router.get('/notificaciones/:id', verNotificacion)

// DELETE
router.delete('/notificaciones/:id', eliminarNotificacion)

module.exports = router;

