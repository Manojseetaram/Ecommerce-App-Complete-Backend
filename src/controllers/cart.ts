import { Request, Response } from "express";
import { ChangeQuntitySchema, CreateCartSchema } from "../schema/cart";
import { BadRequestsException } from "../exeptions/bad-request";
import { ErrorCode } from "../exeptions/root";
import { prismaClient } from "../server";
import { Product, User } from "@prisma/client";

// Extend Request type to include user
interface AuthenticatedRequest extends Request {
  user?: User;
}

export const AddItemCart = async (req: AuthenticatedRequest, res: Response) => {
  const validateData = CreateCartSchema.parse(req.body);

  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  let product: Product;
  try {
    product = await prismaClient.product.findFirstOrThrow({
      where: {
        id: validateData.productId,
      },
    });
  } catch (error) {
    throw new BadRequestsException("Product is not found", ErrorCode.PRODUCTNOTFOUND);
  }

  const cart = await prismaClient.cartItem.create({
    data: {
      userId: req.user.id,
      productId: product.id,
      quntity: validateData.quntity,
    },
  });

  res.json(cart);
};


export const DeleteItemCart = async(req : Request , res : Response) =>{
   await prismaClient.cartItem.delete({
      where :{
         id : +req.params.id
      }
   })
   res.json({success : true})
}
export const changeQuantity = async (req : Request , res : Response) =>{
     const validateData = ChangeQuntitySchema.parse(req.body);
     const updateData = await prismaClient.cartItem.update({
        where : {
            id  : +req.params.id
        },
        data : {
            quntity : validateData.  quntity

        }
     })
     res.json(updateData)
}
export const getCart = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
  
    const cart = await prismaClient.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });
  
    res.json(cart);
  }
  



