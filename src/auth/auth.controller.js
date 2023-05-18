const authService = require('./auth.service');
const asyncHandler = require('../helpers/asyncHandler');
const httpStatus = require('http-status');

const authController = {
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    res.redirect('/');
  }),

  register: asyncHandler(async (req, res) => {
    const body = req.body;
    const newUser = await authService.register(body);
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
