//index.js
const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path:'./.env.local'});
const connectDB = require('./Database_Connector/db');
const auth = require('./Auth/auth');
const errorHandling = require('./Middleware/errorHandling');
const cors = require('cors');

const PORT = process.env.PORT;
const corsOption = {
    origin: 'http://localhost:5173',
    method: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};

const app = express();
app.use(cors(corsOption));
app.use(express.json());



connectDB().then(()=> {
    app.listen(PORT, () => {
        try {
            console.log(`Server is running on port http://localhost:${PORT} ✅`);
        } catch (e) {
            console.log(e);
            process.exit(1);
        }
    });
});

app.use('/api/auth', auth);

app.use(errorHandling);