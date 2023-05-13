const dotenv = require('dotenv');
dotenv.config();

const config = {
  app: {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
  },
  database: {
    mongodb: `mongodb+srv://${process.env.MONGO_NAME}:${process.env.MONGO_PASSWORD}@cluster0.dxncxjg.mongodb.net/`,
  },
};

module.exports = config;
