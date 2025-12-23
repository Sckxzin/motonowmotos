const express = require("express");
const router = express.Router();
const pool = require("../db");

// listar motos em estoque
router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM motos WHERE status = 'ESTOQUE' ORDER BY cidade, modelo"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
