// import { Request, Response, NextFunction } from "express";
// import { unAuthorizedException } from "../exeptions/unauthorizes";
// import { ErrorCode } from "../exeptions/root";
// import { JWT_SECRET } from "../secret";
// import { prismaClient } from "../server";
// import * as jwt from "jsonwebtoken";

// const Authmiddelware = async (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return next(new unAuthorizedException("No token Provided", ErrorCode.Unauthorizes));
//   }

//   try {
//     const payload = jwt.verify(token, JWT_SECRET) as any;
//     const user = await prismaClient.user.findFirst({ where: { id: payload.userId } });

//     if (!user) {
//       return next(new unAuthorizedException("Invalid token", ErrorCode.Unauthorizes));
//     }

//     (req as any).user = user;
//     next();
//   } catch (error) {
//     next(new unAuthorizedException("Invalid token", ErrorCode.Unauthorizes));
//   }
// };

// export { Authmiddelware };
import { Request, Response, NextFunction } from "express";
import { unAuthorizedException } from "../exeptions/unauthorizes";
import { ErrorCode } from "../exeptions/root";
import { JWT_SECRET } from "../secret";
import { prismaClient } from "../server";
import * as jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: { role: string };
}

const Authmiddelware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return next(new unAuthorizedException("No token Provided", ErrorCode.Unauthorizes));
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    const user = await prismaClient.user.findFirst({ where: { id: payload.userId } });

    if (!user) {
      return next(new unAuthorizedException("Invalid token", ErrorCode.Unauthorizes));
    }

    req.user = user; // ✅ Corrected Type
    next();
  } catch (error) {
    next(new unAuthorizedException("Invalid token", ErrorCode.Unauthorizes));
  }
};

export { Authmiddelware };
