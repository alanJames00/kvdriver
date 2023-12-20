const KVClient = require('./kvclient');
require('dotenv').config({path: '../.env'})

// import the credentials


const email = process.env.EMAIL_ID;
const globalApiKey = process.env.GLOBAL_TOKEN;


KVClient.validateCreds(email, globalApiKey, '00');
