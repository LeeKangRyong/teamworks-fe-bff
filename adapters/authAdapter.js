const axios = require('axios');

class AuthAdapter {
    constructor() {
        this.client = axios.create({
            baseURL: process.env.BE_URL || 'http://localhost:8001',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    async login(credentials) {
        try {
            const response = await this.client.post('/api/auth/login', credentials);
            return response.data;
        } catch (error) {
            throw {
                status: error.response?.status || 500,
                message: error.response?.data?.message || 'Authentication service error'
            };
        }
    }

    async register(userData) {
        try {
            const response = await this.client.post('/api/auth/register', userData);
            return response.data;
        } catch (error) {
            throw {
                status: error.response?.status || 500,
                message: error.response?.data?.message || 'Registration service error'
            };
        }
    }

    async refreshToken(refreshToken) {
        try {
            const response = await this.client.post('/api/auth/refresh', { refreshToken });
            return response.data;
        } catch (error) {
            throw {
                status: error.response?.status || 500,
                message: error.response?.data?.message || 'Token refresh error'
            };
        }
    }

    async logout(token) {
        try {
            const response = await this.client.post('/api/auth/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw {
                status: error.response?.status || 500,
                message: error.response?.data?.message || 'Logout service error'
            };
        }
    }
}

module.exports = new AuthAdapter();