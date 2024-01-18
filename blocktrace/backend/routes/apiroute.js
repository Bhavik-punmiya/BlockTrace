// routes/productRoute.js

const express = require('express');
const router = express.Router();
const {
    addProductDetailsController,
    getProductDetailsController,
    addManufacturerDashboardController,
    getManufacturerDashboardController,
    addDistributorDashboardController,
    addLogisticsDashboardController,
    getDistributorUserDashboardController,
    getLogisticsDashboardController
 } = require('../controllers/productcontroller');


router.post('/addproductdetails', addProductDetailsController);
router.post('/getproductdetails', getProductDetailsController);
router.post('/addmanufacturerdashboard', addManufacturerDashboardController);
router.post('/getmanufacturerdashboard', getManufacturerDashboardController);
router.post('/adddistributordashboard', addDistributorDashboardController);
router.post('/getdistributordashboard', getDistributorUserDashboardController);
router.post('/addlogisticsdashboard', addLogisticsDashboardController);
router.post('/getlogisticsdashboard', getLogisticsDashboardController);

module.exports = router;
