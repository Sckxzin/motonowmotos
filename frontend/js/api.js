const API_URL = "https://motonowmotos-production-4e1a.up.railway.app";

async function carregarMotos() {
  const res = await fetch(`${API_URL}/motos`);
  const motos = await res.json();

  const tbody = document.getElementById("lista-motos");
  tbody.innerHTML = "";

  motos.forEach(moto => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${moto.cidade}</td>
      <td>${moto.modelo}</td>
      <td>${moto.cor || ""}</td>
      <td>${moto.chassi}</td>
      <td>${moto.santander}</td>
      <td>
        <button disabled>Vender</button>
        <button disabled>Transferir</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

carregarMotos();


