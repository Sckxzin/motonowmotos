const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET /login (pra navegador não reclamar)
router.get("/", (req, res) => {
  res.json({
    status: "rota /login ativa",
    metodo: "use POST para autenticar"
  });
});

// POST /login (login real)
router.post("/", async (req, res) => {
  const { usuario, senha } = req.body;

  try {
    const result = await pool.query(
      "SELECT usuario, loja FROM usuarios WHERE usuario = $1 AND senha = $2",
      [usuario, senha]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Login inválido" });
    }

    res.json({
      message: "login ok",
      usuario: result.rows[0].usuario,
      loja: result.rows[0].loja
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no login" });
  }
});

module.exports = router;
