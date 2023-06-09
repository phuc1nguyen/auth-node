const express = require('express');
const router = express.Router();
const userRoutes = require('../../components/users/user.routes');
const authRoutes = require('../../auth/auth.routes');
const passportMiddleware = require('../../../config/passport');

passportMiddleware();

router.use('/v1/users', userRoutes);
router.use('/v1/auth', authRoutes);

module.exports = router;
