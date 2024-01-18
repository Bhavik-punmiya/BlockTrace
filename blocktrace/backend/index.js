const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');
const apiroute = require('./routes/apiroute');
const authRoute = require('./routes/authRoute.js');
dotenv.config();

const app = express();
connectDB();

app.use(bodyParser.json());
app.use(cors());

app.post('/api/post-example', (req, res) => {
  const postData = req.body;
  console.log('Received POST data:', postData);
  res.json({ message: 'POST request received successfully' });
});

app.use('/api', apiroute); // Use the product route
app.use('/v1/auth', authRoute);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
