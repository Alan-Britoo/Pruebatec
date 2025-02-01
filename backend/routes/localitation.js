import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/restaurantes_cercanos", async (req, res) => {
  try {
    const { lat, lng, radius = 10000 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ error: "Se requieren latitud y longitud" });
    }

    // Consulta Overpass Turbo para obtener restaurantes cercanos
    const overpassUrl = "https://overpass-api.de/api/interpreter";
    const query = `
            [out:json];
            node["amenity"="restaurant"](around:${radius},${lat},${lng});
            out body;
>;
            out skel qt;
        `;

    const response = await axios.post(overpassUrl, query, {
      headers: { "Content-Type": "text/plain" },
    });

    const restaurantes = response.data.elements.map((restaurante) => ({
      nombre: restaurante.tags.name || "Sin nombre",
      direccion: restaurante.tags["addr:street"] || "Dirección no disponible",
      lat: restaurante.lat,
      lon: restaurante.lon,
      tipoComida: restaurante.tags?.cuisine || "Tipo de comida no especificado",
    }));

    console.log(response.data);

    return res.status(200).json({ restaurantes });
  } catch (err) {
    console.error(
      "Error al hacer la solicitud a la API de Googleeeee:",
      err.message
    );
    res.status(500).json({ error: err.message }); // En caso de error, enviamos el mensaje
  }
});

export default router;
