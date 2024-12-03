const POGRSDK = require('../src/pogr-sdk');

const sdk = new POGRSDK('your-client-key', 'your-build-key');

(async () => {
    try {
        await sdk.initWithUserJWT('your-user-jwt');
        console.log('Session initialized:', sdk.sessionID);

        await sdk.endSession();
        console.log('Session ended');
    } catch (error) {
        console.error('Error:', error.message);
    }
})();
