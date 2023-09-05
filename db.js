// Conexion a mongo
var mongoose = require('mongoose');
require('dotenv/config');

var dev_db_url = process.env.DB_CONNECTION/*'mongodb://127.0.0.1:27017/pasantia'*/;

var mongoDB = dev_db_url;

mongoose.connect(mongoDB);

mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;