const KVClient = require('./kvclient');
require('dotenv').config({path: '../.env'})

// import the credentials


const email = process.env.EMAIL_ID;
const globalApiKey = process.env.GLOBAL_TOKEN;
const accountID = process.env.ACCOUNT_ID;


const kvClient = new KVClient({ email, globalApiKey, accountID });

// kvClient.validateCreds();
// kvClient.ListNamespaces();



async function testing() {
    const arr = [{key:'bk-1',value:'bv-1'},{key:'bk2',value:'bv2'},{key:'bk3',value:'bv3'},{key:'bk4',value:'bv4'}]
    const res = await kvClient.putKeyValueBulk('05f2a1a0e65c4084ad7cda2f973c3b34',arr);
    console.log(res);
}

async function deleteKeyValue() {
    
    try {
        // Unique 32 Char Long Namespace Identifier
        const namespaceId = '05f2a1a0e65c4084ad7cda2f973c3b55'
        const result = await kvClient.deleteKeyValue(namespaceId, 'test-key-1' )
        console.log(result);
        return result;
    }
    catch(e) {
        console.log(e);
        return e;
    }
}
