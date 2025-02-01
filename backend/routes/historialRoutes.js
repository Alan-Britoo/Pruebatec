import express from "express";
import { pool } from "../db.js"; // Asegúrate de que este es tu pool de conexión

const router = express.Router();

// Ruta para guardar en el historial de búsqueda
router.post("/guardar_historial", async (req, res) => {
  try {
    const {
      usuario_email,
      nombre_restaurante,
      tipo_comida,
      latitud,
      longitud,
    } = req.body;
    console.log(req.body);
    if (!usuario_email || !nombre_restaurante || !latitud || !longitud) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const query = `
            INSERT INTO historial_busqueda (usuario_email, nombre_restaurante, tipo_comida, latitud, longitud)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;

    const values = [
      usuario_email,
      nombre_restaurante,
      tipo_comida,
      latitud,
      longitud,
    ];

    const result = await pool.query(query, values);

    res.status(201).json({
      mensaje: "Búsqueda guardada exitosamente",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error al guardar en el historial:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Ruta para obtener el historial de búsquedas
router.get("/ver_historial", async (req, res) => {
  try {
    const user = req.query.user; // Accede al parámetro 'user' en la query string
    const query = `
        SELECT * FROM historial_busqueda WHERE usuario_email = $1
      `;

    console.log(user); // Verifica si el parámetro 'user' está llegando correctamente

    // Usar parámetros preparados para evitar inyección SQL
    const result = await pool.query(query, [user]);

    res.json({
      historial: result.rows,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el historial" });
  }
});

export default router;
