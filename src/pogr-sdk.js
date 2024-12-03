const axios = require('axios');
const { DEFAULT_BASE_URL } = require('./constants');
const { handleErrors } = require('./utils/error-handler');

class POGRSDK {
    constructor(clientKey, buildKey, baseURL = DEFAULT_BASE_URL) {
        this.clientKey = clientKey;
        this.buildKey = buildKey;
        this.sessionID = null;
        this.baseURL = baseURL;
        this.httpClient = axios.create({ baseURL });
    }

    async initWithUserJWT(userJWT) {
        try {
            const response = await this.httpClient.post('/init', null, {
                headers: {
                    POGR_CLIENT: this.clientKey,
                    POGR_BUILD: this.buildKey,
                    Authorization: `Bearer ${userJWT}`
                }
            });
            this.sessionID = response.data.payload.session_id;
        } catch (error) {
            handleErrors(error);
        }
    }

    async initWithAssociationID(associationID) {
        try {
            const response = await this.httpClient.post('/init', { association_id: associationID }, {
                headers: {
                    POGR_CLIENT: this.clientKey,
                    POGR_BUILD: this.buildKey
                }
            });
            this.sessionID = response.data.payload.session_id;
        } catch (error) {
            handleErrors(error);
        }
    }

    async initWithSteamAuthTicket(steamAuthTicket) {
        try {
            const response = await this.httpClient.post('/init', { steam_auth_ticket: steamAuthTicket }, {
                headers: {
                    POGR_CLIENT: this.clientKey,
                    POGR_BUILD: this.buildKey,
                }
            });
            this.sessionID = response.data.payload.session_id;
        } catch (error) {
            handleErrors(error);
        }
    }

    async endSession() {
        if (!this.sessionID) throw new Error('No active session to end');
        try {
            await this.httpClient.post('/end', null, {
                headers: { INTAKE_SESSION_ID: this.sessionID }
            });
            this.sessionID = null;
        } catch (error) {
            handleErrors(error);
        }
    }
    async triggerEvent(eventData) {
        if (!this.sessionID) throw new Error('No active session to trigger an event');
        const requiredFields = ['event', 'sub_event', 'event_type', 'event_flag', 'event_key', 'event_data'];
        const missingFields = requiredFields.filter(field => !(field in eventData));
        if (missingFields.length > 0) {
        throw new Error(`Missing required fields in eventData: ${missingFields.join(', ')}`);
        }
    
        try {
            const response = await this.httpClient.post('/event', eventData, {
                headers: {
                    POGR_CLIENT: this.clientKey,
                    POGR_BUILD: this.buildKey,
                    INTAKE_SESSION_ID: this.sessionID
                }
            });
    
            if (response.data.success) {
                console.log('Event triggered successfully:', response.data);
            } else {
                console.error('Failed to trigger event:', response.data.error);
            }
        } catch (error) {
            handleErrors(error);
        }
    }

    async sendData(data) {
        if (!this.sessionID) throw new Error('No active session to send data');
    
        try {
            const response = await this.httpClient.post('/data', data, {
                headers: {
                    INTAKE_SESSION_ID: this.sessionID,
                }
            });
    
            if (response.data.success) {
                console.log('Data sent successfully:', response.data);
            } else {
                console.error('Failed to send data:', response.data.error);
            }
        } catch (error) {
            handleErrors(error);
        }
    }
    

    async sendLogs(logs) {
        if (!this.sessionID) throw new Error('No active session to send data');
    
        try {
            const response = await this.httpClient.post('/logs', logs, {
                headers: {
                    INTAKE_SESSION_ID: this.sessionID,
                }
            });
    
            if (response.data.success) {
                console.log('Logs sent successfully:', response.data);
            } else {
                console.error('Failed to send logs:', response.data.error);
            }
        } catch (error) {
            handleErrors(error);
        }

    }

    async sendMetrics(metrics) {
        if (!this.sessionID) throw new Error('No active session to send data');
    
        try {
            const response = await this.httpClient.post('/metrics', metrics, {
                headers: {
                    INTAKE_SESSION_ID: this.sessionID,
                }
            });
    
            if (response.data.success) {
                console.log('Data sent successfully:', response.data);
            } else {
                console.error('Failed to send data:', response.data.error);
            }
        } catch (error) {
            handleErrors(error);
        }
    
    }

    async monitorData(monitor) {
        if (!this.sessionID) throw new Error('No active session to send data');
    
        try {
            const response = await this.httpClient.post('/monitor', monitor, {
                headers: {
                    INTAKE_SESSION_ID: this.sessionID,
                }
            });
    
            if (response.data.success) {
                console.log('Data sent successfully:', response.data);
            } else {
                console.error('Failed to send data:', response.data.error);
            }
        } catch (error) {
            handleErrors(error);
        }
      
    }
}

module.exports = POGRSDK;
