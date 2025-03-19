import { NextFunction, Request, Response } from "express";
import { unAuthorizedException } from "../exeptions/unauthorizes";
import { ErrorCode } from "../exeptions/root";
import {  User } from "@prisma/client"; // Fixed spelling
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { prismaClient } from "../server";

dotenv.config();

interface AuthenticatedRequest extends Request {
  user?: User;
}

const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // 1. Extract the token from header
  const token = req.headers.authorization;

  // 2. If token is not present, throw an error of unauthorized
  if (!token) {
    return next(new unAuthorizedException("Unauthorized", ErrorCode.Unauthorizes));
  }

  try {
    // 3. Get secret key properly
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      return next(new unAuthorizedException("JWT Secret is missing", ErrorCode.Unauthorizes));
    }

    // 4. Verify token and extract payload
    const payload = jwt.verify(token, JWT_SECRET) as any;

    // 5. Get user from the payload
    const user = await prismaClient.user.findFirst({ where: { id: payload.userId } });
    if (!user) {
      return next(new unAuthorizedException("Unauthorized", ErrorCode.Unauthorizes));
    }

    // 6. Attach the user to the request object
    req.user = user;
    next();
  } catch (error) {
    return next(new unAuthorizedException("Invalid Token", ErrorCode.Unauthorizes));
  }
};

export default authMiddleware;
