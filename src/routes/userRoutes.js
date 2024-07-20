const express = require('express');
const router = express.Router();
const userControler = require('../controlers/userControler'); //
const { passport } = require('../utlis/googleAuth');

router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));
  
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      const token = generateToken(req.user);
      res.json({ token });
});

router.post('/signup', userControler.signuo);
router.post('/login',userControler.Login);
module.exports = router;