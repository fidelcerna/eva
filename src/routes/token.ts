import { compare } from "bcrypt";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      info?: any;
    }
  }
}

export const validarToken = (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers['authorization'];
  
    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
      try {
        const bearerToken = headerToken.slice(7);
        const infoToken = jwt.verify(bearerToken, process.env.SECRET_KEY!);
        req.info = infoToken;
        next();
      } catch (error) {
        return res.status(401).json({
          msg: "Token Invalido",
        });
      }
    } else {
      return res.status(401).json({
        msg: "Token Invalido o no existe",
      });
    }
  }

