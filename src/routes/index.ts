import { Router } from "express";
import authRoutes from "./auth";
import productsRoutes from "./products"; // Import product routes
import userRouter from "./users"
import cartRouter from "./cart"
import orderRouter from "./order";
const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/products", productsRoutes); // Corrected the route registration
rootRouter.use("/userRouter", userRouter);
rootRouter.use("/cartRouter",cartRouter );
rootRouter.use("/orderRouter",orderRouter)
export default rootRouter;
