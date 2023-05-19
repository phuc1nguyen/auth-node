const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { connectDb, mongoUrl } = require('../database');
const app = express();
const apiRoutes = require('./api/v1');
const path = require('path');
const errorHandler = require('./helpers/errorHandler');
const ApiError = require('./helpers/apiError');
const httpStatus = require('http-status');
const config = require('../config/config');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const sessionStore = MongoStore.create({
  mongoUrl: mongoUrl,
});

connectDb();

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: config.app.jwtSecret,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      httpOnly: true,
      secure: false, // If secure is set, and you access your site over HTTP, the cookie will not be set
      maxAge: 30 * 60 * 1000,
    },
  })
);
app.use(passport.session());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {
  // have access currentUser variable in all views without passing it
  if (req.user) res.locals.currentUser = req.user;
  next();
});

app.get('/', (req, res) => {
  console.log('session ID: ' + req.sessionID);
  console.log(req.session);
  console.log(req.cookies);
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
