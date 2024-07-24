const express = require('express');
const { requireSignIn, clientMiddleware, clientOrAdminMiddleware } = require('../common_middlewares');
const { signup, signin, UserProfile, signout } = require('../controllers/client.auth');
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/sign-out', requireSignIn, signout)
router.get('/user/:userId', requireSignIn, clientOrAdminMiddleware, UserProfile);

module.exports = router;