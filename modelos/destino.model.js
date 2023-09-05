const mongoose = require('mongoose');

//Creacion del esquema del modelo
const destinosSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    nombre: {
        type: String,
        default: '',
        trim: true,
    },
    descripcion: {
        type: String,
        default: '',
        trim: true,
    }
})

// Crear y xportar el modelo
module.exports = mongoose.model('Destino', destinosSchema);