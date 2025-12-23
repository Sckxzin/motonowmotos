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
        <button onclick='abrirVenda(${JSON.stringify(moto)})'>Vender</button>
        <button onclick='abrirTransferencia(${JSON.stringify(moto)})'>Transferir</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

// ---------- VENDA ----------
function abrirVenda(moto) {
  document.getElementById("vendaCidade").value = moto.cidade;
  document.getElementById("vendaModelo").value = moto.modelo;
  document.getElementById("vendaCor").value = moto.cor;
  document.getElementById("vendaChassi").value = moto.chassi;
  document.getElementById("modalVenda").style.display = "block";
}

function fecharModal() {
  document.getElementById("modalVenda").style.display = "none";
}

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

// ---------- TRANSFERÊNCIA ----------
function abrirTransferencia(moto) {
  document.getElementById("transfChassi").value = moto.chassi;
  document.getElementById("transfCidadeOrigem").value = moto.cidade;
  document.getElementById("modalTransferencia").style.display = "block";
}

function fecharTransferencia() {
  document.getElementById("modalTransferencia").style.display = "none";
}

async function confirmarTransferencia() {
  const payload = {
    chassi: document.getElementById("transfChassi").value,
    cidade_origem: document.getElementById("transfCidadeOrigem").value,
    cidade_destino: document.getElementById("transfCidadeDestino").value
  };

  await fetch(`${API_URL}/transferencias/solicitar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  fecharTransferencia();
  carregarMotos();
}

// init
carregarMotos();
