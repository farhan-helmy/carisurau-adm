import { Request, Response, NextFunction } from 'express';
import { validateApp } from '../db/auth';

export const validateDev = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { app_key, app_secret } = req.headers
        const result = await validateApp(app_key as string, app_secret as string)

        if (result.status === "success") {
            next()
            return
        }

        res.status(401).json({
            message: 'Unauthorized'
        })

    }
}

export const comingSoon = () => {
    return async (req: Request, res: Response, next: NextFunction) => {

        res.status(401).json({
            message: 'Coming Soon'
        })

    }
}