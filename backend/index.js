import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectdb from './config/mongodb.js';
import userAuthRouter from './routes/userAuthRoutes.js';
import userrouter from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 8000;

connectdb();

const allowedOrigins = [
  'http://localhost:5173',
  'https://authentication-murex-seven.vercel.app'
];

// Enable CORS for all requests including preflight
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', userAuthRouter);
app.use('/api/user', userrouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
