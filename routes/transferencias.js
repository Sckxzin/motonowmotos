const express = require("express");
const router = express.Router();
const pool = require("../db");

// solicitar
router.post("/solicitar", async (req, res) => {
  const { chassi, cidade_origem, cidade_destino } = req.body;

  try {
    await pool.query(
      `
      INSERT INTO transferencias (chassi, cidade_origem, cidade_destino)
      VALUES ($1,$2,$3)
      `,
      [chassi, cidade_origem, cidade_destino]
    );

    await pool.query(
      "UPDATE motos SET status = 'TRANSFERENCIA' WHERE chassi = $1",
      [chassi]
    );

    res.json({ message: "Transferência solicitada" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// aprovar (diretoria)
router.post("/aprovar", async (req, res) => {
  const { chassi, cidade_destino } = req.body;

  try {
    await pool.query(
      "UPDATE transferencias SET status = 'APROVADA' WHERE chassi = $1",
      [chassi]
    );

    await pool.query(
      "UPDATE motos SET cidade = $1, status = 'ESTOQUE' WHERE chassi = $2",
      [cidade_destino, chassi]
    );

    res.json({ message: "Transferência aprovada" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});
// listar transferencias pendentes (diretoria)
router.get("/pendentes", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM transferencias WHERE status = 'PENDENTE' ORDER BY data_solicitacao"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});


module.exports = router;
