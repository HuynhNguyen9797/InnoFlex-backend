import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import config
 from "../config";


export function requireAuthen(req: Request, res: Response, next: NextFunction ){
  console.log(req.headers);
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).json('No authorization headers.Please sign in');
  }

  const tokenBearer = req.headers.authorization.split(' ');
  if (tokenBearer.length != 2) {
    return res.status(401).send('Malformed token.Please sign in');
  }

  const token = tokenBearer[1];
  return jwt.verify(token, config.jwt_secret, (err, decoded) => {
    if (err) {
      return res.status(500).send('Failed to authenticate.');
    }
    return next();
  });
}