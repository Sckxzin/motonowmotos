const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", async (req, res) => {
  const { usuario, senha } = req.body;

  try {
    const result = await db.query(
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
    res.status(500).json({ erro: "Erro no login" });
  }
});

module.exports = router;
