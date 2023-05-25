const express = require('express');
const cookieParser = require('cookie-parser');
const { connectDb } = require('../database');
const app = express();
const apiRoutes = require('./api/v1');
const path = require('path');
const errorHandler = require('./helpers/errorHandler');
const ApiError = require('./helpers/apiError');
const httpStatus = require('http-status');

connectDb();

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});
app.use('/api', apiRoutes);

app.all('*', (req, res, next) => {
  const err = new ApiError(
    `Requested URL ${req.path} not found`,
    httpStatus.NOT_FOUND
  );
  next(err);
});

app.use(errorHandler);

module.exports = app;
