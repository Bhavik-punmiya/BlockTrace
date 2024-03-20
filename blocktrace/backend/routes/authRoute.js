const express = require('express');
const router = express.Router();
const {loginController, registerController, generateproductController,getkeybyemail} = require('../controllers/authControllers.js');
const { isAdmin, requireSignIn, testController } = require('../middleware/authMiddleware.js');
const { keyController } = require('../controllers/authControllers.js');



router.post('/register',registerController);
router.post('/login',loginController);
router.get('/test',requireSignIn,isAdmin,testController);
router.get('/generateproduct',generateproductController)
router.post('/getallkeys',keyController);
router.post('/getkeyofuser',getkeybyemail);
module.exports = router;