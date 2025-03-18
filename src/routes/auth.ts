import { Router } from "express";
import {signup , me} from "../controllers/auth"
import {signin} from "../controllers/auth"
import { errorHandler } from "../error";
import { Authmiddelware } from "../middleware/auth";

const authRoutes : Router = Router();

authRoutes.post("/signup",errorHandler (signup))
authRoutes.post("/signin",errorHandler (signin))
authRoutes.get("/me",[Authmiddelware],errorHandler(me))

export default authRoutes;