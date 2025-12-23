const express = require("express");
const router = express.Router();
const conectar = require("../db");

router.post("/", async (req, res) => {
  const { usuario, senha } = req.body;

  try {
    return res.json({ message: "login ok", usuario: "teste", loja: "teste" });

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

    // AGORA FUNCIONA
    const usuarioDB = result.rows[0].USUARIO;
    const lojaDB = result.rows[0].LOJA;

    res.json({
      message: "login ok",
      usuario: usuarioDB,
      loja: lojaDB
    });

  } catch (err) {
    console.error("ERRO LOGIN:", err);
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;

