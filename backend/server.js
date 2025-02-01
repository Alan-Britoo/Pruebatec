import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

import localitation from "./routes/localitation.js";
import historialRoutes from "./routes/historialRoutes.js";
import { pool } from "./db.js";
import morgan from "morgan";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/* app.get("/api/historial/ver_historial", async (req, res) => {
  try {
    const historial = await obtenerHistorialDesdeBD();
    res.json({ historial });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el historial" });
  }
}); */

// Rutas
app.use("/api/auth", authRoutes);

app.use("/api/localitation", localitation);
app.use("/api/historial", historialRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
