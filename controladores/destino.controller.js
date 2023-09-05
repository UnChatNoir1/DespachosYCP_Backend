const Destino = require('../modelos/destino.model.js');

const listarDestinos = async (req, res) => {
    try { 
        if (req.query["filter"] == undefined) {
    
            var coso = {};
            for (var propName in req.query) {
            coso[propName] = req.query[propName];
            }
    
            Destino.find(coso).exec((err, data) => {
            if (err) return handleError(err);
            res.setHeader('X-Total-Count', data.length);
            res.setHeader('Content-Range', 'Destinos 0-20/' + data.length);
            res.send(data)
            });
        } else {
    
            var coso = {};
            var filter = JSON.parse(req.query["filter"]);
    
            for (var propName in filter) {
            coso[propName] = filter[propName];
            }
    
            Destino.find(coso).exec((err, data) => {
            if (err) return handleError(err);
            res.setHeader('X-Total-Count', data.length);
            res.setHeader('Content-Range', 'Destinos 0-20/' + data.length);
            res.send(data)
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const verDestino = async (req, res) => {
    try {
        const data = await Destino.find({ id: req.params.id });
        if(data !== null){
            res.json(data[0])
        }else{
            console.log("No se ha encontrado una Destino de id "+req.params.id);
            res.status(204);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const eliminarDestino = async (req, res) => {
    try {
        const filter = { id: req.params.id };
        p = await Destino.findOne(filter);
        const data = await Destino.findByIdAndDelete(p._id)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const crearDestino = async (req, res) => {
    try {
        cont_id = await Destino.find().sort({
            id: -1,
        }).collation({ locale: "en_US", numericOrdering: true }).limit(1);
        var Varbody = req.body;
        console.log(Varbody);
    
        prueba = parseInt(cont_id[0].id) + 1;
        Varbody.id = prueba.toString();
    
        p = await Destino.create(Varbody);
        res.status(200).json(p)
    }catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = {
    listarDestinos,
    verDestino,
    eliminarDestino,
    crearDestino
}