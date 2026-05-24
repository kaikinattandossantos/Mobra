function trocarTab(tab) {
  document.getElementById("form-entrar").classList.toggle("oculto", tab !== "entrar");
  document.getElementById("form-cadastro").classList.toggle("oculto", tab !== "cadastro");
  document.getElementById("tab-entrar").classList.toggle("ativo", tab === "entrar");
  document.getElementById("tab-cadastro").classList.toggle("ativo", tab === "cadastro");
}

// LOGIN
document.getElementById("form-entrar").addEventListener("submit", async function (e) {
  e.preventDefault();
  const btn = document.getElementById("btn-entrar");
  const msgEl = document.getElementById("msg-entrar");
  btn.disabled = true;
  btn.textContent = "Entrando...";
  msgEl.className = "mensagem oculto";

  const email = document.getElementById("login-email").value;
  const senha = document.getElementById("login-senha").value;

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("mobra_token", data.session.access_token);
      localStorage.setItem("mobra_user", JSON.stringify(data.user));
      window.location.href = "/painel.html";
    } else {
      msgEl.textContent = "❌ " + (data.erro || "Email ou senha incorretos.");
      msgEl.className = "mensagem erro";
    }
  } catch (err) {
    msgEl.textContent = "❌ Erro de conexão. Tente novamente.";
    msgEl.className = "mensagem erro";
  }

  btn.disabled = false;
  btn.textContent = "Entrar";
});

// CADASTRO
document.getElementById("form-cadastro").addEventListener("submit", async function (e) {
  e.preventDefault();
  const btn = document.getElementById("btn-cadastro");
  const msgEl = document.getElementById("msg-cadastro");
  btn.disabled = true;
  btn.textContent = "Criando conta...";
  msgEl.className = "mensagem oculto";

  const nome = document.getElementById("cad-nome").value;
  const telefone = document.getElementById("cad-telefone").value;
  const veiculo = document.getElementById("cad-veiculo").value;
  const email = document.getElementById("cad-email").value;
  const senha = document.getElementById("cad-senha").value;

  try {
    const res = await fetch("/api/auth/cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha, nome, telefone, veiculo }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("mobra_token", data.session.access_token);
      localStorage.setItem("mobra_user", JSON.stringify(data.user));
      msgEl.textContent = "✅ Conta criada! Redirecionando...";
      msgEl.className = "mensagem sucesso";
      setTimeout(() => window.location.href = "/painel.html", 1500);
    } else {
      msgEl.textContent = "❌ " + (data.erro || "Erro ao criar conta.");
      msgEl.className = "mensagem erro";
    }
  } catch (err) {
    msgEl.textContent = "❌ Erro de conexão. Tente novamente.";
    msgEl.className = "mensagem erro";
  }

  btn.disabled = false;
  btn.textContent = "Criar conta";
});