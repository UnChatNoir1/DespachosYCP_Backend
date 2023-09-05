const mongoose = require('mongoose');

/*Usuario valido (mediante documento, etc?), fecha de embarque, fecha de regreso, nombre de la embarcación, destino (destinos prefijados y posibilidad de ingresar uno nuevo), cantidad de 
tripulantes, Nro de Brevet asociado y su fecha de caducidad (display en base la embarcación y alerta si no está al dia) */

//Creacion del esquema del modelo
const notificacionesSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    usuario_id: {
        type: String,
    },
    contenido: {
        type: String,
        default: '',
        trim: true,
    },
    fechaDeCreacion: {
        type: Date, 
        default: Date.now 
    },
})

// Crear y xportar el modelo
module.exports = mongoose.model('Notificacion', notificacionesSchema);