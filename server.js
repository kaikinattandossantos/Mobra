require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");
const express = require("express");
const cors = require("cors");
const path = require("path");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const app = express();
app.use(cors());
app.use(express.json());

// Serve os arquivos estáticos do frontend (HTML, CSS, JS puro)
app.use(express.static(path.join(__dirname, "public")));

// Função para notificar via Telegram
async function sendTelegram(message) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("Telegram não configurado nosenvs");
    return false;
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "HTML" }),
    });
    return res.ok;
  } catch (err) {
    console.error("Erro ao conectar com a API do Telegram:", err);
    return false;
  }
}

// Rota: Criar Pedido (Dispara Telegram)
app.post("/api/pedido", async (req, res) => {
  const { nome, origem, destino, descricao, valor } = req.body;

  if (!nome || !origem || !destino) {
    return res.status(400).json({ erro: "Nome, origem e destino são obrigatórios" });
  }

  const mensagem = `
<b>Novo Pedido - Mobra</b>

<b>Cliente:</b> ${nome}
<b>Coleta:</b> ${origem}
<b>Entrega:</b> ${destino}
${descricao ? `<b>Descrição:</b> ${descricao}` : ""}
${valor ? `<b>Valor:</b> R$ ${valor}` : ""}
  `.trim();

  const enviado = await sendTelegram(mensagem);

  if (enviado) {
    res.json({ sucesso: true, mensagem: "Pedido enviado com sucesso!" });
  } else {
    res.status(500).json({ erro: "Erro ao enviar notificação para o Telegram" });
  }
});

// Rota: Freteiro envia oferta (Salva no Supabase)
app.post("/api/oferta", async (req, res) => {
  const { freteiro_nome, freteiro_telefone, valor, veiculo, descricao, pedido_origem, pedido_destino } = req.body;

  if (!freteiro_nome || !freteiro_telefone || !valor) {
    return res.status(400).json({ erro: "Nome, telefone e valor são obrigatórios" });
  }

  const { data, error } = await supabase
    .from("ofertas")
    .insert([{ freteiro_nome, freteiro_telefone, valor, veiculo, descricao, pedido_origem, pedido_destino }])
    .select();

  if (error) {
    console.error("[Supabase] Erro ao salvar oferta:", error);
    return res.status(500).json({ erro: "Erro ao salvar oferta" });
  }

  res.json({ sucesso: true, oferta: data[0] });
});

// Rota: Buscar todas as ofertas (Listagem)
app.get("/api/ofertas", async (req, res) => {
  // Ajustado: "criado_em" assume que sua tabela no Supabase tem essa coluna de timestamp
  const { data, error } = await supabase
    .from("ofertas")
    .select("*")
    .order("criado_em", { ascending: false });

  if (error) {
    console.error("[Supabase] Erro ao buscar ofertas:", error);
    return res.status(500).json({ erro: "Erro ao buscar ofertas" });
  }

  // CORRIGIDO: Sintaxe do objeto corrigida de (ofertas: data) para ({ ofertas: data })
  res.json({ ofertas: data });
});

// Rota coringa para garantir que o SPA ou rotas do front não quebrem (opcional, mas boa prática)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


// Buscar pedidos para o painel do parceiro
app.get("/api/pedidos", async (req, res) => {
  const { data, error } = await supabase
    .from("pedidos")
    .select("*")
    .order("criado_em", { ascending: false });

  if (error) {
    return res.status(500).json({ erro: "Erro ao buscar pedidos" });
  }

  res.json({ pedidos: data });
});

// Cadastro de parceiro
app.post("/api/auth/cadastro", async (req, res) => {
  const { email, senha, nome, telefone, veiculo } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password: senha,
    options: {
      data: { nome, telefone, veiculo }
    }
  });

  if (error) {
    return res.status(400).json({ erro: error.message });
  }

  res.json({ sucesso: true, user: data.user, session: data.session });
});

// Login de parceiro
app.post("/api/auth/login", async (req, res) => {
  const { email, senha } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: senha,
  });

  if (error) {
    return res.status(400).json({ erro: error.message });
  }

  res.json({ sucesso: true, user: data.user, session: data.session });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Mobra rodando em http://localhost:${PORT}`);
});