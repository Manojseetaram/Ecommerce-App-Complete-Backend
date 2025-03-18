import { Router } from "express";
import authRoutes from "./auth";
import productsRoutes from "./products"; // Import product routes
import userRouter from "./users"
const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/products", productsRoutes); // Corrected the route registration
rootRouter.use("/userRouter", userRouter);
export default rootRouter;
