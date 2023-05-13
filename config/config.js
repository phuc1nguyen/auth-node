const dotenv = require('dotenv');
dotenv.config();

const config = {
  app: {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
  },
  database: {
    mongodb: process.env.MONGO_DB || '',
  },
};

module.exports = config;
