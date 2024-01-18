const fs = require('fs');
const { encryptFile, decryptFile } = require('./encryption/EncryptDecrypt.js');
require('dotenv').config();
const pinFileToIPFS = require('./pinFileToIpfs.js')
const pinImageToIPFS = require('./pinImageToIpfs.js')
const { addProductDetails, getProductIpfsHash,addManufacturerDashboard, addDistributorDashboard, addLogisticsDashboard, getManufacturerUserDashboard,getDistributorUserDashboard, getLogisticsUserDashboard } = require('./StoreOnChain.js');
const downloadFile = require('./FetchFromIPFS.js');
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

const getUserDetails = async (productId) => {
  try {
    const IpfsHashfromChain = await getProductIpfsHash(productId);
    console.log(IpfsHashfromChain)
    const file = await downloadFile(IpfsHashfromChain, productId);
    await decryptFile(`${productId}.txt`, secretKey, `${productId}.json`);
    console.log('User details decrypted and saved successfully.');
  } catch (error) {
    console.error('Error decrypting and saving user details:', error);
  }
};
const productId = "69b84bd8e2b9d504c6eaed6e0eb3027c";
// const ipfs = 'QmSztkBBdpZik9wWyrTtBmaLCcvVPMtcksm4cJ3JiT6krN'
// getUserDetails(productId);
const decryptFiles = async () =>  {
  await decryptFile(`${productId}.txt`, secretKey, `${productId}.json`);

}

// decryptFiles()
// addproductdetails(productId);


module.exports = { addproductdetails, getUserDetails };