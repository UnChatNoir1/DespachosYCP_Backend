const express = require('express');
const app = express();

const embarcaciones = require('./rutas/embarcacion.route.js');
const usuarios = require('./rutas/usuario.route.js');
const despachos = require('./rutas/despacho.route.js');
const notificaciones = require('./rutas/notificacion.route.js');
const destinos = require('./rutas/destino.route.js');
const brevets = require('./rutas/brevet.route.js');

const {
  obtenerVencimientos,
} = require('./controladores/brevet.controller.js');

const {
  crearNotificacion,
} = require('./controladores/notificacion.controller.js');

var cors = require('cors');
const db = require('./db');

db.on('error', (error) => {
  console.log(error)
})

db.once('connected', () => {
  console.log('Database Connected');
})

//Hace checkeos una vez al dia
setInterval(function() {  
  //Checkea los vencimientos de Brevet y notifica al usuario en las metas de 60, 30, 21, 14, 7, 2 y 0 dias.
  let vencimientos = obtenerVencimientos();
  for (let i = 0; i < vencimientos.length; i++) {   
    if (vencimientos[i].vencimiento>0){
      crearNotificacion(vencimientos[i].usuario_id, "Su brevet se vencerá en "+vencimientos[i].vencimiento+" dias.");
    }   
    else{
      crearNotificacion(vencimientos[i].usuario_id, "Su brevet ha expirado.");
    }
  }
  //---------------------------------------------------------------------------
  //Checkea que todos los usuarios tengan un Pin correspondiente
  if (pinsSet!=true){
    checkPins();
    pinsSet=true;
  }
  //---------------------------  
}, 60000*60*24);

//-------------------------------------------------------------------------------

app.use(cors());

app.use(express.json());

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`)
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Expose-Headers', 'Content-Range, X-Total-Count');
  next();
});

app.use('/api', embarcaciones)
app.use('/api', usuarios)
app.use('/api', despachos)
app.use('/api', notificaciones)
app.use('/api', destinos)
app.use('/api', brevets)

