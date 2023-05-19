const User = require('../components/users/user.model');
const ApiError = require('../helpers/apiError');
const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');

const authService = {
  register: async (body) => {
    const { username, email, password } = body;
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      throw new ApiError('Email already existed', httpStatus.BAD_REQUEST);
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return await User.create({ ...body, password: hash });
  },
};

module.exports = authService;
