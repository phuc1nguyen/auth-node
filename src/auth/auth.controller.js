const authService = require('./auth.service');
const asyncHandler = require('../helpers/asyncHandler');
const httpStatus = require('http-status');

const authController = {
  login: asyncHandler(async (req, res) => {
    const data = await authService.login(req.body);
    res.status(httpStatus.OK).json(data);
  }),

  register: asyncHandler(async (req, res) => {
    const newUser = await authService.register(req.body);
    res.status(httpStatus.CREATED).json(newUser);
  }),

  logout: (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.redirect('/');
    });
  },
};

module.exports = authController;
