const express = require('express');
const path = require('path'); //Unir directorios
const config = require('./server/config/index');
const { mongoose } = require('./server/database');
const app = express();

//Settings
app.set('port', process.env.PORT || config.server.port);

//Middlewares
app.use(express.json()); //Para que el servidor compruebe si el dato es en formato json.

//Routes
app.use('/api/tasks', require('./routes/task'));

//Statics
app.use(express.static(path.join(__dirname, 'public'))); //Ruta donde se encontraran los archivos estaticos.

//Start server
app.listen(app.get('port'), () => {
  console.log(`Listening on port ${app.get('port')}`);
});
