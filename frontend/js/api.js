const API_URL = "https://motonowmotos-production.up.railway.app";

async function login(usuario, senha) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario, senha })
  });
  return res.json();
}

async function listarMotos() {
  const res = await fetch(`${API_URL}/motos`);
  return res.json();
}
