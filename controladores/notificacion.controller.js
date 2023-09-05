const Notificacion = require('../modelos/notificacion.model.js');

const listarNotificaciones = async (req, res) => {
    try { 
        if (req.query["filter"] == undefined) {
    
            var coso = {};
            for (var propName in req.query) {
            coso[propName] = req.query[propName];
            }
    
            Notificacion.find(coso).exec((err, data) => {
            if (err) return handleError(err);
            res.setHeader('X-Total-Count', data.length);
            res.setHeader('Content-Range', 'Notificaciones 0-20/' + data.length);
            res.send(data)
            });
        } else {
    
            var coso = {};
            var filter = JSON.parse(req.query["filter"]);
    
            for (var propName in filter) {
            coso[propName] = filter[propName];
            }
    
            Notificacion.find(coso).exec((err, data) => {
            if (err) return handleError(err);
            res.setHeader('X-Total-Count', data.length);
            res.setHeader('Content-Range', 'Notificaciones 0-20/' + data.length);
            res.send(data)
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const verNotificacion = async (req, res) => {
    try {
        const data = await Notificacion.find({ id: req.params.id });
        if(data !== null){
            res.json(data[0])
        }else{
            console.log("No se ha encontrado una notificacion de id "+req.params.id);
            res.status(204);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const eliminarNotificacion = async (req, res) => {
    try {
        const filter = { id: req.params.id };
        p = await Notificacion.findOne(filter);
        const data = await Notificacion.findByIdAndDelete(p._id)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const crearNotificacion = async (id, contenido) => {

    var notificacion = {
        id: -1,
        usuario_id: id,
        contenido: contenido,
    };

    //Crea una id externa a mongoDB
    cont_id = await Notificacion.find().sort({
    id: -1,
    }).collation({ locale: "en_US", numericOrdering: true }).limit(1);

    prueba = parseInt(cont_id[0].id) + 1;       
    console.log(prueba);
    notificacion.id = prueba.toString();

    p = await Notificacion.create(notificacion);
}

const obtenerNotificacionesUsuario = (cedula) => {
    let auxN = Notificacion.find({ cliente: cedula });
    return auxN;
}

module.exports = {
    listarNotificaciones,
    verNotificacion,
    eliminarNotificacion,
    crearNotificacion,
    obtenerNotificacionesUsuario,
}
