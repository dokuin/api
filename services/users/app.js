'use stricts';

const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;
const mongoose = require('mongoose');

const router = require('./routes');

mongoose
  .connect(`mongodb://localhost:27017/dokuin-api`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log(`DokuIn API User Service is connected to MongoDB server.`);
  })
  .catch(err => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(port, () => {
  console.log(`DokuIn API User Service is running on PORT ${port}!`);
});
