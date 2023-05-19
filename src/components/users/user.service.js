const httpStatus = require('http-status');
const ApiError = require('../../helpers/apiError');
const bcrypt = require('bcryptjs');
const User = require('./user.model');

const userService = {
  getUsers: async () => await User.find(),

  getUserById: async (id) => await User.findById(id),

  updateUserById: async (id, body) => {
    if (body.email)
      throw new ApiError('Cannot change email', httpStatus.BAD_REQUEST);
    if (!body.password) return;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(body.password, salt);
    const updatedUser = {
      ...body,
      password: hash,
    };
    const updated = await User.findOneAndUpdate({ _id: id }, updatedUser);
    return updated;
  },

  deleteUserById: async (id) => await User.findOneAndRemove({ _id: id }),
};

module.exports = userService;
