const authAdapter = require('../adapters/authAdapter');

class AuthService {
    async login(credentials) {
        try {
            if (!credentials.email || !credentials.password) {
                throw {
                    status: 400,
                    message: 'Email and password are required'
                };
            }

            const result = await authAdapter.login(credentials);

            return {
                success: true,
                data: {
                    user: {
                        id: result.user.id,
                        email: result.user.email,
                        name: result.user.name,
                        role: result.user.role,
                        isLogin: true
                    },
                    accessToken: result.accessToken,
                    refreshToken: result.refreshToken
                },
                message: 'Login successful'
            };
        } catch (error) {
            throw {
                status: error.status || 500,
                message: error.message || 'Login failed'
            };
        }
    }

    async registerAdmin(userData) {
        try {
            if (!userData.email || !userData.password || !userData.name) {
                throw {
                    status: 400,
                    message: 'Email, password, and name are required'
                };
            }

            const adminData = {
                ...userData,
                role: 'admin'
            };

            const result = await authAdapter.register(adminData);

            return {
                success: true,
                data: {
                    user: {
                        id: result.user.id,
                        email: result.user.email,
                        name: result.user.name,
                        role: result.user.role
                    }
                },
                message: 'Admin registration successful'
            };
        } catch (error) {
            throw {
                status: error.status || 500,
                message: error.message || 'Admin registration failed'
            };
        }
    }

    async registerUser(userData) {
        try {
            if (!userData.email || !userData.password || !userData.name) {
                throw {
                    status: 400,
                    message: 'Email, password, and name are required'
                };
            }

            const userInfo = {
                ...userData,
                role: 'user'
            };

            const result = await authAdapter.register(userInfo);

            return {
                success: true,
                data: {
                    user: {
                        id: result.user.id,
                        email: result.user.email,
                        name: result.user.name,
                        role: result.user.role
                    }
                },
                message: 'User registration successful'
            };
        } catch (error) {
            throw {
                status: error.status || 500,
                message: error.message || 'User registration failed'
            };
        }
    }

    async refreshToken(refreshToken) {
        try {
            if (!refreshToken) {
                throw {
                    status: 400,
                    message: 'Refresh token is required'
                };
            }

            const result = await authAdapter.refreshToken(refreshToken);

            return {
                success: true,
                data: {
                    accessToken: result.accessToken,
                    refreshToken: result.refreshToken
                },
                message: 'Token refreshed successfully'
            };
        } catch (error) {
            throw {
                status: error.status || 500,
                message: error.message || 'Token refresh failed'
            };
        }
    }

    async logout(token) {
        try {
            if (!token) {
                throw {
                    status: 400,
                    message: 'Access token is required'
                };
            }

            await authAdapter.logout(token);

            return {
                success: true,
                message: 'Logout successful'
            };
        } catch (error) {
            throw {
                status: error.status || 500,
                message: error.message || 'Logout failed'
            };
        }
    }
}

module.exports = new AuthService();
