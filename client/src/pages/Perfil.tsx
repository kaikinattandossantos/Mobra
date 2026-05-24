/*
 * MOBRA — PÁGINA DE PERFIL DO PARCEIRO
 * Design: Clean Tech Logistics
 * Painel completo de gerenciamento: dados, estatísticas, avaliações, configurações
 * Colors: Navy + Electric Blue + Amber
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import {
  Award,
  Star,
  CheckCircle2,
  ChevronRight,
  Edit2,
  LogOut,
  Clock,
  BarChart3,
  Bell,
  Settings,
  Shield,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  Building2,
  Truck,
  AlertCircle,
  Save,
  X,
} from "lucide-react";

const AVATAR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663690743838/nwupWP2DVX6fXoVvixsESr/mobra-driver-avatar-1-gAhQDnPSupGZa3kRHVMc5i.webp";

const credibilitySteps = [
  { label: "Cadastro básico", done: true },
  { label: "Verificação de documentos", done: true },
  { label: "Primeira entrega concluída", done: true },
  { label: "5 avaliações positivas", done: true },
  { label: "Parceiro Ouro desbloqueado", done: false },
];

export default function Perfil() {
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<"visao-geral" | "avaliacoes" | "configuracoes">("visao-geral");
  const [saving, setSaving] = useState(false);

  function handleSaveProfile() {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setEditMode(false);
      toast.success("Perfil atualizado com sucesso!");
    }, 1000);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="pt-20 pb-10 section-light-blue flex-1">
        <div className="container">
          {/* Header com dados do parceiro */}
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
              <div className="relative">
                <img
                  src={AVATAR}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                />
                <span className="absolute -bottom-1 -right-1 badge-partner text-xs px-2 py-1">
                  ★ PARCEIRO
                </span>
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-extrabold mb-1" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.18 0.04 250)" }}>
                      Carlos Mendes
                    </h1>
                    <p className="text-muted-foreground mb-3">carlos.mendes@email.com · (11) 98765-0001</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-xs">Motorista + Veículo</Badge>
                      <Badge className="text-xs text-white" style={{ backgroundColor: "oklch(0.52 0.22 260)" }}>Verificado</Badge>
                      <Badge variant="outline" className="text-xs" style={{ borderColor: "oklch(0.72 0.17 70)", color: "oklch(0.52 0.14 70)" }}>
                        Nível Prata
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={editMode ? "outline" : "default"}
                      size="sm"
                      className="gap-2"
                      onClick={() => setEditMode(!editMode)}
                      style={!editMode ? { backgroundColor: "oklch(0.52 0.22 260)", color: "white" } : {}}
                    >
                      {editMode ? (
                        <>
                          <X className="w-4 h-4" />
                          Cancelar
                        </>
                      ) : (
                        <>
                          <Edit2 className="w-4 h-4" />
                          Editar Perfil
                        </>
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive gap-2"
                      onClick={() => {
                        toast.success("Você saiu da conta.");
                        window.location.href = "/parceiro";
                      }}
                    >
                      <LogOut className="w-4 h-4" />
                      Sair
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit mode */}
            {editMode && (
              <div className="border-t border-border pt-6">
                <h3 className="font-bold text-lg mb-4" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.18 0.04 250)" }}>
                  Editar Informações
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="nome" className="text-sm font-medium">Nome completo</Label>
                    <Input id="nome" defaultValue="Carlos Mendes" className="h-10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone" className="text-sm font-medium">Telefone</Label>
                    <Input id="telefone" defaultValue="(11) 98765-0001" className="h-10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">E-mail</Label>
                    <Input id="email" type="email" defaultValue="carlos.mendes@email.com" className="h-10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="empresa" className="text-sm font-medium">Empresa</Label>
                    <Input id="empresa" defaultValue="Mendes Transportes" className="h-10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="veiculo" className="text-sm font-medium">Veículo</Label>
                    <Input id="veiculo" defaultValue="Fiat Ducato 2022" className="h-10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="localizacao" className="text-sm font-medium">Localização principal</Label>
                    <Input id="localizacao" defaultValue="Vila Madalena, SP" className="h-10" />
                  </div>
                </div>
                <Button
                  className="text-white font-semibold gap-2"
                  style={{ backgroundColor: "oklch(0.52 0.22 260)" }}
                  onClick={handleSaveProfile}
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Salvar Alterações
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {[
              { id: "visao-geral", label: "Visão Geral" },
              { id: "avaliacoes", label: "Avaliações" },
              { id: "configuracoes", label: "Configurações" },
            ].map((t) => (
              <button
                key={t.id}
                className="px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors"
                style={
                  activeTab === t.id
                    ? { backgroundColor: "oklch(0.52 0.22 260)", color: "white" }
                    : { backgroundColor: "white", color: "oklch(0.45 0.04 250)", border: "1px solid oklch(0.92 0.004 286.32)" }
                }
                onClick={() => setActiveTab(t.id as typeof activeTab)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab: Visão Geral */}
          {activeTab === "visao-geral" && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Entregas", value: "47", icon: <CheckCircle2 className="w-4 h-4" />, color: "oklch(0.52 0.22 260)" },
                  { label: "Avaliação", value: "4.8★", icon: <Star className="w-4 h-4" />, color: "oklch(0.62 0.14 70)" },
                  { label: "Este mês", value: "R$ 3.240", icon: <TrendingUp className="w-4 h-4" />, color: "oklch(0.45 0.18 145)" },
                  { label: "Tempo médio", value: "38 min", icon: <Clock className="w-4 h-4" />, color: "oklch(0.52 0.14 300)" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm p-5 card-hover">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: stat.color }}>
                        {stat.icon}
                      </div>
                      <span className="text-xs text-muted-foreground">{stat.label}</span>
                    </div>
                    <p className="text-2xl font-extrabold" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.18 0.04 250)" }}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Credibility progress */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-lg" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.18 0.04 250)" }}>
                    Progresso de Credibilidade
                  </h4>
                  <span className="badge-partner">80% concluído</span>
                </div>
                <Progress value={80} className="h-2 mb-6" />
                <div className="space-y-3">
                  {credibilitySteps.map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${step.done ? "text-white" : "border-2 border-muted"}`}
                        style={step.done ? { backgroundColor: "oklch(0.52 0.22 260)" } : {}}>
                        {step.done && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                      <span className={`text-sm ${step.done ? "font-medium" : "text-muted-foreground"}`} style={step.done ? { color: "oklch(0.18 0.04 250)" } : {}}>
                        {step.label}
                      </span>
                      {step.done && <CheckCircle2 className="w-4 h-4 ml-auto" style={{ color: "oklch(0.52 0.22 260)" }} />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h4 className="font-bold mb-4" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.18 0.04 250)" }}>
                    Ações Rápidas
                  </h4>
                  <div className="space-y-2">
                    {[
                      { label: "Ver ofertas disponíveis", href: "/ofertas" },
                      { label: "Atualizar disponibilidade", href: "#" },
                      { label: "Histórico de entregas", href: "#" },
                      { label: "Suporte técnico", href: "#" },
                    ].map((action, i) => (
                      <button
                        key={i}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-muted transition-colors text-sm"
                        onClick={() => {
                          if (action.href !== "#") window.location.href = action.href;
                          else toast.info("Funcionalidade em breve!");
                        }}
                      >
                        <span style={{ color: "oklch(0.35 0.04 250)" }}>{action.label}</span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h4 className="font-bold mb-4" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.18 0.04 250)" }}>
                    Documentos
                  </h4>
                  <div className="space-y-2">
                    {[
                      { name: "CNH", status: "Verificado" },
                      { name: "RG", status: "Verificado" },
                      { name: "Comprovante de Residência", status: "Pendente" },
                      { name: "Seguro do Veículo", status: "Verificado" },
                    ].map((doc, i) => (
                      <div key={i} className="flex items-center justify-between px-4 py-3 rounded-lg border border-border">
                        <span className="text-sm font-medium" style={{ color: "oklch(0.35 0.04 250)" }}>{doc.name}</span>
                        <Badge
                          variant={doc.status === "Verificado" ? "secondary" : "outline"}
                          className="text-xs"
                          style={doc.status === "Verificado" ? {} : { borderColor: "oklch(0.72 0.17 70)", color: "oklch(0.52 0.14 70)" }}
                        >
                          {doc.status === "Verificado" ? "✓ " : "⚠ "}{doc.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Avaliações */}
          {activeTab === "avaliacoes" && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-lg mb-6" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.18 0.04 250)" }}>
                Avaliações Recentes
              </h3>
              <div className="space-y-4">
                {[
                  { name: "Empresa ABC", stars: 5, comment: "Entrega rápida e motorista muito educado! Recomendo.", date: "há 2 dias" },
                  { name: "Loja XYZ", stars: 5, comment: "Excelente serviço, chegou antes do prazo.", date: "há 5 dias" },
                  { name: "Distribuidora Sul", stars: 4, comment: "Boa entrega, leve atraso mas comunicou tudo.", date: "há 1 semana" },
                  { name: "Comércio Central", stars: 5, comment: "Muito profissional, carga chegou perfeita!", date: "há 10 dias" },
                  { name: "E-commerce Plus", stars: 4, comment: "Bom atendimento, poderia melhorar na comunicação.", date: "há 2 semanas" },
                ].map((rev, i) => (
                  <div key={i} className="border border-border rounded-xl p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold" style={{ color: "oklch(0.18 0.04 250)" }}>{rev.name}</p>
                        <p className="text-xs text-muted-foreground">{rev.date}</p>
                      </div>
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map((s) => (
                          <Star key={s} className={`w-4 h-4 fill-current ${s <= rev.stars ? "star-filled" : "star-empty"}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Configurações */}
          {activeTab === "configuracoes" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="font-bold text-lg mb-6" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.18 0.04 250)" }}>
                  Notificações
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Novos pedidos na minha região", enabled: true },
                    { label: "Mensagens de clientes", enabled: true },
                    { label: "Atualizações de desempenho", enabled: true },
                    { label: "Promoções e ofertas especiais", enabled: false },
                  ].map((notif, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <span className="text-sm font-medium" style={{ color: "oklch(0.35 0.04 250)" }}>{notif.label}</span>
                      <div className="w-12 h-6 rounded-full transition-colors" style={{ backgroundColor: notif.enabled ? "oklch(0.52 0.22 260)" : "oklch(0.82 0.01 250)" }} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="font-bold text-lg mb-6" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.18 0.04 250)" }}>
                  Privacidade e Segurança
                </h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-muted transition-colors text-sm"
                    onClick={() => toast.info("Alteração de senha em breve!")}>
                    <span style={{ color: "oklch(0.35 0.04 250)" }}>Alterar senha</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-muted transition-colors text-sm"
                    onClick={() => toast.info("Autenticação 2FA em breve!")}>
                    <span style={{ color: "oklch(0.35 0.04 250)" }}>Autenticação de dois fatores</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-muted transition-colors text-sm"
                    onClick={() => toast.info("Gerenciador de sessões em breve!")}>
                    <span style={{ color: "oklch(0.35 0.04 250)" }}>Gerenciar sessões ativas</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: "oklch(0.55 0.18 25)" }}>
                  <AlertCircle className="w-5 h-5" />
                  Zona de Perigo
                </h3>
                <p className="text-sm text-muted-foreground mb-4">Ações irreversíveis que afetam sua conta:</p>
                <Button
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                  onClick={() => toast.info("Desativação de conta em breve!")}
                >
                  Desativar Conta
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
