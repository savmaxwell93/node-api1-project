const express = require('express');
const User = require('./users/model');

// BUILD YOUR SERVER HERE
const server = express();

server.use(express.json());

module.exports = server; // EXPORT YOUR SERVER instead of {}
