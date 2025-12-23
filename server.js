const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

// conexão Postgres via Railway
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.get("/", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "Backend MotoNow OK + Postgres conectado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao conectar no banco" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("🚀 Backend rodando na porta", PORT);
});
