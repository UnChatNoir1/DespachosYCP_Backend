const mongoose = require('mongoose');

/*Usuario valido (mediante documento, etc?), fecha de embarque, fecha de regreso, nombre de la embarcación, destino (destinos prefijados y posibilidad de ingresar uno nuevo), cantidad de 
tripulantes, Nro de Brevet asociado y su fecha de caducidad (display en base la embarcación y alerta si no está al dia) */

//Creacion del esquema del modelo
const despachoSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    usuario_id: {
        type: String,
    },
    socio: {
        type: String,
        default: '',
        trim: true,
    },
    embarque: { 
        type: Date, 
        default: Date.now 
    },
    regreso: { 
        type: Date, 
        default: Date.now 
    },
    embarcacion_id: {
        type: String,
    },
    embarcacion: {
        type: String,
        default: '',
        trim: true,
    },
    matriculaEmbarcacion: {
        type: String,
        default: '',
        trim: true,
    },
    destino_id: {
        type: String,
    },
    destino: {
        type: String,
        default: '',
        trim: true,
    },
    nroTripulantes: {
        type: Number,
        default: 0,
    },
    nroBrevet: {
        type: String,
        default: '',
        trim: true,
    },
    vencimientoBrevet: {
        type: String,
        default: '',
        trim: true,
    },
    categoriaBrevet: {
        type: String,
        default: '',
        trim: true,
    },
})

// Crear y xportar el modelo
module.exports = mongoose.model('Despacho', despachoSchema);
