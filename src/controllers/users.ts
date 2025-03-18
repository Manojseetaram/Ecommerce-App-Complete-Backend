
import { Request , Response } from "express"
import { AddressSchema } from "../schema/users"
import { prismaClient } from "../server";
import { NotFoundException } from "../exeptions/not-found";
import { ErrorCode } from "../exeptions/root";
import {User} from "@prisma/client"
export const addAddres = async (req:Request , res : Response ) =>{
    AddressSchema.parse(req.body);
    res.json("Addess Added");
    let user : User;
    try{
  user = await prismaClient.user.findFirstOrThrow({
    where : {
        id: req.body.userId
    }
  })
    }catch(error){
   throw new NotFoundException("User not Found" , ErrorCode.USERNOTFOUND)
    }
const addresses = await prismaClient.addresses.create({
  data:{
    ...req.body,
    userId : req.user.id
  },
})
res.json(addresses)
}

export const deleteAddres = async (req:Request , res : Response ) =>{

}
export const listAddres = async (req:Request , res : Response ) =>{

}