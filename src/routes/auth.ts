import { Router } from "express";
import {signup} from "../controllers/auth"
import {signin} from "../controllers/auth"
const authRoutes : Router = Router();

authRoutes.post("/signup", signup)
authRoutes.post("/signin", signin)

export default authRoutes;