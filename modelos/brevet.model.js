const mongoose = require('mongoose');

const BrevetSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    nro: {
        type: String,
    },
    usuario_id: {
        type: String,
    },
    vencimiento: {
        type: Date, 
        default: Date.now 
    },
    categoria: {
        type: String,
        default: '',
        trim: true,
        validate: [
        function(cat) {
            let res=true;
            if (cat!=='a' && cat!=='b' && cat!=='c' && cat!=='d'){
                res=false;
            }
            return res;
        },
        'La categoria no se encuentra dentro de las aceptadas '],
    },
});

// Exportar el modelo
module.exports = mongoose.model('Brevet', BrevetSchema);