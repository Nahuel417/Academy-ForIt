import { describe, test, expect } from 'vitest';
import request from 'supertest';
// @ts-ignore
import { app } from '@backend/app.js';

describe('Orders API', () => {
  test('POST /orders - should create a new order', async () => {
    const orderData = {
      customerName: 'John Doe',
      items: [
        { productId: 'prod-1', quantity: 2, unitPrice: 50 },
        { productId: 'prod-2', quantity: 1, unitPrice: 100 }
      ],
      paymentMethod: 'CASH'
    };

    const response = await request(app)
      .post('/orders')
      .send(orderData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.customerName).toBe(orderData.customerName);
    expect(response.body.items).toEqual(orderData.items);
    expect(response.body.status).toBe('PENDING');
    expect(response.body.paymentMethod).toBe(orderData.paymentMethod);
    expect(response.body.total).toBe(200); // 2*50 + 1*100
  });

  test('GET /orders - should return list of orders', async () => {
    const response = await request(app)
      .get('/orders');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('PATCH /orders/:id/status - should update order status', async () => {
    // First create an order
    const createResponse = await request(app)
      .post('/orders')
      .send({
        customerName: 'Jane Smith',
        items: [{ productId: 'prod-1', quantity: 1, unitPrice: 75 }],
        paymentMethod: 'CARD'
      });

    const orderId = createResponse.body.id;

    const response = await request(app)
      .patch(`/orders/${orderId}/status`)
      .send({ status: 'COMPLETED' });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('COMPLETED');
  });
});
