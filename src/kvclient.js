// kv client
const axios = require('axios');

        class KVClient {


            /**
                * Initializes the KVClient.
                * @constructor
                * @param {Object} options - The options for initializing the client.
                * @param {string} options.email - The email associated with the Cloudflare account.
                * @param {string} options.globalApiKey - The global API key for authentication.
                * @param {string} options.accountID - The Cloudflare account ID
            */

            // init the constructor
            constructor({ email, globalApiKey, accountID }) {
                this.email = email;
                this.globalApiKey = globalApiKey;
                this.accountID = accountID;

                // create the headerObj
                this.headersObj = {
                    'Content-Type' : 'application/json',
                    'X-Auth-Email' : this.email,
                    'X-Auth-Key'   : this.globalApiKey,
                }
            };

            // Function Definitions 


             /**
                * Validates the provided credentials by making a request to the Cloudflare API.
                * @async
                * @function
                * @returns {Promise<boolean>} - A Promise that resolves to the success status of the validation.
            */

            async validateCreds() {

                try{

                    const resp = await axios.get(`https://api.cloudflare.com/client/v4/accounts/${this.accountID}/storage/kv/namespaces`, { headers: this.headersObj });
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
                const resp = await axios.get(`https://api.cloudflare.com/client/v4/accounts/${this.accountID}/storage/kv/namespaces`, { headers: this.headersObj });
                
                // returns an array of all the namespaces under account id
                return resp.data.result;
            }

            async CreateNameSpace({ nameSpaceTitle }) {

                try {
                    
                    const resp = await axios.post(`https://api.cloudflare.com/client/v4/accounts/${this.accountID}/storage/kv/namespaces`, {
                        title: nameSpaceTitle,
                    }, { headers: this.headersObj });

                    if(resp.data.success == true) {

                        return resp.data.result;
                    }
                    else {
                        return {
                            error: 'Failed To Create Namespaces',
                            errors: resp.data.errors
                        }
                    }
                    
                }
                catch(err){
                    return {
                        error: 'Failed To Create Namespaces',
                        cause: 'Missing Or Invalid Credentials'
                    }
                }
            }

        }

module.exports = KVClient;









// https://api.cloudflare.com/client/v4/accounts/fe71379a46f04581143516878e5da3e5/storage/kv/namespaces
