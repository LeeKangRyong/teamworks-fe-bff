const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

app.use(morgan('dev')); // 배포 단계에서는 combined or common 사용

app.get('/', () => {
    console.log('Main BFF');
});

module.exports = app;