import { Request, Response } from "express";
import { AddressSchema, UpdateUserSchema } from "../schema/users";
import { prismaClient } from "../server";
import { NotFoundException } from "../exeptions/not-found";
import { ErrorCode } from "../exeptions/root";
import { User, Address } from "@prisma/client";
import { BadRequestsException } from "../exeptions/bad-request";

// Ensure proper AuthenticatedRequest interface
interface AuthenticatedRequest extends Request {
  user?: User;
}

export const addAddress = async (req: Request, res: Response) => {
  AddressSchema.parse(req.body);

  let user: User;
  try {
    user = await prismaClient.user.findFirstOrThrow({
      where: { id: req.body.userId },
    });
  } catch (error) {
    throw new NotFoundException("User not found", ErrorCode.USERNOTFOUND);
  }

  const address = await prismaClient.address.create({
    data: { ...req.body, userId: user.id },
  });

  res.json(address);
};

export const deleteAddress = async (req: Request, res: Response) => {
  try {
    await prismaClient.address.delete({
      where: { id: +req.params.id },
    });
    res.json({ success: true });
  } catch (error) {
    throw new NotFoundException("Address not found", ErrorCode.Adress_Not_Found);
  }
};

export const listAddress = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    const addresses = await prismaClient.address.findMany({
      where: { userId: req.user.id },
    });

    res.json(addresses);
  } catch (error) {
    throw new NotFoundException("Address not found", ErrorCode.Adress_Not_Found);
  }
};

export const updateUser = async (req: AuthenticatedRequest, res: Response) => {
  // Ensure missing fields are set to null
  const body = {
    name: req.body.name,
    defaultShippingAddress: req.body.defaultShippingAddress ?? null, 
    defaultBillingAddress: req.body.defaultBillingAddress ?? null, 
  };

  // Validate with Zod
  const validateData = UpdateUserSchema.parse(body);
  
  let shippingAddress: Address;
  let billingAddress: Address;

  if (validateData.defaultShippingAddress !== null) {
    try {
      shippingAddress = await prismaClient.address.findFirstOrThrow({
        where: { id: Number(validateData.defaultShippingAddress) },
      });
    } catch (error) {
      throw new NotFoundException("Shipping Address Not Found", ErrorCode.Adress_Not_Found);
    }
    if (shippingAddress.userId !== req.user?.id) {
      throw new BadRequestsException("Shipping Address does not belong to the user", ErrorCode.Adrss_Does_Not_Belog_To_User);
    }
  }

  if (validateData.defaultBillingAddress !== null) {
    try {
      billingAddress = await prismaClient.address.findFirstOrThrow({
        where: { id: Number(validateData.defaultBillingAddress) },
      });
    } catch (error) {
      throw new NotFoundException("Billing Address Not Found", ErrorCode.Adress_Not_Found);
    }
    if (billingAddress.userId !== req.user?.id) {
      throw new BadRequestsException("Billing Address does not belong to the user", ErrorCode.Adrss_Does_Not_Belog_To_User);
    }
  }

  const updatedUser = await prismaClient.user.update({
    where: { id: req.user?.id },
    data: {
      ...validateData,
      defaultShippingAddress: validateData.defaultShippingAddress !== null ? Number(validateData.defaultShippingAddress) : null,
      defaultBillingAddress: validateData.defaultBillingAddress !== null ? Number(validateData.defaultBillingAddress) : null,
    },
  });

  res.json(updatedUser);
};




export const listUsers = async (req : Request , res : Response) =>{
  const users = await prismaClient.user.findMany({
    skip : Number(req.query.skip) || 0,
    take : 5
  })
  res.json(users)
}
export const getUserById = async(req : Request , res : Response)=>{
try{
   const user = await prismaClient.user.findFirstOrThrow({
    where :{
       id : +req.params.id
    },
    include :{
      addresses : true
    }
    
   })
   res.json(user)
}catch(error){
  throw new NotFoundException("User not found",ErrorCode.USERNOTFOUND)
}
}
export const changeUserRole = async(req : Request , res : Response) =>{
     
try{
    const user = await prismaClient.user.update({
      where :{
        id :+req.params.id
      },
      data :{
        role : req.body.role
      }
    })
}catch(error){
  throw new NotFoundException("User Not Found" ,ErrorCode.USERNOTFOUND)
}

  
}