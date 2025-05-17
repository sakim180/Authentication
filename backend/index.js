import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectdb from './config/mongodb.js';
import userAuthRouter from './routes/userAuthRoutes.js';
import userrouter from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to database
connectdb();

// Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Allow both local and deployed frontend origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://authentication-murex-seven.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Routes
app.use('/api/auth', userAuthRouter);
app.use('/api/user', userrouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
