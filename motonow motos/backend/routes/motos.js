const express = require("express");
const router = express.Router();
const conectar = require("../db");

router.get("/", async (req, res) => {
  try {
    const conn = await conectar();
    const result = await conn.execute(
      `SELECT id, loja, modelo, cor, chassi, santander, status
       FROM motos
       ORDER BY loja, modelo`
    );
    await conn.close();

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
