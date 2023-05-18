const authService = {
  login: async () => {},

  register: async (body) => {
    const existedUser = await User.findOne({ email: body.email });
    if (existedUser) {
      throw new ApiError('Email already existed', httpStatus.BAD_REQUEST);
    }
    return await User.create(body);
  },
};

module.exports = authService;
