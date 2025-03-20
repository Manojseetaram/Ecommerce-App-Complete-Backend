import {  addAddress, changeUserRole, deleteAddress, getUserById, listAddress, listUsers, updateUser } from "../controllers/users";
import { errorHandler } from "../error";
import { Router } from "express";
const userRouter = Router()
userRouter.post("/adress",errorHandler(addAddress))
userRouter.delete("/adress : id",errorHandler(deleteAddress))

userRouter.get("/adress" , errorHandler(listAddress));
userRouter.put("/",errorHandler(updateUser));
userRouter.put("/role" , errorHandler(changeUserRole));

userRouter.get("/",errorHandler(listUsers))
userRouter.get("/:id" , errorHandler(getUserById));
export default userRouter;