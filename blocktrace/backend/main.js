const fs = require('fs');
const { encryptFile, decryptFile } = require('./encryption/EncryptDecrypt.js');
require('dotenv').config();
const pinFileToIPFS = require('./pinFileToIpfs.js')
const pinImageToIPFS = require('./pinImageToIpfs.js')
const { addProductDetails, addManufacturerDashboard, addDistributorDashboard, addLogisticsDashboard, getManufacturerUserDashboard,getDistributorUserDashboard, getLogisticsUserDashboard } = require('./StoreOnChain.js');

const secretKey = "f21fa34350a5068fdeeb05cbc05858f4";
const imagepath = './constants/img/iphone.png'
const addUserDetails = async (userId) => {
  try {

    await encryptFile(`${userId}.json`, secretKey, `${userId}.txt`);
    const IPFSObject = await pinFileToIPFS(userId);
    console.log(IPFSObject);
    const imageHash = await pinImageToIPFS(imagepath);
    const StoreOnChain = await addProductDetails(userId, IPFSObject, imageHash);
    console.log('User details encrypted and saved successfully.');
  } catch (error) {
    console.error('Error encrypting and saving user details:', error);
  }
};

const getUserDetails = async (userId) => {
  try {
    await decryptFile(`${userId}.txt`, secretKey, `${userId}.json`);
    console.log('User details decrypted and saved successfully.');
  } catch (error) {
    console.error('Error decrypting and saving user details:', error);
  }
};
const userId = "69b84bd8e2b9d504c6eaed6e0eb3027c";

// getUserDetails(userId);


addUserDetails(userId);
