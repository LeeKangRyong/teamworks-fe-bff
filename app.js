const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

const authRouter = require('./routers/authRouter');
const { errorHandler } = require('./middlewares/errorHandler');

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.FE_URL || 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 로깅
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.get('/', (req, res) => {
    res.json({
        message: 'Teamworks BFF Server'
    });
});

// 헬스 체크
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

app.use('/api/auth', authRouter);

app.use(errorHandler);

module.exports = app;