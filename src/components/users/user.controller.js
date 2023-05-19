const httpStatus = require('http-status');
const asyncHandler = require('../../helpers/asyncHandler');
const userService = require('./user.service');

const userController = {
  getUsers: asyncHandler(async (req, res) => {
    const users = await userService.getUsers();
    if (req.isAuthenticated()) {
      return res.status(httpStatus.OK).json(users);
    }

    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: 'Please log in to see this' });
  }),

  getUserById: asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await userService.getUserById(id);
    res.status(httpStatus.OK).json(user);
  }),

  updateUserById: asyncHandler(async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const updatedUser = await userService.updateUserById(id, body);
    res.status(httpStatus.CREATED).json(updatedUser);
  }),

  deleteUserById: asyncHandler(async (req, res) => {
    const id = req.params.id;
    await userService.deleteUserById(id);
    res.status(httpStatus.NO_CONTENT).end();
  }),
};

module.exports = userController;
