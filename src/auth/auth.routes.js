const express = require('express');
const authController = require('../auth/auth.controller');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../components/users/user.model');
const passport = require('passport');
const router = express.Router();

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async function (
    email,
    password,
    done
  ) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false);
      }
      if (user.password !== password) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/api/v1/auth/login',
  })
);
router.post('/register', authController.register);
router.post('/logout', authController.logout);

module.exports = router;
