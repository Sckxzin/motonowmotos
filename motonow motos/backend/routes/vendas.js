const express = require("express");
const router = express.Router();
const conectar = require("../db");

router.post("/", async (req, res) => {
  const {
    moto_id,
    loja,
    modelo_moto,
    cliente,
    valor,
    pagamento,
    santander,
    brinde,
    valor_gasolina
  } = req.body;

  try {
    const conn = await conectar();

    await conn.execute(
      `INSERT INTO vendas
       (moto_id, loja, modelo_moto, cliente, valor, pagamento, santander, brinde, valor_gasolina)
       VALUES
       (:moto_id, :loja, :modelo_moto, :cliente, :valor, :pagamento, :santander, :brinde, :valor_gasolina)`,
      {
        moto_id,
        loja,
        modelo_moto,
        cliente,
        valor,
        pagamento,
        santander,
        brinde,
        valor_gasolina
      },
      { autoCommit: true }
    );

    await conn.execute(
      `UPDATE motos SET status = 'vendida' WHERE id = :id`,
      { id: moto_id },
      { autoCommit: true }
    );

    await conn.close();

    res.json({ message: "Venda registrada com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
