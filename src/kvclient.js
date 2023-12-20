// kv client
const axios = require('axios');

class KVClient {

    // init the constructor
    constructor(email, globalApiKey, AccountID) {
        this.email = email;
        this.globalApiKey = globalApiKey;
        this.AccountID = AccountID;

        // create the headerObj
        this.headersObj = {
            'Content-Type' : 'application/json',
            'X-Auth-Email' : this.email,
            'X-Auth-Key'   : this.globalApiKey,
        }
    };

    // Function Definitions 

    async validateCreds() {

        try{

            const resp = await axios.get(`https://api.cloudflare.com/client/v4/accounts/${this.AccountID}/storage/kv/namespaces`, { headers: this.headersObj });
            console.log(resp.data.success);

            // returns the success status of validate credentials
            return resp.data.success;
        }
        catch(err) {
            console.log(err);
        }
    }

    // List Namespaces

    async ListNameSpaces() {
        const resp = await axios.get(`https://api.cloudflare.com/client/v4/accounts/${this.AccountID}/storage/kv/namespaces`, { headers: this.headersObj });
        console.log(resp.data.result);

        // returns an array of all the namespaces under account id
        return resp.data.result;
    }

    async CreateNameSpace({ nameSpaceTitle }) {

        try {
            

        }
        catch(err){
            console.log(err);
            return err;
        }
    }

}

module.exports = KVClient;









// https://api.cloudflare.com/client/v4/accounts/fe71379a46f04581143516878e5da3e5/storage/kv/namespaces
