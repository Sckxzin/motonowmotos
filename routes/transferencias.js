const express = require("express");
const router = express.Router();
const pool = require("../db");

// listar transferências pendentes (diretoria)
router.get("/pendentes", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM transferencias WHERE status = 'PENDENTE' ORDER BY data_solicitacao"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// APROVAR transferência
router.post("/aprovar/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // 1. buscar transferência
    const transf = await pool.query(
      "SELECT * FROM transferencias WHERE id = $1",
      [id]
    );

    if (transf.rowCount === 0) {
      return res.status(404).json({ erro: "Transferência não encontrada" });
    }

    const { chassi, destino } = transf.rows[0];

    // 2. atualizar cidade da moto
    await pool.query(
      "UPDATE motos SET cidade = $1 WHERE chassi = $2",
      [destino, chassi]
    );

    // 3. marcar transferência como aprovada
    await pool.query(
      `UPDATE transferencias
       SET status = 'APROVADA',
           data_aprovacao = NOW()
       WHERE id = $1`,
      [id]
    );

    res.json({ status: "Transferência aprovada com sucesso" });

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
