var merge = require('webpack-merge');
var devEnv = require('./dev.env');

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  FIREBASE_apiKey: '',
  FIREBASE_authDomain: '',
  FIREBASE_databaseURL: '',
  FIREBASE_storageBucket: ''
});
