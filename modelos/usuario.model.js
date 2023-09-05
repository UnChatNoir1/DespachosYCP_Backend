const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  CI: {
    type: String,
    default: '',
    trim: true,
  },
  nombre: {
    type: String,
    default: '',
    trim: true,
    validate: [
      function(name) {
        return name.length <= 200;
      },
      'El nombre no deberia exceder los 200 caracteres '],
  },
  apellido: {
    type: String,
    default: '',
    trim: true,
    validate: [
      function(name) {
        return name.length <= 200;
      },
      'El nombre no deberia exceder los 200 caracteres '],
  },
  brevet_id: {
    type: String,
  },
  direccion: {
    type: String,
    default: '',
    trim: true,
  },
  telefono: {
    type: String,
    default: '',
    trim: true,
  },
  pin: {
    type: String,
    default: '',
    trim: true,
    validate: [
      function(password) {
        return password.length <= 200;
      },
      'La Contraseña no deberia exceder los 200 caracteres '],
  }
});

// Exportar el modelo
module.exports = mongoose.model('Usuario', UsuarioSchema);