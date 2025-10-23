import express from 'express';
import cors from 'cors';
// @ts-ignore
import { userRoutes } from '@backend/routes/user.routes.js';
// @ts-ignore
import { productRoutes } from '@backend/routes/product.routes.js';
// @ts-ignore
import { orderRoutes } from '@backend/routes/order.routes.js';
// @ts-ignore
import { budgetRoutes } from '@backend/routes/budget.routes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/budgets', budgetRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

export { app };
