import {  addAddress, deleteAddress, listAddress, updateUser } from "../controllers/users";
import { errorHandler } from "../error";
import { Router } from "express";
const userRouter = Router()
userRouter.post("/adress",errorHandler(addAddress))
userRouter.delete("/adress : id",errorHandler(deleteAddress))

userRouter.get("/adress" , errorHandler(listAddress));
userRouter.put("/",errorHandler(updateUser));


export default userRouter;