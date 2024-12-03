const handleErrors = (error) => {
    if (error.response) {
        console.error('API Error:', error.response.data.error || error.response.statusText);
        throw new Error(error.response.data.error || error.response.statusText);
    } else if (error.request) {
        console.error('No response from server');
        throw new Error('No response from server');
    } else {
        console.error('Unexpected error:', error.message);
        throw new Error(error.message);
    }
};

module.exports = { handleErrors };
