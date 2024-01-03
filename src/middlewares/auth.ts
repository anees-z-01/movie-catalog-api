import { getSigningSecret } from '../authConfig';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user';

declare global {
  namespace Express {
    interface Request {
      user?: IUser | null;
      token?: string;
    }
  }
}

// Verify the signature and require the currently saved token, so logout revokes access.

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - Missing token' });
    }

    const decoded = jwt.verify(token, getSigningSecret()) as { userId: string };
    const user = await User.findOne({ _id: decoded.userId, authToken: token });

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};

export default authMiddleware;
