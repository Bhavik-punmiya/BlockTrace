const { Connection, Transaction, sendAndConfirmTransaction, PublicKey, Keypair, TransactionInstruction } = require('@solana/web3.js');

// Initialize connection to the Solana cluster
const connection = new Connection('https://api.testnet.solana.com', 'confirmed');

// Program ID
const programId = new PublicKey('Q1GpYzj5MLSjkG24y4tcTfbtu8ZJbj1bSFxvajKCK4s');

// Keypair for signing transactions
const keypair = Keypair.fromSecretKey(
 Uint8Array.from([124,171,153,247,205,32,250,208,60,71,6,30,243,64,81,157,27,94,195,255,144,125,254,49,0,189,127,49,238,240,253,190,143,168,227,205,196,39,157,113,202,85,134,108,42,100,29,127,164,152,85,103,43,158,211,99,51,169,60,206,174,119,212,50])
);

// Function to add product details
async function addProductDetails(productID, data) {
    // Convert strings to Uint8Arrays
    const productIDBytes = Buffer.from(productID, 'utf-8');
    const dataBytes = Buffer.from(data, 'utf-8');

    // Calculate the total length of the instruction data
    const instructionDataLength = 1 + productIDBytes.length + dataBytes.length;
    
    // Create a new Uint8Array with the calculated length
    const instructionData = new Uint8Array(instructionDataLength);

    // Set the instruction ID
    instructionData[0] = 0;

    // Set the product ID bytes
    instructionData.set(productIDBytes, 1);

    // Set the data bytes
    instructionData.set(dataBytes, productIDBytes.length + 1);

    const instruction = new TransactionInstruction({
        keys: [keypair], // Add account keys here
        programId,
        data: instructionData,
    });

    const transaction = new Transaction().add(instruction);
    transaction.feePayer = keypair.publicKey;
    const signers = ['Afnfja3BZom6st6gNfCjztmK2UbmFjVewMuALhTrye2u']; // Use the keypair for signing

    const txid = await sendAndConfirmTransaction(connection, transaction, signers);
    console.log('Product details added successfully. Transaction ID:', txid);
}


// Example usage
module.exports = { addProductDetails };
