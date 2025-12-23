const express = require("express");
const cors = require("cors");

const loginRoutes = require("./routes/login");
const motosRoutes = require("./routes/motos");
const vendasRoutes = require("./routes/vendas");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/login", loginRoutes);
app.use("/motos", motosRoutes);
app.use("/vendas", vendasRoutes);

app.get("/", (req, res) => {
  res.json({ status: "Backend MotoNow OK + Postgres conectado" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("🚀 Backend rodando na porta", PORT);
});
