import express ,{Express , Request, Response} from "express";
import dortenv from "dotenv"
import rootRouter from "./routes/auth"
import { errorMiddleware } from "./middleware/error";
import { PrismaClient } from "@prisma/client";

dortenv.config();
const app : Express = express();
app.use(express.json());
const PORT =process.env.PORT
app.use('/api',rootRouter)
export const prismaClient = new PrismaClient({
  log :["query"]
});
app.use(errorMiddleware)

app.listen(PORT,()=>{
  console.log(`Server is running on Port ${PORT}`)
})