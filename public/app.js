
document.getElementById("form-pedido").addEventListener("submit", async function (e) {
  e.preventDefault();

  const btn = document.getElementById("btn");
  const msgEl = document.getElementById("mensagem");

  btn.disabled = true;
  btn.textContent = "Enviando...";
  msgEl.className = "mensagem oculto";

  const dados = {
    nome: document.getElementById("nome").value,
    origem: document.getElementById("origem").value,
    destino: document.getElementById("destino").value,
    descricao: document.getElementById("descricao").value,
    valor: document.getElementById("valor").value,
  };

  try {
    const res = await fetch("/api/pedido", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    const data = await res.json();

    if (res.ok) {
      msgEl.textContent = "Pedido enviado! Em breve entraremos em contato.";
      msgEl.className = "mensagem sucesso";
      document.getElementById("form-pedido").reset();
    } else {
      msgEl.textContent = data.erro || "Erro ao enviar pedido.";
      msgEl.className = "mensagem erro";
    }
  } catch (err) {
    msgEl.textContent = "Erro de conexao. Tente novamente.";
    msgEl.className = "mensagem erro";
  }

  btn.disabled = false;
  btn.textContent = "Solicitar Entrega";
});
