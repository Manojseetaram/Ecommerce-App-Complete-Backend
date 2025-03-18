import { errorHandler } from "../error";
import { Authmiddelware } from "../middleware/auth";

import {createProduct, deleteProduct, getProductById, listProducts, updateProduct} from "../controllers/product";
import { Router } from "express";
import AdminMiddeleware from "../middleware/admin";

const productsRoutes: Router = Router()

productsRoutes.post("/", [Authmiddelware, AdminMiddeleware], errorHandler(createProduct));


productsRoutes.put("/:id",[Authmiddelware , AdminMiddeleware],errorHandler(updateProduct) )
productsRoutes.delete("/:id",[Authmiddelware , AdminMiddeleware],errorHandler(deleteProduct) )
productsRoutes.get("/",[Authmiddelware , AdminMiddeleware],errorHandler(listProducts) )
productsRoutes.get("/:id",[Authmiddelware , AdminMiddeleware],errorHandler(getProductById) )




export default productsRoutes;

