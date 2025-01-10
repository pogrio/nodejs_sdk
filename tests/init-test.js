const POGRSDK = require('../src/pogr-sdk');
const axios = require('axios');

jest.mock('axios');

describe('POGRSDK Initialization', () => {
    it('should initialize with a valid JWT', async () => {
        axios.post.mockResolvedValue({ data: { payload: { session_id: 'session id' } } });

        const sdk = new POGRSDK('clientKey', 'buildKey');
        await sdk.initWithUserJWT('userJWT');
        expect(sdk.sessionID).toBe('session id');
    });

    it('should throw an error with invalid JWT', async () => {
        axios.post.mockRejectedValue({ response: { data: { error: 'Invalid JWT' } } });

        const sdk = new POGRSDK('clientKey', 'buildKey');
        await expect(sdk.initWithUserJWT('invalidJWT')).rejects.toThrow('Invalid JWT');
    });
});
