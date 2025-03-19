
import { Request , Response } from "express"
import { prismaClient } from "../server";
import {User} from "@prisma/client"
interface AuthenticatedRequest extends Request {
    user? : User
}
export const createOrder = async(req : AuthenticatedRequest , res : Response) =>{
// To create a transaction 
//List of Orders
//Calculate the Total AMOUNT 
//Fetch adress of Users
//to define computed fields for foramatted adress on adress model 
// we will created a order Model
// Create Event//o emty the cart
return await prismaClient.$transaction(async(tx: { cartItem: { findMany: (arg0: { where: { userId: any; }; include: { product: boolean; }; }) => any; }; } )=>{
    const cartItem = await tx.cartItem.findMany({
        where :{
          userId : req.user?.id
        },
        include : {
            product :true
        }
    })
    if(cartItem.length == 0){
        return res.json({message : "Cart id empty"})
    }
    const price = cartItem.reduce((prev: number , current: { quantity: number; product: { price: string | number; }; })=>{
        return  prev + (current.quantity * +current.product.price)
    },0)

    const address = await tx.address.findMany({
        where :{
         id : req.user.defaultShippingAddress

        }
    })
    const order = await tx.order.create({
        data : {
            userId : req.user.id,
            netAmount : price,
            address :address.formattedAddress,
            products :{
                  create : cartItem.map((cart)=>{
                      return{ productId : cart.productId,
                          quantity :cart.quantity
                      }
                  })
            }

        }
    })
})

}
export const cancleOrder = async(req : Request , res : Response) =>{

}
export const listOrder = async (req : Request , res : Response) =>{

}
export const getOrderById = async  (req : Request , res : Response) =>{

}