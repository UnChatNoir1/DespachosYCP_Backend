const Embarcacion = require('../modelos/embarcacion.model.js');

//Devuleve todos los embarcaciones en el sistema
const listarEmbarcaciones = async (req, res) => {
    try {
    
        if (req.query["filter"] == undefined) {
    
            var coso = {};
            for (var propName in req.query) {
            coso[propName] = req.query[propName];
            }
            Embarcacion.find(coso).exec((err, data) => {
            if (err) return handleError(err);
            res.setHeader('X-Total-Count', data.length);
            res.setHeader('Content-Range', 'embarcaciones 0-20/' + data.length);
            res.status(200).send(data)
            });
        } else {
            var coso = {};
            var filter = JSON.parse(req.query["filter"]);
            for (var propName in filter) {
            coso[propName] = filter[propName];
            }
    
            Embarcacion.find(coso).exec((err, data) => {
            if (err) return handleError(err);
            res.setHeader('X-Total-Count', data.length);
            res.setHeader('Content-Range', 'embarcaciones 0-20/' + data.length);
            res.status(200).send(data)
            });
        }
        }
        catch (error) {
        res.status(500).json({ message: error.message })
    } 
}

//Recibe el id de un Embarcacion concreto y devuelve sus datos
const verEmbarcacion = async (req, res) => {
    try {
        const data = await Embarcacion.find({ id: req.params.id });
        if(data !== null){
            res.status(200).json(data[0])
        }else{
            console.log("No se ha encontrado un embarcacion de id "+req.params.id);
            res.status(204);
        }
        }
        catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Obtiene el id de un usaurio especifico asi como los datos a modificar y reemplaza dichos datos
const modificarEmbarcacion = async (req, res) => {
    const filter = { id: req.params.id };
    const update = req.body;
    try {
        let p = await Embarcacion.findOneAndUpdate(filter, update, {
            new: true
        });
        p = await Embarcacion.findOne(filter);
        res.status(200).json(p)
        }
        catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const eliminarEmbarcacion = async (req, res) => {
    try {
        const filter = { id: req.params.id };
        p = await Embarcacion.findOne(filter);
        const data = await Embarcacion.findByIdAndDelete(p._id)
        }
        catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const crearEmbarcacion = async (req, res) => {
    try {
        cont_id = await Embarcacion.find().sort({
            id: -1,
        }).collation({ locale: "en_US", numericOrdering: true }).limit(1);
        var Varbody = req.body;
        console.log(req.body)
    
        prueba = parseInt(cont_id[0].id) + 1;
        Varbody.id = prueba.toString();
    
        p = await Embarcacion.create(req.body);
        res.status(200).json(p)
    }catch (error) {
        res.status(400).json({ message: error.message })
    }
} 

module.exports = {
    listarEmbarcaciones,
    verEmbarcacion,
    modificarEmbarcacion,
    eliminarEmbarcacion,
    crearEmbarcacion,
}
