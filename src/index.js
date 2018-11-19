const express = require('express');
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(express.json()); //Para que el servidor compruebe si el dato es en formato json.
app.use('/api/tasks', require('./routes/task'));

//Routes

//Statics

//Start server
app.listen(app.get('port'), () => {
  console.log(`Listening on port ${app.get('port')}`);
});
