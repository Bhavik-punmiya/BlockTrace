const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.post('/api/post-example', (req, res) => {
  const postData = req.body;
  console.log('Received POST data:', postData);
  res.json({ message: 'POST request received successfully' });
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
