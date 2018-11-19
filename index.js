const express = require('express');
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);
//Middlewares

//Routes

//Statics

//Start server
app.listen(app.get('port'), () => {
  console.log(`Listening on port ${app.get('port')}`);
});
