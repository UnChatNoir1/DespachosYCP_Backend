const express = require('express');
const router = express.Router();

const {
  listarUsuarios,
  verUsuario,
  modificarUsuario,
  eliminarUsuario,
  crearUsuario,
  loginUsuario,
  estadisticasUsuario,
} = require('../controladores/usuario.controller');

//ELIMINAR ESTO
router.get('/prueba', async (req, res) => {
  res.status(200).json(
    {
      algo: 1,
      algo2: 2,
    }
  );
});

//ELIMINAR ESTO
//Get all Method (Getting all the data from the Database)
router.get('/getAll', async (req, res) => {
  try {
    const data = await Usuario.find();
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).json(data)
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Ver todos los usuarios
router.get('/usuarios', listarUsuarios);

//Ver un usuario en especifico
router.get('/usuarios/:id', verUsuario);

//Modificar usuario
router.put('/usuarios/:id', modificarUsuario);

//Eliminar usuario
router.delete('/usuarios/:id', eliminarUsuario);

//Crear usuario
router.post('/usuarios', crearUsuario);

//Autenticar usuario
router.post('/authenticate', loginUsuario);

//Muestra una serie de estadisticas en base a los despachos asociados al usuario
router.get('/estadisticas/:cedula', estadisticasUsuario);

module.exports = router;