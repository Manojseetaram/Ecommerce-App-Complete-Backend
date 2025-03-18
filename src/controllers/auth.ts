import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secret";

import { hashSync , compareSync } from "bcrypt";
import { BadRequestsException } from "../exeptions/bad-request";
import { ErrorCode } from "../exeptions/root";
import { UnprocesssalbeEntity } from "../exeptions/validation";
import { signUpSchema } from "../schema/users";
import { prismaClient } from "../server";
import { NotFoundException } from "../exeptions/not-found";



export const signup = async (req: Request, res: Response , next :NextFunction) => {

  signUpSchema.parse(req.body)
  const {name , email , password } = req.body;
  let user = await prismaClient.user.findFirst ({where: {email}})
  if (user){
   next (new BadRequestsException ("User allready exisyts", ErrorCode.USEREXISTS))

  }
user = await prismaClient.user.create({
    data:{
      name,
      email,
      password : hashSync(password , 10)
    }
  })
  res.json(user)

};

export const signin = async (req: Request , res : Response) =>{
    const {email , password} = req.body;
    let user = await prismaClient.user.findFirst({where :{email}})
    if(!user){
        throw new  NotFoundException("user Not found" ,ErrorCode.USERNOTFOUND)
    }
    if(!compareSync(password  , user.password)){
        throw new BadRequestsException("Invalid Psssworrd" , ErrorCode.INVALIDPASSWORD)
    }
    const token =  jwt.sign({id:user.id},JWT_SECRET)
    res.json({user,token})

}

export const me = (req : Request , res : Response ) =>{
  res.json({user : (req as any ) .user})
}