import { errorHandler } from "../error";


import {createProduct, deleteProduct, getProductById, listProducts, updateProduct} from "../controllers/product";
import { Router } from "express";


const productsRoutes: Router = Router()

productsRoutes.post("/", errorHandler(createProduct));



productsRoutes.put("/:id",errorHandler(updateProduct) )
productsRoutes.delete("/:id",errorHandler(deleteProduct) )
productsRoutes.get("/",errorHandler(listProducts) )
productsRoutes.get("/:id",errorHandler(getProductById) )




export default productsRoutes;

