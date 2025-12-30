import { Request, Response, NextFunction } from "express";
import { config } from "../../config/environment";

export const errorHandler = (
    err: any,
    _req: Request,
    res: Response,
    _next: NextFunction
): void => {
    console.error('Error:', err);

    const status = err.status || err.statusCode || 500;
    const message = err.message || 'Internal server error';

    res.status(status).json({
        message,
        ...(config.env === 'development' && {stack: err.stack})
    })
}