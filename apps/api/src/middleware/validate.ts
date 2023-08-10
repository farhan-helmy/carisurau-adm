import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import { checkUser } from '../db/auth';
import z from 'zod';

export const validateTokenAndSchema = (schema?: z.Schema<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.replace('Bearer ', '');

    try {
      const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string);
      if (typeof decoded !== 'object') {
        throw new Error('Unauthorized');
      }

      const developer = await checkUser(decoded.id);
      if (!developer) {
        throw new Error('Unauthorized');
      }

      // If a schema is provided, validate the request body against the schema
      if (schema) {
        const data = req.body;
        schema.parse(data);
      }

      // If both token and optional schema validation are successful, proceed to the next middleware or route handler
      next();
    } catch (error: any) {
      if (error instanceof jwt.JsonWebTokenError || error.message === 'Unauthorized') {
        res.status(401).json({ error: 'Unauthorized' });
      } else if (schema && error instanceof z.ZodError) {
        const errorMessage = error.errors.map((err: any) => {
          return {
            code: err.code,
            message: err.message,
            path: err.path,
            // Optionally, you can include 'expected' and 'received' fields for more information
            // expected: err.expected,
            // received: err.received,
          };
        });
        res.status(400).json({ errors: errorMessage });
      } else {
        // For unexpected errors (not related to schema or token validation), handle them here
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };
};