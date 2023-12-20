// kv client
const axios = require('axios');

async function getPlaceholderData() {

    const resp = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    console.log(resp.data);
}

getPlaceholderData();