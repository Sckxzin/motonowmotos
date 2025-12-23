const API_URL = "https://motonowmotos-production-4e1a.up.railway.app";

async function entrar() {
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario, senha })
  });

  if (!res.ok) {
    document.getElementById("msg").innerText = "Login inválido";
    return;
  }

  const data = await res.json();

  localStorage.setItem("usuario", data.usuario);
  localStorage.setItem("perfil", data.perfil);

  if (data.perfil === "DIRETORIA") {
    window.location.href = "diretoria.html";
  } else {
    window.location.href = "index.html";
  }
}
