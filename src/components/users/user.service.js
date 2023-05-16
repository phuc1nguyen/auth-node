const httpStatus = require('http-status');
const ApiError = require('../../helpers/apiError');
const User = require('./user.model');

const userService = {
  getUsers: async () => await User.find(),

  getUserById: async (id) => await User.findById(id),

  createNewUser: async (body) => {
    const existedUser = await User.findOne({ email: body.email });
    if (existedUser) {
      throw new ApiError('Email already existed', httpStatus.BAD_REQUEST);
    }
    return await User.create(body);
  },

  updateUserById: async (id, body) =>
    await User.findOneAndUpdate({ _id: id }, body),

  deleteUserById: async (id) => await User.findOneAndRemove({ _id: id }),
};

module.exports = userService;
