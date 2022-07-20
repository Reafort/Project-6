const express = require ('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);  //export this to controller folder
router.post('/login', userCtrl.login); // 

module.exports = router;
