var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '',
  FIREBASE_apiKey: '',
  FIREBASE_authDomain: '',
  FIREBASE_databaseURL: '',
  FIREBASE_storageBucket: ''
});
