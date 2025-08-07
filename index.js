const app = require('./app.js'); 
const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
    console.log(`BFF Server on port ${PORT}`);
});