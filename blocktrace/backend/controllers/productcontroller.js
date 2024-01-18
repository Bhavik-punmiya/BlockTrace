// controllers/productController.js

const fs = require('fs');
const { addproductdetails, getproductdetails, addManufacturerDashboardController, getManufacturerDashboardController,} = require('../main.js');

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
        const { manufacturerID, dashboardData } = req.body;

        // Call your function to add manufacturer dashboard information
        await addManufacturerDashboard(manufacturerID, dashboardData);

        res.json({ message: 'Manufacturer dashboard updated successfully' });
    } catch (error) {
        console.error('Error adding manufacturer dashboard:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getManufacturerDashboardController = async (req, res) => {
    try {
        const { manufacturerID } = req.body;

        // Call your function to get manufacturer user dashboard
        const manufacturerUserDashboard = await getManufacturerUserDashboard(manufacturerID);

        res.json(manufacturerUserDashboard);
    } catch (error) {
        console.error('Error getting manufacturer user dashboard:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
module.exports = {
    addProductDetailsController,
    getProductDetailsController,
    addManufacturerDashboardController,
  getManufacturerDashboardController
};
