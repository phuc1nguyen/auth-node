const express = require('express');
const authController = require('../auth/auth.controller');
const router = express.Router();

router
  .route('/login')
  .get((req, res) => {
    res.render('login', { title: 'Login' });
  })
  .post(authController.login);
router.post('/register', authController.register);
router.post('/logout', authController.logout);

module.exports = router;
