const Usuario = require('../modelos/usuario.model.js');
const {
  obtenerDespachosUsuario,
} = require('../controladores/despacho.controller');
const {
  crearBrevet,
  modificarBrevet,
} = require('../controladores/brevet.controller');

//Devuleve todos los usuarios en el sistema
const listarUsuarios = async (req, res) => {
    try {
  
      if (req.query["filter"] == undefined) {
  
        var coso = {};
        for (var propName in req.query) {
          coso[propName] = req.query[propName];
        }
        Usuario.find(coso).exec((err, data) => {
          if (err) return handleError(err);
          res.setHeader('X-Total-Count', data.length);
          res.setHeader('Content-Range', 'usuarios 0-20/' + data.length);
          res.status(200).send(data)
        });
      } else {
        var coso = {};
        var filter = JSON.parse(req.query["filter"]);
        for (var propName in filter) {
          coso[propName] = filter[propName];
        }
  
        Usuario.find(coso).exec((err, data) => {
          if (err) return handleError(err);
          res.setHeader('X-Total-Count', data.length);
          res.setHeader('Content-Range', 'usuarios 0-20/' + data.length);
          res.status(200).send(data)
        });
      }
    }
    catch (error) {
      res.status(500).json({ message: error.message })
    } 
}

//Recibe el id de un usuario concreto y devuelve sus datos
const verUsuario = async (req, res) => {
    try {
      const data = await Usuario.find({ id: req.params.id });
      if(data !== null){
        res.status(200).json(data[0])
      }else{
        console.log("No se ha encontrado un usuario de id "+req.params.id);
        res.status(204);
      }
    }
    catch (error) {
      res.status(500).json({ message: error.message })
    }
}

//Obtiene el id de un usaurio especifico asi como los datos a modificar y reemplaza dichos datos
const modificarUsuario = async (req, res) => {
    const filter = { id: req.params.id };
    const update = req.body;
    try {
      let p = await Usuario.findOneAndUpdate(filter, update, {
        new: true
      });
      await modificarBrevet(req.body.brevet_id, req.body.nroBrevet, req.body.vencimientoBrevet, req.body.categoriaBrevet);
      p = await Usuario.findOne(filter);
      res.status(200).json(p)
    }
    catch (error) {
      res.status(500).json({ message: error.message })
    }
}

const eliminarUsuario = async (req, res) => {
    try {
      const filter = { id: req.params.id };
      p = await Usuario.findOne(filter);
      const data = await Usuario.findByIdAndDelete(p._id)
    }
    catch (error) {
      res.status(400).json({ message: error.message })
    }
}

const getPin = (idUsuario) => {
  const digit1 = Math.floor((Math.random() * 9)).toString();
  const digit2 = Math.floor((Math.random() * 9)).toString();
  const digit3 = Math.floor((Math.random() * 9)).toString();
  const digit4 = Math.floor((Math.random() * 9)).toString();
  const pin= digit1+digit2+digit3+digit4;

  return pin;
}

const crearUsuario = async (req, res) => {
  try {
      cont_id = await Usuario.find().sort({
        id: -1,
      }).collation({ locale: "en_US", numericOrdering: true }).limit(1);
      var Varbody = req.body;
  
      prueba = parseInt(cont_id[0].id) + 1;
      Varbody.id = prueba.toString();

      Varbody.pin = getPin();

      var brevet = await crearBrevet(Varbody.id, req.body.nroBrevet, req.body.vencimientoBrevet, req.body.categoriaBrevet);
      Varbody.brevet_id = brevet.id;
      console.log(Varbody);
  
      p = await Usuario.create(Varbody);
      res.status(200).json(p)
  }catch (error) {
      res.status(400).json({ message: error.message })
  }
}

const resetPin = (idUsuario) => {
  const pin= getPin();

  Usuario.findOneAndUpdate( {id: idUsuario}, {contraseña: pin} );

  return;
}

const checkPins = () => {
  let usuarios = Usuario.find();

  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].contraseña === ""){
      resetPin(usuarios[i].id);
    }
  }
  
  return;
}

const loginUsuario = async (req, res) => {
  try {      
      var a = req.body.username;
      var auxNombre = a.split(".")[0];
      var auxApellido = a.split(".")[1];
      const filter = {nombre: auxNombre, apellido: auxApellido};
  
      console.log(req.body);
  
      p = await Usuario.findOne(filter).exec();
  
      if (await p) {
        if(p.pin===req.body.password){
          res.status(200).json(
            {
              id: p.id,
              fullName: p.nombre+" "+p.apellido,
              avatar: null,
              permissions: "user"
            }
          );
        }
        else{
          res.status(300).json(p);
        } 
      } else {
        if (req.body.username=="admin" && req.body.password=="admin"){
          res.status(200).json(
            {
              id: 0,
              fullName: "Administrador",
              avatar: null,
              permissions: "admin"
            }
          );
        }else{
          res.status(300).json(p);
        }       
      }
    }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
}

const estadisticasUsuario = async (req, res) => {
  try {
    const estadisticas = await obtenerDespachosUsuario(req.params.cedula);

    if (await estadisticas) {
      res.status(200).json(estadisticas)
    } else {
      res.status(300).json(estadisticas)
    }

  }catch (error) {
    res.status(400).json({ message: error.message })
  }
}  

module.exports = {
    listarUsuarios,
    verUsuario,
    modificarUsuario,
    eliminarUsuario,
    crearUsuario,
    loginUsuario,
    estadisticasUsuario,
    resetPin,
    checkPins,
}
