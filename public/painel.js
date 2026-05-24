const SUPABASE_URL = "https://qusxbmlzruwnxocegsmd.supabase.co";
const SUPABASE_KEY = "sua_anon_key_aqui";

const token = localStorage.getItem("mobra_token");
const user = JSON.parse(localStorage.getItem("mobra_user") || "null");

if (!token || !user) {
  window.location.href = "/parceiro.html";
}

const nome = user?.user_metadata?.nome || user?.email || "Parceiro";
document.getElementById("nav-nome").textContent = nome;
document.getElementById("painel-titulo").textContent = `👋 Olá, ${nome.split(" ")[0]}!`;

function sair() {
  localStorage.removeItem("mobra_token");
  localStorage.removeItem("mobra_user");
  window.location.href = "/parceiro.html";
}

function trocarPainel(aba) {
  document.getElementById("painel-pedidos").classList.toggle("oculto", aba !== "pedidos");
  document.getElementById("painel-minhas").classList.toggle("oculto", aba !== "minhas");
  document.querySelectorAll(".tab").forEach((t, i) => {
    t.classList.toggle("ativo", (aba === "pedidos" && i === 0) || (aba === "minhas" && i === 1));
  });
  if (aba === "minhas") carregarMinhasOfertas();
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

async function carregarPedidos() {
  try {
    const res = await fetch("/api/pedidos");
    const data = await res.json();

    document.getElementById("loading-pedidos").classList.add("oculto");

    if (!data.pedidos || data.pedidos.length === 0) {
      document.getElementById("sem-pedidos").classList.remove("oculto");
      return;
    }

    const lista = document.getElementById("lista-pedidos");
    lista.classList.remove("oculto");
    lista.innerHTML = data.pedidos.map(p => `
      <div class="oferta-card">
        <div class="oferta-avatar">📦</div>
        <div class="oferta-info">
          <h3>${p.nome}</h3>
          <p class="oferta-rota">📍 ${p.origem} → ${p.destino}</p>
          ${p.descricao ? `<p class="oferta-desc">${p.descricao}</p>` : ""}
          ${p.valor ? `<p class="oferta-desc">💰 Valor: R$ ${p.valor}</p>` : ""}
          <p class="oferta-tempo">🕐 ${formatarTempo(p.criado_em)}</p>
        </div>
        <div class="oferta-valor">
          <a href="/oferecer.html" class="btn-contato" style="background: var(--blue);">Fazer Oferta</a>
        </div>
      </div>
    `).join("");
  } catch (err) {
    document.getElementById("loading-pedidos").textContent = "Erro ao carregar pedidos.";
  }
}

async function carregarMinhasOfertas() {
  document.getElementById("loading-minhas").classList.remove("oculto");
  document.getElementById("lista-minhas").classList.add("oculto");
  document.getElementById("sem-minhas").classList.add("oculto");

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/ofertas?select=*&order=criado_em.desc`, {
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${token}`,
      },
    });
    const data = await res.json();

    document.getElementById("loading-minhas").classList.add("oculto");

    if (!data || data.length === 0) {
      document.getElementById("sem-minhas").classList.remove("oculto");
      return;
    }

    const lista = document.getElementById("lista-minhas");
    lista.classList.remove("oculto");
    lista.innerHTML = data.map(o => `
      <div class="oferta-card">
        <div class="oferta-avatar">${o.freteiro_nome.charAt(0).toUpperCase()}</div>
        <div class="oferta-info">
          <h3>${o.freteiro_nome}</h3>
          <p class="oferta-rota">📍 ${o.pedido_origem} → ${o.pedido_destino}</p>
          ${o.veiculo ? `<p class="oferta-veiculo">🚗 ${o.veiculo}</p>` : ""}
          <p class="oferta-tempo">🕐 ${formatarTempo(o.criado_em)}</p>
        </div>
        <div class="oferta-valor">
          <span class="valor">R$ ${Number(o.valor).toFixed(2)}</span>
        </div>
      </div>
    `).join("");
  } catch (err) {
    document.getElementById("loading-minhas").textContent = "Erro ao carregar ofertas.";
  }
}

carregarPedidos();