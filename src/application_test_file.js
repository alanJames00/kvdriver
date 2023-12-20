const KVClient = require('./kvclient');
require('dotenv').config({path: '../.env'})

// import the credentials

// KVClient.validateCreds()

const email = process.env.EMAIL_ID;
const globalApiKey = process.env.GLOBAL_TOKEN;

console.log(email);
console.log(globalApiKey);