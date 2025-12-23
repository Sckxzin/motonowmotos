const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM motos");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao listar motos" });
  }
});

module.exports = router;
