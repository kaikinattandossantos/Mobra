document.getElementById("form-oferta").addEventListener("submit", async function (e) {
  e.preventDefault();

  const btn = document.getElementById("btn-enviar");
  const msgEl = document.getElementById("mensagem");

  btn.disabled = true;
  btn.textContent = "Enviando...";
  msgEl.className = "mensagem oculto";

  const dados = {
    freteiro_nome: document.getElementById("freteiro_nome").value,
    freteiro_telefone: document.getElementById("freteiro_telefone").value,
    valor: document.getElementById("valor").value,
    veiculo: document.getElementById("veiculo").value,
    descricao: document.getElementById("descricao").value,
    pedido_origem: document.getElementById("pedido_origem").value,
    pedido_destino: document.getElementById("pedido_destino").value,
  };

  try {
    const res = await fetch("/api/oferta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    const data = await res.json();

    if (res.ok) {
      msgEl.textContent = "✅ Oferta enviada com sucesso! O cliente poderá entrar em contato em breve.";
      msgEl.className = "mensagem sucesso";
      document.getElementById("form-oferta").reset();
    } else {
      msgEl.textContent = "❌ " + (data.erro || "Erro ao enviar oferta.");
      msgEl.className = "mensagem erro";
    }
  } catch (err) {
    msgEl.textContent = "❌ Erro de conexão. Tente novamente.";
    msgEl.className = "mensagem erro";
  }

  btn.disabled = false;
  btn.textContent = "🚀 Enviar Oferta";
});