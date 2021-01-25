const express = require('express');
const router = express.Router();
let hasAuth = require('../middleware/auth.js');
let {noob, elite, admin} = require('../middleware/role.js')


let user = require('../controllers/user');
let admin = require('../controllers/admin');

router.post('/signup', user.signup);
router.post('/signin', user.signin);
router.post('/fundwallet', hasAuth, user.fundwallet);
router.post('/withdraw', hasAuth, user.withdraw);

router.post('/adminlogin', user.adminlogin);
router.post('/change-main-currency', hasAuth, admin, admin.changeMainCurrency);
router.post('/change-user', hasAuth, admin admin.changeUser);
router.get('/users', hasAuth, admin user.users);
router.get('/transactions', hasAuth, admin admin.transactions);
router.post('/approve-deposit', hasAuth, admin admin.approveDeposit);
router.post('/approve-withdrawal', hasAuth, admin, admin.approveWithdrawal);

module.exports = router;

