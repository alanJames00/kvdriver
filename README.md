# KV Driver

## Getting Started
Require the KVClient Class in the your project.
```js
    const KVClient = require('./kvclient');

```

Create and instance of kvClient and provide your Cloudflare Global API Key, Registered Email ID and CF AccountID.

```js

const kvClient = new KVClient({ 
    email: '<REGISTERED EMAIL>',
    globalApiKey: '<CF-GLOBAL-API-KEY>', 
    accountID: '<CF-ACCOUNT-ID>'
    });

```

Now you can use the method on the kvClient instance to do the following operations.
## Currently Supported Operations

### 1. List Namespaces

Lists all the namespaces in a Cloudflare account

Method
```js
async function listNS() {
    try {

        const result = await kvClient.ListNameSpaces();
        return result;
    }
    catch(e) {
        return e;
    }
}
```

Returns an array of the KV namespaces owned by an account.

### 2. Create a New Namespace

Creates a namespace under the given title. An Error is returned if the account already owns a namespace with this title. A namespace must be explicitly deleted to be replaced.

```js
async function createNS() {
    
    try {

        const result = await kvClient.CreateNameSpace('new-kv-ns');
        return result;
    }
    catch(e) {
        return e;
    }
}
```
### 3. Write Key Value Pair

### 4. Write Multiple Key Value Pairs

### 5. Read Value of a Key

### 6. Delete a Key Value Pair

### 7. List All The Keys in a Namespace

Retrieves a list of keys from the specified Cloudflare Key-Value namespace.

```js
async function listNSKeys() {
    
    // Unique 32 Char Long Namespace Identifier
    const namespaceId = '05f2a1a0e65c4084ad7cda2f973c3b55'
    try {
        const result = await kvClient.listNamespaceKeys()
        return result;
    }
    catch(e) {
        return e;
    }
}
```