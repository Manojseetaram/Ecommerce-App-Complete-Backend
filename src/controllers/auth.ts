import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secret";

import { hashSync , compareSync } from "bcrypt";
import { BadRequestsException } from "../exeptions/bad-request";
import { ErrorCode } from "../exeptions/root";


const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  let user = await prisma.user.findFirst({ where: { email } });
  if (user) {
   throw new BadRequestsException("User A;ready exista ", ErrorCode.USEREXISTS)
  }
  user = await prisma.user.create({
    data: {
      email,
      name,
      passwoed: hashSync(password, 10),
    },
  });
  

  res.json(user);
};
export const signin = async (req: Request , res : Response) =>{
    const {email , password} = req.body;
    let user = await prisma.user.findFirst({where :{email}})
    if(!user){
        throw new Error("User Does not Exists")
    }
    if(!compareSync(password  , user.passwoed)){
        throw  Error("Password is Incoorect !")
    }
    const token =  jwt.sign({id:user.id},JWT_SECRET)
    res.json({user,token})

}