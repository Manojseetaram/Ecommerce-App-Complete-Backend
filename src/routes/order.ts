import { createOrder } from "../controllers/order";
import { errorHandler } from "../error";
import { Router } from "express";

const orderRouter :Router = Router ();

orderRouter.post("/",errorHandler(createOrder))


export default orderRouter