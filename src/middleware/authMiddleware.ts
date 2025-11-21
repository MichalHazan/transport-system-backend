import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const protect = (roles?: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "No token" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

      // בדיקת תפקיד רק אם roles הוגדר
      if (roles && roles.length > 0) {
        if (!roles.includes(decoded.role)) {
          return res.status(403).json({ message: "Not authorized" });
        }
      }

      (req as any).user = decoded;

      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};
