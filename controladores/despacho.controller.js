const Despacho = require('../modelos/despacho.model.js');
const Embarcacion = require('../modelos/embarcacion.model.js');
const Brevet = require('../modelos/brevet.model.js');
const Destino = require('../modelos/destino.model.js');
const {
    crearNotificacion,
} = require('../controladores/notificacion.controller.js');

const listarDespachos = async (req, res) => {
    try { 
        if (req.query["filter"] == undefined && req.query["embarque_gte"] == undefined || req.query["embarque_lte"] == undefined) {
            console.log(req.query);
            var coso = {};
            for (var propName in req.query) {
            coso[propName] = req.query[propName];
            }
    
            Despacho.find(coso).exec((err, data) => {
                if (err) return handleError(err);
                res.setHeader('X-Total-Count', data.length);
                res.setHeader('Content-Range', 'Despachos 0-20/' + data.length);
                res.send(data);
            });
        } else if(req.query["embarque_gte"] != undefined || req.query["embarque_lte"] != undefined){
            var query={};
            if(req.query["embarque_gte"] != undefined && req.query["embarque_lte"] == undefined){
                //const data = await Despacho.find({embarque: { $gte: req.query["embarque_gte"] },});
                query={embarque: { $gte: req.query["embarque_gte"] },}
            }else if(req.query["embarque_gte"] == undefined && req.query["embarque_lte"] != undefined){
                //const data = await Despacho.find({embarque: { $lte: req.query["embarque_lte"] },});
                query={embarque: { $lte: req.query["embarque_lte"] },}
            }else{
                //const data = await Despacho.find({embarque: { $gte: req.query["embarque_gte"], $lte: req.query["embarque_lte"] },});
                query={embarque: { $gte: req.query["embarque_gte"], $lte: req.query["embarque_lte"] },}
            }
            console.log(query);
            const data = await Despacho.find(query);

            if(data !== null){
                res.setHeader('X-Total-Count', data.length);
                res.status(200).json(data);
            }else{
                console.log("No se ha encontrado un despacho de id "+req.params.id);
                res.status(204);
            }
        }else {
            console.log("Está entrando acá");
            var coso = {};
            var filter = JSON.parse(req.query["filter"]);
    
            for (var propName in filter) {
                coso[propName] = filter[propName];
            }
    
            Despacho.find(coso).exec((err, data) => {
            if (err) return handleError(err);
            res.setHeader('X-Total-Count', data.length);
            res.setHeader('Content-Range', 'Despachos 0-20/' + data.length);
            res.send(data)
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const verDespacho = async (req, res) => {
    try {
        const data = await Despacho.find({ id: req.params.id });
        if(data !== null){
            res.status(200).json(data[0]);
        }else{
            console.log("No se ha encontrado un despacho de id "+req.params.id);
            res.status(204);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const modificarDespacho = async (req, res) => {
    const filter = { id: req.params.id };
    const update = req.body;
    update.modificado = true;

    try {
        let p = await Despacho.findOneAndUpdate(filter, update, {
        new: true
        });
        p = await Despacho.findOne(filter);
        //Se notifica al admin de que el despacho fue modificado
        crearNotificacion(0, "El despacho de ID: "+p.id+" a nombre del cliente de Cedula: "+p.cedula+" fue modificado.")
        //
        res.status(200).json(p)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const eliminarDespacho = async (req, res) => {
    try {
        const filter = { id: req.params.id };
        p = await Despacho.findOne(filter);
        const data = await Despacho.findByIdAndDelete(p._id)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const crearDespacho = async (req, res) => {
    try {
        console.log(req.body);

        var auxTSalida = new Date(req.body.hora_salida);
        var auxTLlegada = new Date(req.body.hora_llegada);
        var auxEmb = await Embarcacion.findOne({id: req.body.embarcacion_id});
        var auxBrev = await Brevet.findOne({nroBrevet: req.body.nroBrevet});
        var auxDes = await Destino.findOne({id: req.body.destino_id});

        console.log(req.body);
        
        var Varbody = {          
            usuario_id: req.body.usuario_id,
            socio: req.body.socio,
            embarque: new Date(auxTSalida.getFullYear(), auxTSalida.getMonth(), auxTSalida.getDate(), auxTSalida.getHours(), auxTSalida.getMinutes()),
            regreso: new Date(auxTLlegada.getFullYear(), auxTLlegada.getMonth(), auxTLlegada.getDate(), auxTLlegada.getHours(), auxTLlegada.getMinutes()),
            embarcacion_id: req.body.embarcacion_id,
            embarcacion: auxEmb.nombre,
            matriculaEmbarcacion: auxEmb.matricula,
            destino_id: req.body.destino_id,
            destino: auxDes.nombre,
            nroTripulantes: req.body.nroTripulantes,
            nroBrevet: req.body.nroBrevet,
            vencimientoBrevet: auxBrev.vencimiento,
            categoriaBrevet: auxBrev.categoria
        };
        console.log("Este es el Despacho"+JSON.stringify(Varbody));
        //Crea una id externa a mongoDB
        cont_id = await Despacho.find().sort({
        id: -1,
        }).collation({ locale: "en_US", numericOrdering: true }).limit(1);
        
        prueba = parseInt(cont_id[0].id) + 1;       
        console.log(prueba);
        Varbody.id = prueba.toString();
        //Varbody.cliente = req.meta.usuario_id;

        p = await Despacho.create(Varbody);
        res.status(200).json(p)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const obtenerDespachosUsuario = async (cedula) => {
    const milisegundosPorHora = 1000 * 60 * 60;
    let aduxD = await Despacho.find({ cliente: cedula });
    let duraciones = [];
    let destinos = [];
    let nroTripulantes = [];
    
    //Obtiene datos para generar estadisticas
    for (let i = 0; i < aduxD.length; i++) {
        duraciones[i] = (aduxD[i].embarque - aduxD[i].regreso)/milisegundosPorHora;
        destinos[i] = aduxD[i].destino;
        nroTripulantes[i] = aduxD[i].nroTripulantes;
        console.log("Repeticion");
    }

    //Calcula destinos mas concurridos
    const elementCount = {};

    destinos.forEach(element => {
    elementCount[element] = (elementCount[element] || 0) + 1;
    });

    const estadisticas = {
        destinos: elementCount,
    }
    return estadisticas;
}

//Devuelve las lista de usuarios y cantidad de despachos de cada uno
const obtenerRankingDespachos = () => {
    let aduxD = Despacho.find();
    let clientes = {};
    const elementCount = {};

    for (let i = 0; i < aduxD.length; i++) {
        clientes[i] = aduxD.cliente[i];
    }

    clientes.forEach(element => {
    elementCount[element] = (elementCount[element] || 0) + 1;
    });

    return elementCount;
}

module.exports = {
    listarDespachos,
    verDespacho,
    modificarDespacho,
    eliminarDespacho,
    crearDespacho,
    obtenerDespachosUsuario,
    obtenerRankingDespachos,
}
