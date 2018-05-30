'use strict';
require('dotenv').config();

exports.PORT = process.env.PORT || 3000;
exports.CONSUMER_KEY = process.env.CONSUMER_KEY;
exports.CONSUMER_SECRET = process.env.CONSUMER_SECRET;
exports.ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;
exports.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;