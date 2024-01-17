const { ethers } = require('ethers');
const fs = require('fs');
require('dotenv').config();
const { JsonRpcProvider } = require('ethers/providers');

const privateKey = process.env.PRIVATE_KEY;

const wallet = new ethers.Wallet(privateKey);

const provider = new JsonRpcProvider('https://rpc-mumbai.maticvigil.com');

const connectedWallet = wallet.connect(provider);

const contractABI = JSON.parse(fs.readFileSync('./constants/ABI.json'));

const contractAddress = '0xbB431ef34523555C11381246FCcC20Be23453475';

const contract = new ethers.Contract(contractAddress, contractABI, connectedWallet);

async function addProductDetails(productID, ipfsHash, imageHash) {
    try {
        const tx = await contract.addProductDetails(productID, ipfsHash, imageHash);
        await tx.wait();
        console.log("Product details added successfully.");
    } catch (error) {
        console.error("Error adding product details: ", error);
    }
 }

 async function addManufacturerDashboard(manufacturerRow, userID) {
    try {
        const tx = await contract.addManufacturerDashboard(manufacturerRow, userID);
        await tx.wait();
        console.log("Manufacturer dashboard updated successfully.");
    } catch (error) {
        console.error("Error updating manufacturer dashboard: ", error);
    }
 }
 
 async function addDistributorDashboard(distributorRow, userID) {
    try {
        const tx = await contract.addDistributorDashboard(distributorRow, userID);
        await tx.wait();
        console.log("Distributor dashboard updated successfully.");
    } catch (error) {
        console.error("Error updating distributor dashboard: ", error);
    }
 }
 
 async function addLogisticsDashboard(logisticsRow, userID) {
    try {
        const tx = await contract.addLogisticsDashboard(logisticsRow, userID);
        await tx.wait();
        console.log("Logistics dashboard updated successfully.");
    } catch (error) {
        console.error("Error updating logistics dashboard: ", error);
    }
 }

 async function getManufacturerUserDashboard(userID) {
    try {
        const dashboard = await contract.getManufacturerUserDashboard(userID);
        console.log("Manufacturer user dashboard: ", dashboard);
    } catch (error) {
        console.error("Error getting manufacturer user dashboard: ", error);
    }
 }
 
 async function getDistributorUserDashboard(userID) {
    try {
        const dashboard = await contract.getDistributorUserDashboard(userID);
        console.log("Distributor user dashboard: ", dashboard);
    } catch (error) {
        console.error("Error getting distributor user dashboard: ", error);
    }
 }
 
 async function getLogisticsUserDashboard(userID) {
    try {
        const dashboard = await contract.getLogisticsUserDashboard(userID);
        console.log("Logistics user dashboard: ", dashboard);
    } catch (error) {
        console.error("Error getting logistics user dashboard: ", error);
    }
 }
 

 module.exports = {
    addProductDetails,
    addManufacturerDashboard,
    addDistributorDashboard,
    addLogisticsDashboard,
    getManufacturerUserDashboard,
    getDistributorUserDashboard,
    getLogisticsUserDashboard
 };
 