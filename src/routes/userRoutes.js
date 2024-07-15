const express = require('express');
const router = express.Router();
const userControler = require('../controlers/userControler'); //

router.post('/signup', userControler.signuo);
router.post('/login',userControler.Login);
module.exports = router;