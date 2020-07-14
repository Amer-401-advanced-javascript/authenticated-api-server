'use strict';

const mongoose = require('mongoose');
require('dotenv').config();
const server = require('./lib/server');
const MONGODB_URI = 'mongodb://localhost:27017/authenticated-api-server';

mongoose.connect(MONGODB_URI || process.env.MONGODB_URI, {
  useFindAndModify:false,
  useCreateIndex: true , 
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

server.start();