const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const swaggerSpec = YAML.load(path.join(__dirname, 'build/swagger.yaml'));

const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

const authRouter = require('./src/routers/authRouter');
const { errorHandler } = require('./src/middlewares/errorHandler');

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.FE_URL || 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 로깅
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.get('/', (req, res) => {
    res.json({
        message: 'Teamworks BFF Server'
    });
});

app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

app.get('/test', (req, res) => {
    const { msg } = req.query;
    res.json({
        message: `print("${msg}")`
    });
});

app.get('/test/:name', (req, res) => {
    const { name } = req.params;
    res.json({
        message: `Hello ${name || 'World'}!`,
        timestamp: new Date().toISOString()
    });
});

app.use('/api/auth', authRouter);

app.use(errorHandler);

module.exports = app;