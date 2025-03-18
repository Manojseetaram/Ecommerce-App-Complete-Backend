import { addAddres, deleteAddres, listAddres } from "../controllers/users";
import { errorHandler } from "../error";
import { Router } from "express";
const userRouter = Router()
userRouter.post("/adress",errorHandler(addAddres))
userRouter.delete("/adress : id",errorHandler(deleteAddres))

userRouter.get("/adress" , errorHandler(listAddres))


export default userRouter;