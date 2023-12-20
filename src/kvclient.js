// kv client
const axios = require('axios');

// Check for email and global api key
async function validateCreds(email, globalApiKey, accountID) {

    try {
        
        const headers = {
            'Content-Type':'application/json',
            'X-Auth-Email': email,
            'X-Auth-Key'  : globalApiKey,
        }

        // make a sample request to verify the credentials
        const resp = await axios.get('https://api.cloudflare.com/client/v4/accounts/fe71379a46f04581143516878e5da3e5/storage/kv/namespaces', { headers });
        console.log(resp.data.success);
        // check if success is equal to true
        if(resp.data.success == true) {
            console.log('Token(s) Verified Successfully');
        }
    }
    catch(e){
        console.log(e);
        console.log('Missing Or Invalid Credentials');
    }
}


async function getPlaceholderData() {

    const resp = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    console.log(resp.data);
}

// getPlaceholderData();

module.exports = {
    validateCreds,
}










// https://api.cloudflare.com/client/v4/accounts/fe71379a46f04581143516878e5da3e5/storage/kv/namespaces
