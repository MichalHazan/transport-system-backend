import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db";

import authRoutes from "./routes/auth.routes";
import clientRoutes from "./routes/client.routes";
import supplierRoutes from "./routes/supplier.routes";
import adminRoutes from "./routes/admin.routes";
import userRoutes from "./routes/user.routes";
import QuoteRoutes from "./routes/quote.routes";

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// ראוטים
app.use("/api/auth", authRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/quotes", QuoteRoutes)

app.listen(process.env.PORT, () => {
  console.log("Server running on port:", process.env.PORT);
});
