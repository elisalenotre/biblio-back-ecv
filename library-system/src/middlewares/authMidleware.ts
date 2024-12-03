import { User } from "../types/User";

import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("Unauthorized");
  }

  const user: User = {
    id: 1,
    role: authHeader === "bibliothecaire" ? "bibliothecaire" : "emprunteur",
  };

  req.user = user;
  next();
};
