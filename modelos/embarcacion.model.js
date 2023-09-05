var mongoose = require('mongoose');

//Creacion del esquema del modelo
const embarcacionSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    usuario_id: {
        type: String,
    },
    nombre: {
        type: String,
        default: '',
        trim: true,
    },
    matricula: {
        type: String,
        default: '',
        trim: true,
    },
})

// Crear y xportar el modelo
module.exports = mongoose.model('Embarcacion', embarcacionSchema);