const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors =require("cors");
const authRoute = require('./routes/authRoute.js');
const connectDB=require('./config/db.js');
const { addproductdetails, getproductdetails} = require('./main.js');
const fs = require('fs');
dotenv.config();

const app = express();
connectDB()

app.use(bodyParser.json());
app.use(cors())
app.post('/api/post-example', (req, res) => {
  const postData = req.body;
  console.log('Received POST data:', postData);
  res.json({ message: 'POST request received successfully' });
});

app.post('/api/addproductdetails', async (req, res) => {
  try {
    const { productID, jsonData } = req.body;
    const jsonString = JSON.stringify(jsonData, null, 2);
    console.log()
    await fs.promises.writeFile(`${productID}.json`, jsonString, (err) => {
      if (err) {
        console.error('Error creating JSON file:', err);
        // Handle the error here
      } else {
        // File created successfully
      }
    });
    console.log(`File '${productID}.json' created successfully`);
    // Call your function to add user details
    await addproductdetails(productID);

    res.json({ message: 'User details added successfully' });
  } catch (error) {
    console.error('Error adding user details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get user details
app.post('/api/getproductdetails', async (req, res) => {
  try {
    const { productID} = req.body;

    // Call your function to get user details
    const  product = await getproductdetails(productID);
    const productjsondata = JSON.parse(product);  
    res.json(productjsondata);
  } catch (error) {
    console.error('Error getting user details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.use("/v1/auth", authRoute)

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
