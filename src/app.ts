import express from "express";
import cors from "cors";
import measureRoutes from "./routes/MeasureRoutes"

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("", measureRoutes);

export default app;
