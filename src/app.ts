import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import indexRoutes from "./routes/index.routes";
import productRoutes from "./routes/products.routes";
import usersRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

import { createRoles, createAdmin } from "./libs/initialSetup";

const app = express();
createRoles();
createAdmin();

// Settings
app.set("json spaces", 4);

// Middlewares
const corsOptions = {
  // origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api", indexRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);

export default app;
