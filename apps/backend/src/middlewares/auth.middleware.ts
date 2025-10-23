// @ts-ignore
import type { Request, Response, NextFunction } from 'express';
// @ts-ignore
import type { JWTPayload } from '@backend/services/auth.service.js';
import { JWTService } from '@backend/services/auth.service.js';

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

export class AuthMiddleware {
  static authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const token = JWTService.extractTokenFromHeader(req.headers.authorization);

      if (!token) {
        return res.status(401).json({ error: 'Access token is required' });
      }

      const decoded = JWTService.verifyToken(token);
      if (!decoded) {
        return res.status(401).json({ error: 'Invalid or expired token' });
      }

      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
  }

  static authorize(allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Insufficient permissions' });
      }

      next();
    };
  }

  static requireAdmin = AuthMiddleware.authorize(['ADMIN']);
  static requireEmployee = AuthMiddleware.authorize(['ADMIN', 'EMPLOYEE']);
}
