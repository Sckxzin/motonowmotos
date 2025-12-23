const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", async (req, res) => {
  const { usuario, cliente_nome, forma_pagamento, total } = req.body;

  try {
    await db.query(
      `INSERT INTO vendas (usuario, cliente_nome, forma_pagamento, total)
       VALUES ($1, $2, $3, $4)`,
      [usuario, cliente_nome, forma_pagamento, total]
    );

    res.json({ message: "Venda registrada com sucesso" });

  } catch (err) {
    res.status(500).json({ erro: "Erro ao registrar venda" });
  }
});

module.exports = router;
