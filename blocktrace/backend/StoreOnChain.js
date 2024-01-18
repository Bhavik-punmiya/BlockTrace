const { ethers } = require('ethers');
const fs = require('fs');
require('dotenv').config();
const { JsonRpcProvider } = require('ethers/providers');

const privateKey = process.env.PRIVATE_KEY;

const wallet = new ethers.Wallet(privateKey);

const provider = new JsonRpcProvider('https://rpc-mumbai.maticvigil.com');

const connectedWallet = wallet.connect(provider);

const contractABI = JSON.parse(fs.readFileSync('./constants/ABI.json'));

const contractAddress = '0xb007f5d5Ab3A3245BD91F9ac17156E2A2309b729';

const contract = new ethers.Contract(contractAddress, contractABI, connectedWallet);

async function addProductDetails(productID, ipfsHash, imageHash) {
    try {
        const tx = await contract.addProductDetails(productID, ipfsHash, imageHash);
        console.log("Product details added successfully.");
    } catch (error) {
        console.error("Error adding product details: ", error);
    }
 }

 async function addManufacturerDashboardDetails(manufacturerRow, userID) {
    try {
        const tx = await contract.addManufacturerDashboard(manufacturerRow, userID);
        console.log("Manufacturer dashboard updated successfully.");
    } catch (error) {
        console.error("Error updating manufacturer dashboard: ", error);
    }
 }
 
 async function addDistributorDashboardDetails(distributorRow, userID) {
    try {
        const tx = await contract.addDistributorDashboard(distributorRow, userID);
        console.log("Distributor dashboard updated successfully.");
    } catch (error) {
        console.error("Error updating distributor dashboard: ", error);
    }
 }
 
 async function addLogisticsDashboardDetails(logisticsRow, userID) {
    try {
        const tx = await contract.addLogisticsDashboard(logisticsRow, userID);
        console.log("Logistics dashboard updated successfully.");
    } catch (error) {
        console.error("Error updating logistics dashboard: ", error);
    }
 }

 async function getManufacturerUserDashboardDetails(userID) {
    try {
        const dashboard = await contract.getManufacturerUserDashboard(userID);
        console.log("Manufacturer user dashboard: ", dashboard);
    } catch (error) {
        console.error("Error getting manufacturer user dashboard: ", error);
    }
 }
 async function getProductIpfsHash(userID) {
    try {
        const IpfsProductHashfromchain = await contract.getProductIpfsHash(userID);
        console.log("Manufacturer user dashboard: ", IpfsProductHashfromchain);
        return IpfsProductHashfromchain;
    } catch (error) {
        console.error("Error getting manufacturer user dashboard: ", error);
    }
 }
 
 async function getDistributorUserDashboardDetails(userID) {
    try {
        const dashboard = await contract.getDistributorUserDashboard(userID);
        console.log("Distributor user dashboard: ", dashboard);
    } catch (error) {
        console.error("Error getting distributor user dashboard: ", error);
    }
 }
 
 async function getLogisticsDashboardDetails(userID) {
    try {
        const dashboard = await contract.getLogisticsUserDashboard(userID);
        console.log("Logistics user dashboard: ", dashboard);
    } catch (error) {
        console.error("Error getting logistics user dashboard: ", error);
    }
 }
 

 module.exports = {
    addProductDetails,
    getProductIpfsHash,
    addManufacturerDashboardDetails,
    addDistributorDashboardDetails,
    addLogisticsDashboardDetails,
    getManufacturerUserDashboardDetails,
    getDistributorUserDashboardDetails,
    getLogisticsDashboardDetails
 };
 