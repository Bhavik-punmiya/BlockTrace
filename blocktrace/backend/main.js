const fs = require('fs');
const { encryptFile, decryptFile } = require('./encryption/EncryptDecrypt.js');
require('dotenv').config();
const 
const secretKey = "f21fa34350a5068fdeeb05cbc05858f4";

const addUserDetails = async (userId) => {
  try {

    await encryptFile(`${userId}.json`, secretKey, `${userId}.txt`);
    const IPFSObject = await pinFileToIPFS(useRef);
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

getUserDetails(userId);


// addUserDetails(userId);
