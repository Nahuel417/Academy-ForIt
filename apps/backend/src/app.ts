import express from 'express';
import cors from 'cors';
// @ts-ignore
import { userRoutes } from '@backend/routes/user.routes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', userRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

export { app };
