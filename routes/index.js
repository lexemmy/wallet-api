const express = require('express');
const router = express.Router();
let { hasAuth } = require('../middleware/auth.js');
let { adminAuth } = require('../middleware/role.js')

let user = require('../controllers/user');
let admin = require('../controllers/admin');

router.post('/signup', user.signup);
router.post('/signin', user.signin);
router.post('/fundwallet', hasAuth, user.fundwallet);
router.post('/withdraw', hasAuth, user.withdraw);

router.post('/adminlogin', user.adminlogin);
router.post('/change-main-currency', hasAuth, adminAuth, admin.changeMainCurrency);
router.post('/change-user', hasAuth, adminAuth, admin.changeUser);
router.get('/users', hasAuth, adminAuth, user.users);
router.get('/transactions', hasAuth, adminAuth, admin.transactions);
router.post('/approve-deposit', hasAuth, adminAuth, admin.approveDeposit);
router.post('/approve-withdrawal', hasAuth, adminAuth, admin.approveWithdrawal);

module.exports = router;

