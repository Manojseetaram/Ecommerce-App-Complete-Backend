
import { PrismaClient } from "@prisma/client"
import { Request , Response } from "express";
import { prismaClient } from "../server";
import { NotFoundException } from "../exeptions/not-found";
import { ErrorCode } from "../exeptions/root";

export const createProduct = async (req : Request , res : Response) =>{
    const product =await prismaClient.product.create({
        data : {
            ...req.body,
            tags : req.body.tags.join(',')
        }
    })
    res.json(product)
}
export const updateProduct = async (req : Request, res : Response) =>{

    try{
  const product = req.body;
  if(product.tags){
    product.tags = product.tags.join(',')
  }
  const updateProduct = await prismaClient.product.update({
    where : {
        id : +req.params.id
    },
    data: product
  })
  res.json(updateProduct)
    }catch (err){
    throw new NotFoundException ("Productnot found", ErrorCode.Productnot)
    }
}
export  const deleteProduct = (req : Request , res : Response) =>{

}
export const listProducts = async(req : Request , res : Response)=>{
  const count = await prismaClient.product.count();
  const products = await prismaClient.product.findMany({
    skip : Number(req.query.skip) || 0,
    take : 5
  })
  res.json({
    count, data:products
  })
}
export const getProductById = async( req : Request , res : Response) =>{
 try{
   const product = await prismaClient.product.findFirstOrThrow({
          where :{
            id : +req.params.id
          }
   })
   res.json(product)
 }catch(error){
    throw new NotFoundException ("Productnot found", ErrorCode.Productnot)
 }
}