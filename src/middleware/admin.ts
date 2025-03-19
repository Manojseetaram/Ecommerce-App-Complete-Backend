import { NextFunction, Request, Response } from "express";
import { unAuthorizedException } from "../exeptions/unauthorizes";
import { ErrorCode } from "../exeptions/root";
import {User} from "@prisma/client"


interface AuthenticatedRequest extends Request {
  user? : User
}
const adminMiddleware = async(req: AuthenticatedRequest, res:Response, next:NextFunction) => {
    const user = req.user
    if(user.role == 'ADMIN') {
        next()
    }
    else {
        next(new unAuthorizedException('Unauthorized', ErrorCode.Unauthorizes))
    }


}

export default adminMiddleware
