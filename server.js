require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

/* ================= TESTE DE BANCO ================= */
db.query("select 1")
  .then(() => console.log("✅ Postgres conectado com sucesso"))
  .catch(err => console.error("❌ Erro ao conectar no Postgres:", err));

/* ================= ROTAS ================= */
app.get("/", (req, res) => {
  res.json({ status: "Backend MotoNow OK 🚀" });
});

/* ================= START ================= */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("🚀 Backend rodando na porta", PORT);
});
