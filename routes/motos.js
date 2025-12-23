const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        cidade,
        modelo,
        cor,
        chassi,
        santander,
        data_entrada
      FROM motos
      WHERE status = 'ESTOQUE'
      ORDER BY cidade, modelo
    `);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar motos" });
  }
});

module.exports = router;
