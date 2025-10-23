// @ts-ignore
import type { Request, Response } from 'express';
// @ts-ignore
import { register, authenticate, updateUserRole } from 'demo-domain';
// @ts-ignore
import type { UserService } from 'demo-domain';
// @ts-ignore
import type { UserRoleType } from 'demo-domain';

interface UserControllerDeps {
  userService: UserService;
}

export class UserController {
  constructor(private deps: UserControllerDeps) {}

  async register(req: Request, res: Response) {
    try {
      const { email, password, role } = req.body;

      const result = await register(this.deps, { email, password, role });

      if (result instanceof Error) {
        return res.status(400).json({ error: result.message });
      }

      const { password: _, ...userWithoutPassword } = result;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const result = await authenticate(this.deps, { email, password });

      if (result instanceof Error) {
        return res.status(401).json({ error: result.message });
      }

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateRole(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { role } = req.body as { role: UserRoleType };

      const result = await updateUserRole(this.deps, { userId: id, role });

      if (result instanceof Error) {
        return res.status(404).json({ error: result.message });
      }

      const { password, ...userWithoutPassword } = result;
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
