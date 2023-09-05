const Brevet = require('../modelos/brevet.model.js');

const listarBrevets = async (req, res) => {
    try { 
        if (req.query["filter"] == undefined) {
    
            var coso = {};
            for (var propName in req.query) {
            coso[propName] = req.query[propName];
            }
    
            Brevet.find(coso).exec((err, data) => {
            if (err) return handleError(err);
            res.setHeader('X-Total-Count', data.length);
            res.setHeader('Content-Range', 'Brevets 0-20/' + data.length);
            res.send(data)
            });
        } else {
    
            var coso = {};
            var filter = JSON.parse(req.query["filter"]);
    
            for (var propName in filter) {
            coso[propName] = filter[propName];
            }
    
            Brevet.find(coso).exec((err, data) => {
            if (err) return handleError(err);
            res.setHeader('X-Total-Count', data.length);
            res.setHeader('Content-Range', 'Brevets 0-20/' + data.length);
            res.send(data)
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const crearBrevet = async (idUsuario, nroBrevet, vencimiento, categoria) => {
    try {
        cont_id = await Brevet.find().sort({
        id: -1,
        }).collation({ locale: "en_US", numericOrdering: true }).limit(1);
        var Varbody = {
            nro: nroBrevet,
            usuario_id: idUsuario,
            vencimiento: new Date(vencimiento),
            categoria: categoria
        };
        console.log(Varbody)
    
        prueba = parseInt(cont_id[0].id) + 1;
        Varbody.id = prueba.toString();
    
        p = await Brevet.create(Varbody);
        return p;
    }catch (error) {
        return error;
    }
}

const modificarBrevet = async ( idBrevet, nroBrevet, vencimiento, categoria) => {
    const filter = { id: idBrevet };
    const update = {
        nro: nroBrevet,
        vencimiento: new Date(vencimiento),
        categoria: categoria
    };

    try {
        let p = await Brevet.findOneAndUpdate(filter, update, {
        new: true
        });
        p = await Despacho.findOne(filter);
        return p;
    }catch (error) {
        return error;
    }
}

function calcularDiferenciaFechas(fecha1, fecha2){
    let diferencia = new Date(fecha1).getTime() - new Date(fecha2).getTime();
    return diferencia/(1000*60*60*24);
}

//Devuelve un array con dueños cuyo vencimiento de brevet amerita notificacion
const obtenerVencimientos = async () => {
    let auxB = await Brevet.find();
    let vencimientos = [];
    let j=0;
    
    //Obtiene datos para generar estadisticas
    for (let i = 0; i < auxB.length; i++) {
        let dias=calcularDiferenciaFechas(new Date(auxB[i].vencimiento), new Date());
        switch(dias){
            case 60:{
                vencimientos[j]={
                    usuario_id: auxB[i].usuario_id,
                    vencimiento: 60,
                }
                j++;
                break;
            }
            case 30:{
                vencimientos[j]={
                    usuario_id: auxB[i].usuario_id,
                    vencimiento: 30,
                }
                j++;
                break;
            }
            case 21:{
                vencimientos[j]={
                    usuario_id: auxB[i].usuario_id,
                    vencimiento: 21,
                }
                j++;
                break;
            }
            case 14:{
                vencimientos[j]={
                    usuario_id: auxB[i].usuario_id,
                    vencimiento: 14,
                }
                j++;
                break;
            }
            case 7:{
                vencimientos[j]={
                    usuario_id: auxB[i].usuario_id,
                    vencimiento: 7,
                }
                j++;
                break;
            }
            case 2:{
                vencimientos[j]={
                    usuario_id: auxB[i].usuario_id,
                    vencimiento: 1,
                }
                j++;
                break;
            }
            case 0:{
                vencimientos[j]={
                    usuario_id: auxB[i].usuario_id,
                    vencimiento: 0,
                }
                j++;
                break;
            }
        }
    }
    return vencimientos;
}

module.exports = {
    listarBrevets,
    crearBrevet,
    modificarBrevet,
    obtenerVencimientos,
}