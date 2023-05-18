const httpStatus = require('http-status');
const ApiError = require('../../helpers/apiError');
const User = require('./user.model');

const userService = {
  getUsers: async () => await User.find(),

  getUserById: async (id) => await User.findById(id),

  updateUserById: async (id, body) =>
    await User.findOneAndUpdate({ _id: id }, body),

  deleteUserById: async (id) => await User.findOneAndRemove({ _id: id }),
};

module.exports = userService;
