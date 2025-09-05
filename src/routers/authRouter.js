const express = require('express');
const authService = require('../services/authService');

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login({ email, password });
        
        res.status(200).json(result);
    } catch (error) {
        console.error('Login error:', error);
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }
});

router.post('/register/admin', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const result = await authService.registerAdmin({ email, password, name });
        
        res.status(201).json(result);
    } catch (error) {
        console.error('Admin registration error:', error);
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }
});

router.post('/register/user', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const result = await authService.registerUser({ email, password, name });
        
        res.status(201).json(result);
    } catch (error) {
        console.error('User registration error:', error);
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }
});

router.post('/refresh', async (req, res) => {
    try {
        const { refreshToken } = req.body;
        const result = await authService.refreshToken(refreshToken);
        
        res.status(200).json(result);
    } catch (error) {
        console.error('Token refresh error:', error);
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }
});

router.post('/logout', async (req, res) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        const result = await authService.logout(token);
        
        res.status(200).json(result);
    } catch (error) {
        console.error('Logout error:', error);
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }
});

module.exports = router;