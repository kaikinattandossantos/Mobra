async function carregarOfertas() {
  try {
    const res = await fetch("/api/ofertas");
    const data = await res.json();

    const loading = document.getElementById("loading");
    const lista = document.getElementById("lista-ofertas");
    const semOfertas = document.getElementById("sem-ofertas");

    loading.classList.add("oculto");

    if (!data.ofertas || data.ofertas.length === 0) {
      semOfertas.classList.remove("oculto");
      return;
    }

    lista.classList.remove("oculto");
    lista.innerHTML = data.ofertas.map(oferta => `
      <div class="oferta-card">
        <div class="oferta-avatar">${oferta.freteiro_nome.charAt(0).toUpperCase()}</div>
        <div class="oferta-info">
          <h3>${oferta.freteiro_nome}</h3>
          ${oferta.veiculo ? `<p class="oferta-veiculo">🚗 ${oferta.veiculo}</p>` : ""}
          ${oferta.pedido_origem ? `<p class="oferta-rota">📍 ${oferta.pedido_origem} → ${oferta.pedido_destino}</p>` : ""}
          ${oferta.descricao ? `<p class="oferta-desc">${oferta.descricao}</p>` : ""}
          <p class="oferta-tempo">🕐 ${formatarTempo(oferta.criado_em)}</p>
        </div>
        <div class="oferta-valor">
          <span class="valor">R$ ${Number(oferta.valor).toFixed(2)}</span>
          <a href="https://wa.me/55${oferta.freteiro_telefone.replace(/\D/g, '')}" 
             target="_blank" class="btn-contato">💬 Contatar</a>
        </div>
      </div>
    `).join("");

  } catch (err) {
    document.getElementById("loading").textContent = "Erro ao carregar ofertas.";
  }
}

function formatarTempo(dataStr) {
  const data = new Date(dataStr);
  const agora = new Date();
  const diff = Math.floor((agora - data) / 1000 / 60);
  if (diff < 1) return "agora mesmo";
  if (diff < 60) return `há ${diff} min`;
  if (diff < 1440) return `há ${Math.floor(diff / 60)}h`;
  return `há ${Math.floor(diff / 1440)} dias`;
}

carregarOfertas();
setInterval(carregarOfertas, 30000); // atualiza a cada 30 segundos