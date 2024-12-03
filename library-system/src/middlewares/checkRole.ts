import { Request, Response, NextFunction } from "express";

export const checkRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (req.user?.role !== role) {
      res.status(403).send("Forbidden");
      return;
    }
    next();
  };
};