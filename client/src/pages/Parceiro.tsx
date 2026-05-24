/*
 * MOBRA — PÁGINA DE CONTA PARCEIRO
 * Design: Clean Tech Logistics
 * Seções: Hero de benefícios, formulário de cadastro/login em abas
 * Colors: Navy + Electric Blue + Amber
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import {
  Award,
  Zap,
  TrendingUp,
  Shield,
  CheckCircle2,
  User,
  Lock,
  Mail,
  Phone,
  Building2,
  ArrowRight,
} from "lucide-react";

const PARTNER_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663690743838/nwupWP2DVX6fXoVvixsESr/mobra-partner-banner-nQtKEgwkgfwUosQ7XqABai.webp";

const benefits = [
  {
    icon: <Award className="w-6 h-6" />,
    title: "Mais Credibilidade",
    desc: "Seu perfil recebe o selo de Parceiro Verificado, aumentando a confiança dos clientes na hora de escolher seu serviço.",
    highlight: true,
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Prioridade nas Solicitações",
    desc: "Parceiros verificados aparecem primeiro nas buscas e recebem notificações de novos pedidos antes dos demais freteiros.",
    highlight: false,
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Mais Corridas, Mais Renda",
    desc: "Acesso a pedidos exclusivos e de maior valor. Parceiros ganham em média 40% mais por mês comparado a não-parceiros.",
    highlight: false,
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Proteção e Suporte",
    desc: "Suporte prioritário 24/7, seguro de carga incluso e acesso ao painel de gestão completo com relatórios de desempenho.",
    highlight: false,
  },
];

export default function Parceiro() {
  const [tab, setTab] = useState<"cadastro" | "entrar">("entrar");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(tab === "cadastro" ? "Conta criada com sucesso! Bem-vindo à Mobra Parceiros." : "Login realizado com sucesso!");
      // Redirect to profile page
      window.location.href = "/perfil";
    }, 1200);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-16 section-light-blue">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="badge-partner">Programa de Parceiros</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.18 0.04 250)" }}>
                Seja um{" "}
                <span style={{ color: "oklch(0.52 0.22 260)" }}>Parceiro Mobra</span>{" "}
                e ganhe mais
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Parceiros verificados recebem mais pedidos, têm maior credibilidade com os clientes e acessam ferramentas exclusivas de gestão.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Mais visibilidade", "Pedidos prioritários", "Suporte 24/7", "Renda maior"].map((tag, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-sm font-medium shadow-sm border border-border" style={{ color: "oklch(0.35 0.04 250)" }}>
                    <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "oklch(0.52 0.22 260)" }} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src={PARTNER_IMG}
                alt="Parceiros Mobra"
                className="w-full h-72 object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "oklch(0.72 0.17 70 / 0.15)" }}>
                  <Award className="w-5 h-5" style={{ color: "oklch(0.62 0.14 70)" }} />
                </div>
                <div>
                  <p className="text-xs font-bold" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.18 0.04 250)" }}>+40% de renda</p>
                  <p className="text-xs text-muted-foreground">média dos parceiros</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits grid */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "oklch(0.52 0.22 260)", fontFamily: "Sora, sans-serif" }}>
              Vantagens exclusivas
            </p>
            <h2 className="text-3xl font-extrabold mb-3" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.18 0.04 250)" }}>
              Por que ser Parceiro Mobra?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Parceiros têm acesso a benefícios que aumentam sua credibilidade, velocidade de atendimento e renda mensal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 card-hover animate-fade-in-up stagger-${(i % 6) + 1} ${
                  b.highlight
                    ? "text-white"
                    : "bg-white border border-border shadow-sm"
                }`}
                style={b.highlight ? { background: "linear-gradient(135deg, oklch(0.22 0.06 250), oklch(0.35 0.10 255))" } : {}}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: b.highlight ? "rgba(255,255,255,0.15)" : "oklch(0.52 0.22 260 / 0.1)",
                    color: b.highlight ? "white" : "oklch(0.52 0.22 260)",
                  }}
                >
                  {b.icon}
                </div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{
                    fontFamily: "Sora, sans-serif",
                    color: b.highlight ? "white" : "oklch(0.18 0.04 250)",
                  }}
                >
                  {b.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: b.highlight ? "rgba(255,255,255,0.8)" : "oklch(0.45 0.03 250)" }}
                >
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Auth Form — Full screen */}
      <section className="py-20 section-light-blue flex-1">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
              {/* Tab switcher */}
              <div className="flex rounded-xl overflow-hidden border border-border mb-10">
                {(["entrar", "cadastro"] as const).map((t) => (
                  <button
                    key={t}
                    className="flex-1 py-3 text-sm font-semibold transition-colors"
                    style={
                      tab === t
                        ? { backgroundColor: "oklch(0.52 0.22 260)", color: "white" }
                        : { color: "oklch(0.45 0.04 250)" }
                    }
                    onClick={() => setTab(t)}
                  >
                    {t === "entrar" ? "Entrar" : "Criar conta"}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-extrabold mb-2" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.18 0.04 250)" }}>
                    {tab === "entrar" ? "Acesse sua Conta" : "Criar Conta Parceiro"}
                  </h2>
                  <p className="text-muted-foreground">
                    {tab === "entrar"
                      ? "Faça login para acessar seu painel de parceiro e gerenciar suas entregas"
                      : "Comece a receber pedidos prioritários e ganhe mais"}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {tab === "cadastro" && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nome" className="text-sm font-medium">Nome completo</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input id="nome" placeholder="Seu nome" className="pl-9 h-11" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="telefone" className="text-sm font-medium">Telefone</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input id="telefone" placeholder="(11) 9xxxx-xxxx" className="pl-9 h-11" required />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="empresa" className="text-sm font-medium">Empresa (opcional)</Label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input id="empresa" placeholder="Nome da empresa" className="pl-9 h-11" />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">E-mail</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="email" type="email" placeholder="seu@email.com" className="pl-9 h-11" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="senha" className="text-sm font-medium">Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="senha" type="password" placeholder="••••••••" className="pl-9 h-11" required />
                    </div>
                  </div>

                  {tab === "cadastro" && (
                    <div className="rounded-xl p-4 text-sm" style={{ backgroundColor: "oklch(0.97 0.015 250)" }}>
                      <p className="font-semibold mb-3 flex items-center gap-2" style={{ color: "oklch(0.22 0.06 250)" }}>
                        <Award className="w-4 h-4" style={{ color: "oklch(0.52 0.22 260)" }} />
                        Ao criar sua conta você recebe:
                      </p>
                      <ul className="space-y-2">
                        {["Perfil verificado com selo Parceiro", "Acesso a pedidos prioritários", "Painel de desempenho completo"].map((item, i) => (
                          <li key={i} className="flex items-center gap-2" style={{ color: "oklch(0.35 0.04 250)" }}>
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: "oklch(0.52 0.22 260)" }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {tab === "entrar" && (
                    <button
                      type="button"
                      className="text-sm hover:underline w-full text-left"
                      style={{ color: "oklch(0.52 0.22 260)" }}
                      onClick={() => toast.info("Recuperação de senha em breve!")}
                    >
                      Esqueci minha senha
                    </button>
                  )}

                  <Button
                    type="submit"
                    className="w-full text-white font-semibold h-12 text-base"
                    style={{ backgroundColor: "oklch(0.52 0.22 260)" }}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processando...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        {tab === "cadastro" ? "Criar minha conta" : "Entrar"}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
