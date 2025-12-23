const express = require("express");
const router = express.Router();
const pool = require("../db");

// registrar venda
router.post("/", async (req, res) => {
  const {
    moto_id,
    cliente_nome,
    valor,
    brinde,
    gasolina,
    pagamento
  } = req.body;

  try {
    // grava venda
    await pool.query(
      `INSERT INTO vendas 
      (moto_id, cliente_nome, valor, brinde, gasolina, pagamento, data_venda)
      VALUES ($1,$2,$3,$4,$5,$6,NOW())`,
      [moto_id, cliente_nome, valor, brinde, gasolina, pagamento]
    );

    // atualiza status da moto
    await pool.query(
      "UPDATE motos SET status = 'VENDIDA' WHERE id = $1",
      [moto_id]
    );

    res.json({ status: "Venda registrada com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
