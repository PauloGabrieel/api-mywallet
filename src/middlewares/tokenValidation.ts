import { Request, Response, NextFunction } from "express";
import prisma from "../dbStrategy/postgres";
import * as jwt from "jsonwebtoken";

export default async function tokenValidation(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const {authorization} = req.headers;
  const token = authorization?.replace("Bearer ", "");
  
  if(!token) return res.status(403).send("You must be signed in to continue");
  
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

    const session = await prisma.session.findFirst({
      where: {
       token,
      }
    });

    if(!session) return res.status(403).send("You must be signed in to continue");
    req.userId = userId
    return next();
  } catch (error) {
    return res.status(403).send("You must be signed in to continue");
  }
};



export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
    userId: number;
  };