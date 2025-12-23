const express = require("express");
const router = express.Router();
const pool = require("../db");

// registrar venda
router.post("/", async (req, res) => {
  const {
    cidade,
    modelo,
    cor,
    chassi,
    cliente_nome,
    valor_venda,
    valor_gasolina,
    brinde,
    pagamento
  } = req.body;

  try {
    await pool.query(
      `INSERT INTO vendas
      (cidade, modelo, cor, chassi, cliente_nome, valor_venda, valor_gasolina, brinde, pagamento, data_saida)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,NOW())`,
      [
        cidade,
        modelo,
        cor,
        chassi,
        cliente_nome,
        valor_venda,
        valor_gasolina,
        brinde,
        pagamento
      ]
    );

    // tira a moto do estoque
    await pool.query(
      "UPDATE motos SET status = 'VENDIDA' WHERE chassi = $1",
      [chassi]
    );

    res.json({ status: "Venda registrada com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
