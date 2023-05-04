const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/routes');
const user = require('./routes/user');
const image = require('./routes/image');
const path = require('path');

const PORT = 8080;

const app = express();

app.use(express.json());

app.use(cors());

app.use('/', router);
app.use('/', user);
app.use('/', image);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const URI =
  'mongodb+srv://GuhanBlueEye10:guhan@cluster0.wwquo.mongodb.net/test';

mongoose
  .connect(URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running in ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
