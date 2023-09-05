const express = require('express');
const router = express.Router();

const {
  listarDespachos,
  verDespacho,
  modificarDespacho,
  eliminarDespacho,
  crearDespacho,
} = require('../controladores/despacho.controller');


//Post Method (Posting data to Database.)
router.post('/post', async (req, res) => {
  const data = new Despacho({
    Familia: req.body.Familia,
    Especie: req.body.Especie,
    Tipo_Vegetativo: req.body.Tipo_Vegetativo,
    Rizoma_engrozado: req.body.Rizoma_engrozado
  })

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//Get all Method (Getting all the data from the Database)
router.get('/getAll', async (req, res) => {
  try {
    const data = await Despacho.find();

    res.set('Access-Control-Allow-Origin', '*');
    res.json(data)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/despachos', listarDespachos);

// SHOW
router.get('/despachos/:id', verDespacho)

// UPDATE
router.put('/despachos/:id', modificarDespacho)

// DELETE
router.delete('/despachos/:id', eliminarDespacho)

// CREATE
router.post('/despachos', crearDespacho)

module.exports = router;