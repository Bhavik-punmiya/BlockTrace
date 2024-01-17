const express = require('express');
const router = express.Router();
const {loginController, registerController} = require('../controllers/authControllers.js');
const { isAdmin, requireSignIn, testController } = require('../middleware/authMiddleware.js');



router.post('/register',registerController);
router.post('/login',loginController);
router.get('/test',requireSignIn,isAdmin,testController);

module.exports = router;