const express = require("express");
const router = express.Router();

const usuarios = [
  { usuario: "escada", senha: "123", perfil: "LOJA" },
  { usuario: "ipojuca", senha: "123", perfil: "LOJA" },
  { usuario: "saojose", senha: "123", perfil: "LOJA" },
  { usuario: "xexeu", senha: "123", perfil: "LOJA" },
  { usuario: "catende", senha: "123", perfil: "LOJA" },
  { usuario: "diretoria", senha: "123", perfil: "DIRETORIA" }
];

router.post("/", (req, res) => {
  const { usuario, senha } = req.body;

  const user = usuarios.find(
    u => u.usuario === usuario && u.senha === senha
  );

  if (!user) {
    return res.status(401).json({ erro: "Login inválido" });
  }

  res.json({
    usuario: user.usuario,
    perfil: user.perfil
  });
});

module.exports = router;
