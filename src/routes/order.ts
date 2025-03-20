import { cancleOrder, changeStatus, createOrder, getOrderById, listOrder, listUserOrders } from "../controllers/order";
import { errorHandler } from "../error";
import e, { Router } from "express";

const orderRouter :Router = Router ();

orderRouter.post("/",errorHandler(createOrder))

orderRouter.put("/:id/cancle",errorHandler(cancleOrder))
orderRouter.get("/",errorHandler(listOrder))
orderRouter.get("/all",errorHandler(listUserOrders))
orderRouter.put("/",errorHandler(changeStatus))
orderRouter.get("/",errorHandler(listUserOrders))
orderRouter.get("/:id",errorHandler(getOrderById))

export default orderRouter