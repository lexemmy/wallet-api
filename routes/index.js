const express = require('express');
const router = express.Router();
let hasAuth = require('../middleware/auth.js')


let user = require('../controllers/user');

router.post('/signup', user.signup);
router.post('/signin', user.signin);
router.post('/fundwallet', user.fundwallet);
router.get('/users', user.users);

module.exports = router;


//https://occipital-flaxen-fig.glitch.me/csv