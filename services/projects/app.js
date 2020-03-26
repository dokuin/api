'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3002;
const cors = require('cors');
const mongoose = require('mongoose');

const router = require('./routes');
const { errorHandler } = require('./middlewares');

const mongoURL =
  process.env.NODE_ENV === 'test'
    ? 'localhost:27017/dokuin-api-test'
    : 'mongodb:27017/dokuin-api';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);
app.use(errorHandler);

mongoose
  .connect(`mongodb://${mongoURL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log(`DokuIn API Project Service is connected to MongoDB server.`);
  })
  .catch(err => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`DokuIn API Project Service is running on PORT ${port}!`);
});

module.exports = app;
