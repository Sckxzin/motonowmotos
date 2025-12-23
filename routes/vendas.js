const express = require("express");
const router = express.Router();
const pool = require("../db"); // seu pool do pg

router.post("/", async (req, res) => {
  const {
    modelo,
    cor,
    chassi,
    cliente_nome,
    total,
    brinde,
    gasolina,
    forma_pagamento,
    como_chegou
  } = req.body;

  try {
    // 1️⃣ Registrar venda
    await pool.query(
      `
      INSERT INTO vendas
      (modelo, cor, chassi, cliente_nome, total, brinde, gasolina, forma_pagamento, como_chegou, data_venda)
      VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8,$9,NOW())
      `,
      [
        modelo,
        cor,
        chassi,
        cliente_nome,
        total,
        brinde,
        gasolina,
        forma_pagamento,
        como_chegou
      ]
    );

    // 2️⃣ Dar baixa na moto
    await pool.query(
      `
      UPDATE motos
      SET status = 'vendida'
      WHERE chassi = $1
      `,
      [chassi]
    );

    res.json({ message: "Venda registrada com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao registrar venda" });
  }
});

module.exports = router;
