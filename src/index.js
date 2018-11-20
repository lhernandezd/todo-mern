const express = require('express');
const path = require('path'); //Unir directorios
const { mongoose } = require('./database');
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

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
