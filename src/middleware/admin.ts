import { Request, Response, NextFunction } from "express";
import { unAuthorizedException } from "../exeptions/unauthorizes";
import { ErrorCode } from "../exeptions/root";

interface AuthenticatedRequest extends Request {
  user?: { role: string };
}

const AdminMiddeleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  console.log("User in Admin Middleware:", req.user);
  if (req.user && req.user.role === "ADMIN") {
    next();
  } else {
    next(new unAuthorizedException("UnAuthorization", ErrorCode.Unauthorizes));
  }
};

export default AdminMiddeleware;
