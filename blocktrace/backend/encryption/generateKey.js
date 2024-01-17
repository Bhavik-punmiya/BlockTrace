const crypto = require('crypto');
const fernet = require('fernet')
async function secretkey(){
   const  key = crypto.randomBytes(32);
   const secret = new fernet.Secret(key.toString('base64'));
   console.log(secret.signingKeyHex);
   return secret.signingKeyHex;   
}

// This is just for testing purpose to generate a secret key
module.exports = secretkey;
