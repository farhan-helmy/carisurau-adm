import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import jwt from 'jsonwebtoken'
import { checkUser } from '../db/auth';


export const validateToken = async (req: Request, res: Response, next: NextFunction) => {

  const token = req.headers.authorization?.replace('Bearer ', '');
  const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string)

  if (typeof decoded === 'object') {
    const developer = await checkUser(decoded.id)

    if (!developer) {
      throw new Error('Unauthorized')
    }
    next()
  }
}

export const validate = (schema: z.Schema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = validateToken(req, res, next)
    if (!user) {
      throw new Error('Unauthorized')
    }
    const data = req.body;

    try {
      // Validate the request body against the provided schema
      schema.parse(data);
      // If validation is successful, proceed to the next middleware or route handler
      next();
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map((err) => {
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
        // For unexpected errors (not related to schema validation), handle them here
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };
}