const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './.env.local' });
const connectDB = require('./Database_Connector/db');
const auth = require('./Auth/auth');
const favorite = require('./API/favorite');
const errorHandling = require('./Middleware/errorHandling');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const PORT = process.env.PORT;

if (!PORT) {
    console.error('PORT environment variable is not set.');
    process.exit(1);
}

const corsOption = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
};

const app = express();
app.use(cors(corsOption));
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

async function startServer() {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT} ✅`);
        });
    } catch (e) {
        console.error('Server failed to start:', e);
        process.exit(1);
    }
}

startServer();

app.use('/api/auth', auth);
app.use('/api/favorite', favorite);

app.use(errorHandling);