# KV Driver
An npm package providing a unofficial driver for Cloudflare Key-Value (KV) storage. It allows you to interact with Cloudflare's KV storage using Node.js.

## Getting Started

Install the kvdriver npm package by running 
```sh
npm i kvdriver
```

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

Puts a key-value pair into a Cloudflare Key-Value namespace.

```js
async function WriteKeyValuePair() {
    
    try {
        // Unique 32 Char Long Namespace Identifier
        const namespaceId = '05f2a1a0e65c4084ad7cda2f973c3b55'

        // Metadata for the key should be a string
        const testMetaData = {metadataKey: 'Metadata Value'};
        const result = await kvClient.putKeyValue(namespaceId, 'test-key','test-value',JSON.stringify(testMetaData));
        return result;
    }
    catch(e) {
        return e;
    }
}

```
Note: All argument should be of type string.

### 4. Write Multiple Key Value Pairs

Puts multiple key-value pairs into a Cloudflare Key-Value namespace in bulk.

An array of objects representing key-value pairs is passed in. Each object should have properties 'key', 'value', and 'metadata'.

```js
async function WriteMultipleKeyValuePair() {
    
    try {
        // Unique 32 Char Long Namespace Identifier
        const namespaceId = '05f2a1a0e65c4084ad7cda2f973c3b55'

        const keyValueArr = [
            {key: 'test-key-1', value: 'test-value-1', metadata: JSON.stringify({metadataKey_1: 'Metadata-value-1'}) },
            {key: 'test-key-2', value: 'test-value-2', metadata: JSON.stringify({metadataKey_2: 'Metadata-value-2'}) },
            {key: 'test-key-3', value: 'test-value-3', metadata: JSON.stringify({metadataKey_3: 'Metadata-value-3'}) },

        ]
        const result = await kvClient.putKeyValueBulk(namespaceId,keyValueArr );
        console.log(result);
        return result;
    }
    catch(e) {
        console.log(e);
        return e;
    }
}

```


### 5. Read Value of a Key

Retrieves the value associated with a key from a Cloudflare Key-Value namespace.

```js
async function getKeyValue() {
    
    try {
        // Unique 32 Char Long Namespace Identifier
        const namespaceId = '05f2a1a0e65c4084ad7cda2f973c3b55'
        const result = await kvClient.getValue(namespaceId, 'test-key-1' );
        console.log(result);
        return result;
    }
    catch(e) {
        console.log(e);
        return e;
    }
}

```

### 6. Delete a Key Value Pair

Deletes a key-value pair from a Cloudflare Key-Value namespace specified by its key.

```js
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

```

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
