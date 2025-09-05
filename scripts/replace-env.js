const fs = require('fs');
const path = require('path');
require('dotenv').config();

const isDev = process.argv[2] === 'dev';
const swaggerPath = path.join(__dirname, '../build/swagger.yaml');

const apiUrl = isDev 
    ? (process.env.API_BASE_URL || 'http://localhost:3003')
    : (process.env.API_BASE_URL || '$$API_SERVER_URL$$');

try {
    let content = fs.readFileSync(swaggerPath, 'utf8');

    content = content.replace(/\$\$API_SERVER_URL\$\$/g, apiUrl);

    fs.writeFileSync(swaggerPath, content);
    console.log(`✅ Swagger spec updated with API URL: ${apiUrl}`);
} catch (error) {
        console.error('❌ Error updating swagger spec:', error.message);
        process.exit(1);
}