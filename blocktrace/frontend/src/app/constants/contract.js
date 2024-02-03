require('dotenv').config();
import abi from '../constants/abi.js'
import {ethers} from "ethers";
const { JsonRpcProvider } = require('ethers/providers');
import axios from "axios";

const contractFunction = async () => {
    const privateKey = "08150b935518da450795c6f27ba31c9f2d5182842b3b218b6dce87c1e25edaf6";

    const wallet = new ethers.Wallet(privateKey);

    const provider = new JsonRpcProvider('https://rpc-mumbai.maticvigil.com');

    const connectedWallet = wallet.connect(provider);

    const contractABI = abi;

    const contractAddress = '0x87BdA34062B7460E25882dc8ED225C3e18D7d374';

    const contract = new ethers.Contract(contractAddress, contractABI, connectedWallet);

    const addProductDetails = async (productID, data, imageHash) => {
        try {
            const tx = await contract.addProductDetails(productID, data);
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
    
            return dashboard;
        } catch (error) {
            console.error("Error getting manufacturer user dashboard: ", error);
        }
     }
     async function getProductDetails(userID) {
        try {
            const ProductDetails = await contract.getProductDetails(userID);
            console.log("productdetails", ProductDetails);
            return ProductDetails;
        } catch (error) {
            console.error("Error getting manufacturer user dashboard: ", error);
        }
     }
     
     async function getDistributorUserDashboardDetails(userID) {
        try {
            const dashboard = await contract.getDistributorUserDashboard(userID);
            console.log("Distributor user dashboard: ", dashboard);
            return dashboard;
        } catch (error) {
            console.error("Error getting distributor user dashboard: ", error);
        }
     }
     
     async function getLogisticsDashboardDetails(userID) {
        try {
            const dashboard = await contract.getLogisticsUserDashboard(userID);
            console.log("Logistics user dashboard: ", dashboard);
            return dashboard;
        } catch (error) {
            console.error("Error getting logistics user dashboard: ", error);
        }
     }

    return { 
        addProductDetails ,
        getProductDetails,
        addManufacturerDashboardDetails,
        addDistributorDashboardDetails,
        addLogisticsDashboardDetails,
        getManufacturerUserDashboardDetails,
        getDistributorUserDashboardDetails,
        getLogisticsDashboardDetails
    }
}


export default contractFunction