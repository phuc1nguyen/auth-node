const asyncHandler = (func) => {
  return async (...args) => {
    const next = args[args.length - 1];
    return Promise.resolve(func(...args)).catch((err) => next(err));
  };
};

module.exports = asyncHandler;
