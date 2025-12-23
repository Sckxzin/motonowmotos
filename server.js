const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT 1 AS ok");
    res.json({
      status: "Backend MotoNow OK",
      db: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao conectar no banco" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("🚀 Backend rodando na porta", PORT);
});
