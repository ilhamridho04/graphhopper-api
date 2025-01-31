require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const GH_API_URL = process.env.GH_API_URL || "http://localhost:8989";

app.use(cors());
app.use(express.json());

// Endpoint untuk mendapatkan rute
app.get("/route", async (req, res) => {
    const { from, to } = req.query;

    if (!from || !to) {
        return res.status(400).json({ error: "Parameter 'from' dan 'to' diperlukan." });
    }

    try {
        const response = await axios.get(`${GH_API_URL}/route`, {
            params: {
                point: from,
                point: to,
                profile: "car", // Bisa diganti "bike", "foot", dll.
                locale: "id",
                calc_points: true,
                points_encoded: false
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Gagal mendapatkan rute.", details: error.message });
    }
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
