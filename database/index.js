const mongoose = require('mongoose');
const config = require('../config/config');

const mongoUrl = `mongodb+srv://${config.database.name}:${config.database.password}@cluster0.dxncxjg.mongodb.net/${process.env.MONGO_DATABASE}`;

const connectDb = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log('Mongo connection success');
  } catch (err) {
    console.error('Mongo connection failed');
  }
};

module.exports = connectDb;
