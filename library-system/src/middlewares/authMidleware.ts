import { User } from "../types/User";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).send("Unauthorized");
    return; 
  }

  const user: User = {
    id: 1,
    role: authHeader === "bibliothecaire" ? "bibliothecaire" : "emprunteur",
  };

};