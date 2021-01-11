const express = require('express');
const router = express.Router();
let hasAuth = require('../middleware/auth.js')


let user = require('../controllers/user');
let admin = require('../controllers/admin');

router.post('/signup', user.signup);
router.post('/signin', user.signin);
router.post('/fundwallet', user.fundwallet);
router.post('/withdraw', user.withdraw);

router.post('/change-main-currency', admin.changeMainCurrency)
router.get('/users', user.users);
router.get('/transactions', admin.transactions);
router.post('/approve-deposit', admin.approveDeposit);
router.post('/approve-withdrawal', admin.approveWithdrawal);
module.exports = router;

