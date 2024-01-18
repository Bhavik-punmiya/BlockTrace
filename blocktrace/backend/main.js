const fs = require('fs');
const { encryptFile, decryptFile } = require('./encryption/EncryptDecrypt.js');
require('dotenv').config();
const pinFileToIPFS = require('./pinFileToIpfs.js')
const pinImageToIPFS = require('./pinImageToIpfs.js')
const { addProductDetails,
  getProductIpfsHash,
  addManufacturerDashboardDetails,
  addDistributorDashboardDetails,
  addLogisticsDashboardDetails,
  getManufacturerUserDashboardDetails,
  getDistributorUserDashboardDetails,
  getLogisticsDashboardDetails } = require('./StoreOnChain.js');
const downloadFile = require('./FetchFromIPFS.js');
const { deleteFile } = require('./deleteFile.js');
const secretKey = "f21fa34350a5068fdeeb05cbc05858f4";
const imagepath = './constants/img/iphone.png'
const addproductdetails = async (productId) => {
  try {

    await encryptFile(`${productId}.json`, secretKey, `${productId}.txt`);
    const IPFSObject = await pinFileToIPFS(productId);
    console.log(IPFSObject);
    const imageHash = await pinImageToIPFS(imagepath);
    console.log(imageHash)
    const StoreOnChain = await addProductDetails(productId, IPFSObject, imageHash);
    console.log('User details encrypted and saved successfully.');
  } catch (error) {
    console.error('Error encrypting and saving user details:', error);
  }
};

const getproductdetails = async (productId) => {
  try {
    const IpfsHashfromChain = await getProductIpfsHash(productId);
    console.log(IpfsHashfromChain)
    const file = await downloadFile(IpfsHashfromChain, productId);
    await decryptFile(`${productId}.txt`, secretKey, `${productId}.json`);
    const data = await fs.readFileSync(`${productId}.json`);
    console.log('User details decrypted and saved successfully.');
    deleteFile(`${productId}.json`);
    deleteFile(`${productId}.txt`);
    return data;
  } catch (error) {
    console.error('Error decrypting and saving user details:', error);
  }
};

const addManufacturerDashboard = async (manufacturerRow, manufacturerID) => {
  try {
    // Call your function to add a row to the Manufacturer Dashboard
    await addManufacturerDashboardDetails(manufacturerRow, manufacturerID);
  } catch (error) {
    console.error('Error updating manufacturer dashboard:', error);
  }
};

// Function to get the Manufacturer User Dashboard
const getManufacturerUserDashboard = async (manufacturerID) => {
  try {
    // Call your function to get the Manufacturer User Dashboard
    const manufacturerUserDashboard = await getManufacturerUserDashboardDetails(manufacturerID);

    return manufacturerUserDashboard;
  } catch (error) {
    console.error('Error getting manufacturer user dashboard:', error);
    throw error;
  }
};

const addDistributorDashboard = async (distributorRow, userID) => {
  try {
    await addDistributorDashboardDetails(distributorRow, userID);
  } catch (error) {
    console.error('Error updating distributor dashboard:', error);
  }
};

const getDistributorUserDashboard = async (userID) => {
  try {
    const distributorUserDashboard = await getDistributorUserDashboardDetails(userID);
    return distributorUserDashboard;
  } catch (error) {
    console.error('Error getting distributor user dashboard:', error);
    throw error;
  }
};

const addLogisticsDashboard = async (logisticsRow, userID) => {
  try {
    await addLogisticsDashboardDetails(logisticsRow, userID);
  } catch (error) {
    console.error('Error updating logistics dashboard:', error);
  }
};

const getLogisticsDashboard = async (userID) => {
  try {
    const logisticsUserDashboard = await getLogisticsDashboardDetails(userID);
    return logisticsUserDashboard;
  } catch (error) {
    console.error('Error getting logistics user dashboard:', error);
    throw error;
  }
};



const productId = "69b84bd8e2b9d504c6eaed6e0eb3027c";
// const ipfs = 'QmSztkBBdpZik9wWyrTtBmaLCcvVPMtcksm4cJ3JiT6krN'
// getproductdetails(productId);
const decryptFiles = async () => {
  await decryptFile(`${productId}.txt`, secretKey, `${productId}.json`);

}


// decryptFiles()
// addproductdetails(productId);


module.exports = {
  addproductdetails,
  getproductdetails,
  addManufacturerDashboard,
  getManufacturerUserDashboard,
  addDistributorDashboard,
  getDistributorUserDashboard,
  addLogisticsDashboard,
  getLogisticsDashboard,
};