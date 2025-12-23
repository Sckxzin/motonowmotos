const express = require("express");
const router = express.Router();
const conectar = require("../db");

router.post("/", async (req, res) => {
  const { usuario, senha } = req.body;

  try {
    const conn = await conectar();
    const result = await conn.execute(
      `SELECT usuario, loja 
       FROM usuarios 
       WHERE usuario = :usuario AND senha = :senha`,
      { usuario, senha }
    );
    await conn.close();

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Login inválido" });
    }

    res.json({
      message: "login ok",
      usuario: result.rows[0].USUARIO,
      loja: result.rows[0].LOJA
    });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
