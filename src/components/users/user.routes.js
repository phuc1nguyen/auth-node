const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const passport = require('passport');

router.get(
  '/',
  passport.authenticate('jwt', {
    session: false,
  }),
  userController.getUsers
);
router
  .route('/:id')
  .get(userController.getUserById)
  .put(userController.updateUserById)
  .delete(userController.deleteUserById);

module.exports = router;
