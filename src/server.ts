import express, { Express } from "express";
import dotenv from "dotenv";
import rootRouter from "./routes/index"; // Corrected import
import { errorMiddleware } from "./middleware/error";
import { PrismaClient, Prisma } from "@prisma/client"; // Import Prisma types
import { signUpSchema } from "./schema/users";

dotenv.config();

const app: Express = express();
app.use(express.json());

const PORT = process.env.PORT;

// Use the rootRouter which includes both auth and product routes
app.use("/api", rootRouter);

export const prismaClient = new PrismaClient({
  log: ["query"],
}).$extends({
  query: {
    user: {
      create({ args, query }: { args: Prisma.UserCreateArgs; query: (args: Prisma.UserCreateArgs) => any }) {
        const parsedData = signUpSchema.parse(args.data);
        args.data = parsedData as typeof args.data;
        return query(args);
      },
    },
  },
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
