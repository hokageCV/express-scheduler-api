import { Request, Response, NextFunction } from "express";

export type ExpressAPIHandler = (req: Request, res: Response, next: NextFunction) => any;
