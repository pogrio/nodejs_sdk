const axios = require('axios');

const createHttpClient = (baseURL) => {
    return axios.create({
        baseURL,
        timeout: 5000,
        headers: { 'Content-Type': 'application/json' }
    });
};

module.exports = { createHttpClient };
