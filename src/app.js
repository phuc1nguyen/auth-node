const express = require('express');
const cookieParser = require('cookie-parser');
const database = require('../database');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to server' });
});

module.exports = app;
