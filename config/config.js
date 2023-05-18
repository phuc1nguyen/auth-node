require('dotenv').config();

const config = {
  app: {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET,
  },
  database: {
    name: process.env.MONGO_NAME,
    password: process.env.MONGO_PASSWORD,
  },
};

module.exports = config;
