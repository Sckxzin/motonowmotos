
const API_URL = "https://motonowmotos-production-4e1a.up.railway.app";

// transferencias pendentes
async function carregarTransferencias() {
  const res = await fetch(`${API_URL}/transferencias/pendentes`);
  const dados = await res.json();

  const tbody = document.getElementById("lista-transferencias");
  tbody.innerHTML = "";

  dados.forEach(t => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${t.chassi}</td>
      <td>${t.cidade_origem}</td>
      <td>${t.cidade_destino}</td>
      <td>${t.status}</td>
    `;
    tbody.appendChild(tr);
  });
}

// vendas
async function carregarVendas() {
  const res = await fetch(`${API_URL}/vendas`);
  const dados = await res.json();

  const tbody = document.getElementById("lista-vendas");
  tbody.innerHTML = "";

  dados.forEach(v => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${v.cidade}</td>
      <td>${v.modelo}</td>
      <td>${v.chassi}</td>
      <td>${v.cliente_nome}</td>
      <td>R$ ${v.valor_venda}</td>
      <td>${v.data_saida}</td>
    `;
    tbody.appendChild(tr);
  });
}

carregarTransferencias();
carregarVendas();
