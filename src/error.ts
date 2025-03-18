
//Mastering genaral erro handling

import {Request , Response, NextFunction } from "express"
import { ErrorCode, HttpException } from "./exeptions/root"
import { InternalException } from "./exeptions/internal-exception"

export const errorHandler = (method : Function) =>{
    return  async (req : Request , res : Response , next : NextFunction)=>{
        try {
await   method (req,res, next)
        }catch(error : any){
       let exception  : HttpException ;
       if(error instanceof HttpException){
           exception = error
       }else{
exception = new InternalException ("Something went wrong " ,error ,ErrorCode.InterNal_Exception)
       }
       next(exception)
        }
    }
}