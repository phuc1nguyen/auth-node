const mongoose = require('mongoose');
const config = require('../config/config');

console.log(config.database.mongodb);
const conn = mongoose
  .connect(config.database.mongodb)
  .then(() => console.log('Mongo server connected'))
  .catch((err) => console.error(err));

module.exports = conn;
