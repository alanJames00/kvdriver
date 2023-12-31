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
            /**
                 * Asynchronously retrieves an array of all KV namespaces under the Cloudflare account.
                 *
                 * @async
                 * @function
                 * @returns {Promise<Array<string>>} A Promise that resolves to an array of namespace names.
                 * @throws {Error} If an error occurs during the API request.
                 * }
            */
            async ListNameSpaces() {
                const resp = await axios.get(`https://api.cloudflare.com/client/v4/accounts/${this.accountID}/storage/kv/namespaces`, { headers: this.headersObj });
                
                // returns an array of all the namespaces under account id
                return resp.data.result;
            }


            /**
                * Asynchronously creates a new namespace under the Cloudflare account.
                *
                * @async
                * @function
                * @param {string} nameSpaceTitle - The title of the new namespace.
                * @returns {Promise<Object>} A Promise that resolves to the result of the namespace creation.
                *   If successful, the result contains information about the new namespace.
                *   If unsuccessful, the result contains an error message and details about the failure.
                * @throws {Error} If an error occurs during the API request.
                * }
            */
            async CreateNameSpace(nameSpaceTitle) {

                try {
                    
                    const resp = await axios.post(`https://api.cloudflare.com/client/v4/accounts/${this.accountID}/storage/kv/namespaces`, {
                        title: nameSpaceTitle,
                    }, { headers: this.headersObj });

                    if(resp.data.success == true) {

                        return resp.data.result;
                    }
                    else {
                        return {
                            error: 'Failed To Create Namespace',
                            errors: resp.data.errors
                        };
                    }
                    
                }
                catch(err){
                    return {
                        error: 'Failed To Create Namespace',
                        cause: 'Missing Or Invalid Credentials'
                    };
                }
            }


            /**
                * Asynchronously puts a key-value pair into a Cloudflare Key-Value namespace.
                *
                * @async
                * @function
                * @param {string} namespace_id - The ID of the namespace where the key-value pair will be stored.
                * @param {string} key - The key for the key-value pair.
                * @param {string} value - The value for the key-value pair.
                * @param {string} metadata - Additional metadata associated with the key-value pair. The metadata should be stringified JS Object.
                * @returns {Promise<Object>} A Promise that resolves to the result of the operation.
                *   If successful, the result contains information about the operation.
                *   If unsuccessful, the result contains an error message and details about the failure.
                * @throws {Error} If an error occurs during the API request.
                * }
            */
            async putKeyValue(namespace_id, key, value, metadata) {

                try {   

            
                    const resp = await axios.put(`https://api.cloudflare.com/client/v4/accounts/${this.accountID}/storage/kv/namespaces/${namespace_id}/bulk`, 
                    [ 
                        {   
                            key: key,
                            value: value,
                            metadata: metadata
                        }
                    ],
                    { headers: this.headersObj });

                    return resp.data;
                }
                catch(err) {
                    return err.response.data;
                }
            }


            /**
                 * Asynchronously puts multiple key-value pairs into a Cloudflare Key-Value namespace in bulk.
                 *
                 * @async
                 * @function
                 * @param {string} namespace_id - The ID of the namespace where the key-value pairs will be stored.
                 * @param {Array<Object>} keyValueArr - An array of objects representing key-value pairs.
                 *   Each object should have properties 'key', 'value', and 'metadata'.
                 * @returns {Promise<Object>} A Promise that resolves to the result of the bulk operation.
                 *   If successful, the result contains information about the operation.
                 *   If unsuccessful, the result contains an error message and details about the failure.
                 * @throws {Error} If an error occurs during the API request.
                 * }
             */
            async putKeyValueBulk(namespace_id, keyValueArr) {

                try {
                    
                    const resp = await axios.put(`https://api.cloudflare.com/client/v4/accounts/${this.accountID}/storage/kv/namespaces/${namespace_id}/bulk`, 
                    keyValueArr,
                    { headers: this.headersObj });

                    return resp.data;
                }
                catch(err) {
                    return err.response.data;
                }

            }

            /**
                * Asynchronously retrieves the value associated with a key from a Cloudflare Key-Value namespace.
                *
                * @async
                * @function
                * @param {string} namespace_id - The ID of the namespace where the key-value pair is stored.
                * @param {string} key - The key for which to retrieve the value.
                * @returns {Promise<Object>} A Promise that resolves to the result of the operation.
                *   If successful, the result contains the value associated with the key.
                *   If unsuccessful, the result contains an error message and details about the failure.
                * @throws {Error} If an error occurs during the API request.
                * }
            */            
            async getValue(namespace_id, key) {
                try {

                    const resp = await axios.get(`https://api.cloudflare.com/client/v4/accounts/${this.accountID}/storage/kv/namespaces/${namespace_id}/values/${key}`, 
                    
                    { headers: this.headersObj });

                    return resp.data;
                }
                catch(err) {
                    return err.response.data;
                }
            }

            /**
                * Asynchronously retrieves a list of keys from a Cloudflare Key-Value namespace.
                *
                * @async
                * @function
                * @param {string} namespace_id - The ID of the namespace for which to list keys.
                * @returns {Promise<Array<string>>} A Promise that resolves to an array of keys in the namespace.
                * @throws {Error} If an error occurs during the API request.
                *}
            */
            async listNamespaceKeys(namespace_id) {
                try {

                    const resp = await axios.get(`https://api.cloudflare.com/client/v4/accounts/${this.accountID}/storage/kv/namespaces/${namespace_id}/keys`, 
                    
                    {headers: this.headersObj})

                    // returns an array of all the keys in the kv
                    return resp.data.result;
                }
                catch(err) {
                    return err.response.data;
                }
            }

            /**
            * Asynchronously deletes a key-value pair from a Cloudflare Key-Value namespace.
            *
            * @async
            * @function
            * @param {string} namespace_id - The ID of the namespace from which to delete the key-value pair.
            * @param {string} key - The key of the key-value pair to be deleted.
            * @returns {Promise<Object>} A Promise that resolves to the result of the delete operation.
            *   If successful, the result contains information about the operation.
            *   If unsuccessful, the result contains an error message and details about the failure.
            * @throws {Error} If an error occurs during the API request.
            * }
        */
            async deleteKeyValue(namespace_id, key) {
                try {

                    const resp = await axios.delete(`https://api.cloudflare.com/client/v4/accounts/${this.accountID}/storage/kv/namespaces/${namespace_id}/values/${key}`, 
                    
                    {headers: this.headersObj})

                    // returns an array of all the keys in the kv
                    return resp.data;
                }
                catch(err) {
                    return err.response.data;
                }   
            }
        }

module.exports = KVClient;
