const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

/*
=====================================================
POSTGRES (Railway)
Railway injeta automaticamente:
process.env.DATABASE_URL
=====================================================
*/
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

/*
=====================================================
ROTA TESTE (BACKEND + BANCO)
=====================================================
*/
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      status: "Backend MotoNow OK",
      banco: "conectado",
      hora: result.rows[0]
    });
  } catch (err) {
    console.error("ERRO REAL DO BANCO:", err);
    res.status(500).json({
      erro: err.message,
      code: err.code
    });
  }
});

/*
=====================================================
LOGIN SIMPLES (EXEMPLO)
=====================================================
*/
app.post("/login", async (req, res) => {
  const { usuario, senha } = req.body;

  try {
    const result = await pool.query(
      "SELECT usuario, loja FROM usuarios WHERE usuario = $1 AND senha = $2",
      [usuario, senha]
    );

    if (result.rowCount === 0) {
      return res.status(401).json({ message: "Login inválido" });
    }

    res.json({
      message: "login ok",
      usuario: result.rows[0].usuario,
      loja: result.rows[0].loja
    });

  } catch (err) {
    console.error("ERRO LOGIN:", err);
    res.status(500).json({ erro: err.message });
  }
});

/*
=====================================================
PORTA (Railway)
=====================================================
*/
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Backend MotoNow rodando na porta", PORT);
});
