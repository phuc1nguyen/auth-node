const User = require('../components/users/user.model');
const ApiError = require('../helpers/apiError');
const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const authService = {
  login: async (body) => {
    const { email, password } = body;
    const user = await User.findOne({ email });

    if (!user) throw new ApiError('User not found', httpStatus.NOT_FOUND);
    if (!bcrypt.compareSync(password, user.password))
      throw new ApiError('Wrong password', httpStatus.BAD_REQUEST);
    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(payload, config.app.jwtSecret, {
      expiresIn: '1d',
    });

    return { user: payload, token };
  },

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
