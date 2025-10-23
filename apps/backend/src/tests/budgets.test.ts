import { describe, test, expect } from 'vitest';
import request from 'supertest';
// @ts-ignore
import { app } from '@backend/app.js';

describe('Budgets API', () => {
  test('POST /budgets - should create a new budget', async () => {
    const budgetData = {
      clientName: 'John Doe',
      items: [
        { productId: 'prod-1', quantity: 2, unitPrice: 50 },
        { productId: 'prod-2', quantity: 1, unitPrice: 100 }
      ]
    };

    const response = await request(app)
      .post('/budgets')
      .send(budgetData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.clientName).toBe(budgetData.clientName);
    expect(response.body.items).toEqual(budgetData.items);
    expect(response.body.total).toBe(200); // 2*50 + 1*100
  });

  test('GET /budgets - should return list of budgets', async () => {
    const response = await request(app)
      .get('/budgets');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
