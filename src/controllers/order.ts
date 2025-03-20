
import { Request , Response } from "express"
import { prismaClient } from "../server";
import {User} from "@prisma/client"
import { NotFoundException } from "../exeptions/not-found";
import { ErrorCode } from "../exeptions/root";
import { skip } from "../../node_modules/@prisma/client/runtime/library";
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
return await prismaClient.$transaction(async(tx: {
   
    orderEvent: any;
    order: any;
    address: any; cartItem: {
        deleteMany(arg0: { where: { userId: any; }; }): unknown; findMany: (arg0: { where: { userId: any; }; include: { product: boolean; }; }) => any; 
}; 
} )=>{
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
         id : req.user?.defaultShippingAddress

        }
    })
    const order = await tx.order.create({
        data : {
            userId : req.user?.id,
            netAmount : price,
            address :address.formattedAddress,
            products :{
                  create : cartItem.map((cart: { productId: any; quantity: any; })=>{
                      return{ productId : cart.productId,
                          quantity :cart.quantity
                      }
                  })
            }


        }
  
    })
    const orderEvent = await tx.orderEvent.create({
        data :{
            orderId : order.id
        }
    })
    await  tx.cartItem.deleteMany({
        where :{
            userId : req.user?.id
        }
    })
    return res.json({order})
})

}
export const cancleOrder = async(req : Request , res : Response) =>{

    try {
        const order =await prismaClient.order.update({
            where :{
                id : +req.params.id
            },
            data :{
                status : 'CANCELLED'
            }
        })
await prismaClient.orderEvent.create({
    data :{
        orderId : order.id,
        status : 'CANCELLED'
    }
})

res.json(order)
      } catch (error) {
        throw new NotFoundException("Order not found", ErrorCode.OREDRNOTFOUND);
      }


}
export const listOrder = async (req :AuthenticatedRequest , res : Response) =>{
  const orders = await prismaClient.order.findMany({
       where :{
        userId : req.user?.id
       }
  })
  res.json(orders)
}

export const getOrderById = async (req: Request, res: Response) => {
    try {
      const order = await prismaClient.order.findFirstOrThrow({
        where: {
          id: +req.params.id,
        },
        include: {
          orderProducts: true,
          orderEvents: true,
        },
      });
  
      res.json(order); 
    } catch (error) {
      throw new NotFoundException("Order not found", ErrorCode.OREDRNOTFOUND);
    }
  };
  

  export const listaAllOrders = async (req : Request , res : Response) =>{
    let whereClause = {}
    const status = req.query.status
    if( status) {
        whereClause ={
              status
        }
    }
    const orders = await prismaClient.order.findMany({
        where : whereClause,
        skip : Number(req.query.skip) || 0,
        take : 5
    })
    res.json(orders)
  }
  export const changeStatus = async (req : Request , res : Response)=>{
       try {
         const order = await prismaClient.order.update({
            where :{
                id : +req.params.id
            },
            data :{
                status : req.body.status
            }
         })
         await prismaClient.orderEvent.create({
            data :{
                orderId : order.id,
                status : req.body.status
            }
         })
         res.json(order)
       }catch(error){
        throw new NotFoundException("Order Not Found" , ErrorCode.OREDRNOTFOUND)
       }


  }
  export const listUserOrders = async(req :Request , res : Response) =>{
       let whereClause : any={
        userId : +req.params.id
       }
        const status = req.params.status
        if(status){
            whereClause={
                ...whereClause,
                status
            }
        }
        const orders = await prismaClient.order.findMany({
            where : whereClause,
            skip : Number (req.query.skip) || 0,
            take : 5
        })
          res.json({orders})
  }