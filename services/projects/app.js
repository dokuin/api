'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 3002;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`DokuIn API Project Service is running on PORT ${port}!`);
})
