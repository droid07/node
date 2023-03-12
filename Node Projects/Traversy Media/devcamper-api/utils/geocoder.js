const NodeGeocoder = require('node-geocoder');

const options = {
  provider: process.env.GE0CODER_PROVIDER,
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formater: null,
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
