// @ts-ignore
import type { Request, Response } from 'express';
// @ts-ignore
import { createOrder, getOrderById, getOrderList, updateOrderStatus } from 'demo-domain';
// @ts-ignore
import type { OrderService } from 'demo-domain';

interface OrderControllerDeps {
  orderService: OrderService;
}

export class OrderController {
  constructor(private deps: OrderControllerDeps) {}

  async create(req: Request, res: Response) {
    try {
      const { customerName, items, paymentMethod } = req.body;

      const result = await createOrder(this.deps, { customerName, items, paymentMethod });

      if (result instanceof Error) {
        return res.status(400).json({ error: result.message });
      }

      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const orders = await getOrderList(this.deps);
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const result = await updateOrderStatus(this.deps, { orderId: id, status });

      if (result instanceof Error) {
        return res.status(404).json({ error: result.message });
      }

      // Get updated order
      const order = await this.deps.orderService.findById(id);
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
