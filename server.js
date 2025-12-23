const express = require("express");
const cors = require("cors");

const motosRoutes = require("./routes/motos");
const vendasRoutes = require("./routes/vendas");
const transferenciasRoutes = require("./routes/transferencias");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "MotoNow backend online 🚀" });
});

app.use("/motos", motosRoutes);
app.use("/vendas", vendasRoutes);
app.use("/transferencias", transferenciasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Backend rodando na porta", PORT);
});
