import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swaggerConfig";
import connectDB from "./config/db";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes";
import authRoutes from "./routes/authRoutes";
import morgan from "morgan";
import errorHandler from "./middlewares/errorMiddleware";

dotenv.config();

const app = express();

connectDB();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", taskRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);

export default app;
