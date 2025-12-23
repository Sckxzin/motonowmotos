const API_URL = "https://motonowmotos-production-4e1a.up.railway.app";

// carregar motos
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
        <button onclick='abrirModal(${JSON.stringify(moto)})'>Vender</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

// abrir modal
function abrirModal(moto) {
  document.getElementById("vendaCidade").value = moto.cidade;
  document.getElementById("vendaModelo").value = moto.modelo;
  document.getElementById("vendaCor").value = moto.cor;
  document.getElementById("vendaChassi").value = moto.chassi;

  document.getElementById("modalVenda").style.display = "block";
}

// fechar modal
function fecharModal() {
  document.getElementById("modalVenda").style.display = "none";
}

// confirmar venda
async function confirmarVenda() {
  const payload = {
    cidade: document.getElementById("vendaCidade").value,
    modelo: document.getElementById("vendaModelo").value,
    cor: document.getElementById("vendaCor").value,
    chassi: document.getElementById("vendaChassi").value,
    cliente_nome: document.getElementById("clienteNome").value,
    valor_venda: document.getElementById("valorVenda").value,
    valor_gasolina: document.getElementById("valorGasolina").value,
    brinde: document.getElementById("brinde").value,
    pagamento: document.getElementById("pagamento").value
  };

  await fetch(`${API_URL}/vendas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  fecharModal();
  carregarMotos();
}

// inicial
carregarMotos();
