const mongoose = require('mongoose');
const config = require('./config/index');
const mongoUrl = config.database.url;

mongoose.connect(process.env.MONGODB_URI || mongoUrl, { useNewUrlParser: true })
  .then(db => console.log('DB is connected'))
  .catch(err => console.error(err));

module.exports = mongoose;
