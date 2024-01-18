// controllers/productController.js

const fs = require('fs');
const { 
    addproductdetails,
    getproductdetails,
    addManufacturerDashboard,
    getManufacturerUserDashboard,
    addDistributorDashboard,
    getDistributorUserDashboard,
    addLogisticsDashboard,
    getLogisticsDashboard
 } = require('../main.js');

const addProductDetailsController = async (req, res) => {
    try {
        const { productID, jsonData } = req.body;
        const jsonString = JSON.stringify(jsonData, null, 2);

        await fs.promises.writeFile(`${productID}.json`, jsonString);
        await addproductdetails(productID);

        res.json({ message: 'User details added successfully' });
    } catch (error) {
        console.error('Error adding user details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getProductDetailsController = async (req, res) => {
    try {
        const { productID } = req.body;
        const product = await getproductdetails(productID);
        const productJsonData = JSON.parse(product);

        res.json(productJsonData);
    } catch (error) {
        console.error('Error getting user details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const addManufacturerDashboardController = async (req, res) => {
    try {
        const { Id, dashboardData } = req.body;
       
        const dashboardDataArray = Array.from(dashboardData); 
        // Call your function to add manufacturer dashboard information
        await addManufacturerDashboard(dashboardDataArray, Id);

        res.json({ message: 'Manufacturer dashboard updated successfully' });
    } catch (error) {
        console.error('Error adding manufacturer dashboard:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getManufacturerDashboardController = async (req, res) => {
    try {
        const { Id } = req.body;

        // Call your function to get manufacturer user dashboard
        const manufacturerUserDashboard = await getManufacturerUserDashboard(Id);
        
        res.json(manufacturerUserDashboard);
    } catch (error) {
        console.error('Error getting manufacturer user dashboard:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

async function addDistributorDashboardController(req, res) {
    try {
        const { Id,dashboardData } = req.body;
        const dashboardDataArray = Array.from(dashboardData); 
        await addDistributorDashboard(dashboardDataArray, Id);
        res.json({ message: 'Distributor dashboard updated successfully in Ethereum contract' });
    } catch (error) {
        console.error('Error adding distributor dashboard:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function addLogisticsDashboardController(req, res) {
    try {
        const { dashboardData, Id } = req.body;
        const dashboardDataArray = Array.from(dashboardData); 
        await addLogisticsDashboard(dashboardDataArray, Id);
        res.json({ message: 'Logistics dashboard updated successfully in Ethereum contract' });
    } catch (error) {
        console.error('Error adding logistics dashboard:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getDistributorUserDashboardController(req, res) {
    try {
        const { Id } = req.body;
        const distributorUserDashboard = await getDistributorUserDashboard(Id);
        res.json(distributorUserDashboard);
    } catch (error) {
        console.error('Error getting distributor user dashboard:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getLogisticsDashboardController(req, res) {
    try {
        const { Id } = req.body;
        const logisticsUserDashboard = await getLogisticsDashboard(Id);
        res.json(logisticsUserDashboard);
    } catch (error) {
        console.error('Error getting logistics user dashboard:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    addProductDetailsController,
    getProductDetailsController,
    addManufacturerDashboardController,
    getManufacturerDashboardController,
    addDistributorDashboardController,
    addLogisticsDashboardController,
    getDistributorUserDashboardController,
    getLogisticsDashboardController
};
