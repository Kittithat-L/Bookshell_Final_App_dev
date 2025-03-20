const limit = require('express-rate-limit');
const router = require('../Auth/auth');
const limiter = limit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
router.use(limiter);