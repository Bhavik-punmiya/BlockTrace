// routes/productRoute.js

const express = require('express');
const router = express.Router();
const { addProductDetailsController, getProductDetailsController, addManufacturerDashboardController, getManufacturerDashboardController } = require('../controllers/productcontroller.js')

router.post('/addproductdetails', addProductDetailsController);
router.post('/getproductdetails', getProductDetailsController);
router.post('/addproductdetails', addManufacturerDashboardController);
router.post('/getproductdetails', getManufacturerDashboardController);

module.exports = router;
