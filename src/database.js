const mongoose = require('mongoose');
const mongoUrl = 'mongodb://localhost:27017/todos';

mongoose.connect(mongoUrl, { useNewUrlParser: true })
  .then(db => console.log('DB is connected'))
  .catch(err => console.error(err));

module.exports = mongoose;
