require("dotenv").config();
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
  res.json({ status: "MotoNow backend online 🚀" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Backend rodando na porta", PORT);
});
