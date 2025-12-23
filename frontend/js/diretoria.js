<script>
const API_URL = "https://motonowmotos-production-4e1a.up.railway.app";

async function carregarTransferencias() {
  const res = await fetch(`${API_URL}/transferencias/pendentes`);
  const dados = await res.json();

  const tbody = document.getElementById("lista-transferencias");
  tbody.innerHTML = "";

  dados.forEach(t => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${t.chassi}</td>
      <td>${t.origem}</td>
      <td>${t.destino}</td>
      <td>${t.status}</td>
      <td>
        <button onclick="aprovar(${t.id})">Aprovar</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

async function aprovar(id) {
  if (!confirm("Confirmar aprovação da transferência?")) return;

  await fetch(`${API_URL}/transferencias/aprovar/${id}`, {
    method: "POST"
  });

  alert("Transferência aprovada!");
  carregarTransferencias();
}

carregarTransferencias();
</script>
