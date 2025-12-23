const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "Backend MotoNow OK" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("🚀 Backend rodando na porta", PORT);
});
