import { Router } from "express";
import {signup , me} from "../controllers/auth"
import {signin} from "../controllers/auth"
import { errorHandler } from "../error";
import authMiddleware from "../middleware/auth";

const authRoutes : Router = Router();

authRoutes.post("/signup",[authMiddleware],errorHandler (signup))
authRoutes.post("/signin",[authMiddleware],errorHandler (signin))
authRoutes.get("/me",[authMiddleware],errorHandler(me))

export default authRoutes;