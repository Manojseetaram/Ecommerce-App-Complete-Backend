import {Router} from "express"
import { errorHandler } from "../error";
import { AddItemCart, changeQuantity, DeleteItemCart, getCart } from "../controllers/cart";
const cartRouter = Router();

cartRouter.post("/",errorHandler(AddItemCart));
cartRouter.delete("/id",errorHandler(DeleteItemCart));
cartRouter.put('/:id' , errorHandler(changeQuantity));
cartRouter.get("/", errorHandler(getCart))

export default cartRouter;