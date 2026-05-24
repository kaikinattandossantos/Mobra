/*
 * MOBRA HOME PAGE
 * Design: Clean Tech Logistics — Asymmetric hero, alternating sections
 * Colors: Navy (#1E3A5F) + Electric Blue (#2563EB) + Amber accent
 * Typography: Sora (headings) + Inter (body)
 */

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import {
  Truck,
  Shield,
  Zap,
  Star,
  ArrowRight,
  CheckCircle2,
  Users,
  Package,
  Clock,
  Award,
} from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663690743838/nwupWP2DVX6fXoVvixsESr/mobra-hero-truck-5QsTTP7DMMSVyva8XQFcr2.webp";

const services = [
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Apenas Motorista",
    desc: "Você possui veículo? Contrate apenas um motorista profissional para sua entrega.",
    features: ["Motorista experiente", "Horários flexíveis", "Melhor custo"],
    badge: null,
  },
  {
    icon: <Package className="w-6 h-6" />,
    title: "Motorista + Veículo",
    desc: "Solução completa com motorista e veículo. Ideal para a maioria das entregas.",
    features: ["Veículo moderno", "Motorista profissional", "Rastreamento"],
    badge: "POPULAR",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Serviço Completo",
    desc: "Deixe conosco! Cuidamos de tudo, desde o motorista até a entrega.",
    features: ["Solução completa", "Seguro incluído", "Suporte 24/7"],
    badge: null,
  },
];

const stats = [
  { value: "500+", label: "Clientes ativos" },
  { value: "98%", label: "Satisfação" },
  { value: "12k+", label: "Entregas realizadas" },
  { value: "24/7", label: "Suporte disponível" },
];

const highlights = [
  { icon: <Zap className="w-5 h-5" />, title: "Rápido", desc: "Entregas ágeis e pontuais para seu negócio" },
  { icon: <Shield className="w-5 h-5" />, title: "Seguro", desc: "Suas cargas protegidas em todas as entregas" },
  { icon: <Users className="w-5 h-5" />, title: "Profissional", desc: "Equipe treinada e experiente" },
  { icon: <Star className="w-5 h-5" />, title: "Confiável", desc: "Parceiro de confiança para suas entregas" },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        {/* Overlay gradient — left side white fade for text readability */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.97) 45%, rgba(255,255,255,0.3) 75%, rgba(255,255,255,0) 100%)" }} />

        <div className="container relative z-10">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 mb-6 animate-fade-in-up">
              <span className="badge-partner">Plataforma #1 em Logística</span>
            </div>
            <h1
              className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up stagger-1"
              style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.18 0.04 250)" }}
            >
              Entregas{" "}
              <span style={{ color: "oklch(0.52 0.22 260)" }}>Rápidas</span>{" "}
              e{" "}
              <span style={{ color: "oklch(0.52 0.22 260)" }}>Confiáveis</span>
            </h1>
            <p className="text-lg leading-relaxed mb-8 animate-fade-in-up stagger-2" style={{ color: "oklch(0.35 0.04 250)" }}>
              A Mobra oferece soluções completas de logística e transporte para empresas de todos os tamanhos. Escolha o serviço que melhor se adequa às suas necessidades.
            </p>
            <div className="flex flex-wrap gap-3 mb-10 animate-fade-in-up stagger-3">
              <Link href="/fazer-pedido">
                <Button
                  size="lg"
                  className="text-white font-semibold px-8 shadow-lg"
                  style={{ backgroundColor: "oklch(0.52 0.22 260)" }}
                >
                  Solicitar Entrega Agora
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/ofertas">
                <Button variant="outline" size="lg" className="border-2 font-semibold" style={{ borderColor: "oklch(0.52 0.22 260)", color: "oklch(0.52 0.22 260)" }}>
                  Ver Ofertas Ativas
                </Button>
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3 animate-fade-in-up stagger-4">
              <div className="flex -space-x-2">
                {[
                  "https://d2xsxph8kpxj0f.cloudfront.net/310519663690743838/nwupWP2DVX6fXoVvixsESr/mobra-driver-avatar-1-gAhQDnPSupGZa3kRHVMc5i.webp",
                  "https://d2xsxph8kpxj0f.cloudfront.net/310519663690743838/nwupWP2DVX6fXoVvixsESr/mobra-driver-avatar-2-BFt85dH9Np989kuhKckNzN.webp",
                  "https://d2xsxph8kpxj0f.cloudfront.net/310519663690743838/nwupWP2DVX6fXoVvixsESr/mobra-driver-avatar-3-oT7wDAcoc6o5uigM.webp",
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="cliente"
                    className="w-9 h-9 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <div>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((s) => <Star key={s} className="w-3.5 h-3.5 star-filled fill-current" />)}
                </div>
                <p className="text-xs mt-0.5" style={{ color: "oklch(0.45 0.04 250)" }}>
                  Mais de <strong>500+</strong> clientes satisfeitos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="section-navy py-10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-extrabold text-white mb-1" style={{ fontFamily: "Sora, sans-serif" }}>
                  {s.value}
                </div>
                <div className="text-sm" style={{ color: "oklch(0.72 0.03 250)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Serviços */}
      <section className="py-20 section-light-blue">
        <div className="container">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "oklch(0.52 0.22 260)", fontFamily: "Sora, sans-serif" }}>
              O que oferecemos
            </p>
            <h2 className="text-4xl font-extrabold mb-4" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.18 0.04 250)" }}>
              Nossos Serviços
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Escolha a opção que melhor se adequa ao seu negócio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <div
                key={i}
                className={`relative bg-white rounded-2xl p-8 shadow-sm card-hover animate-fade-in-up stagger-${i + 1} ${
                  svc.badge ? "ring-2 ring-primary" : ""
                }`}
              >
                {svc.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="badge-partner">{svc.badge}</span>
                  </div>
                )}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-white"
                  style={{ backgroundColor: "oklch(0.52 0.22 260)" }}
                >
                  {svc.icon}
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.18 0.04 250)" }}>
                  {svc.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{svc.desc}</p>
                <ul className="space-y-2">
                  {svc.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "oklch(0.52 0.22 260)" }} />
                      <span style={{ color: "oklch(0.35 0.04 250)" }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full mt-6 text-white font-semibold"
                  style={{ backgroundColor: svc.badge ? "oklch(0.52 0.22 260)" : undefined }}
                  variant={svc.badge ? "default" : "outline"}
                >
                  Solicitar
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "oklch(0.52 0.22 260)", fontFamily: "Sora, sans-serif" }}>
                Por que a Mobra?
              </p>
              <h2 className="text-4xl font-extrabold mb-6" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.18 0.04 250)" }}>
                Logística que funciona de verdade
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Nossa plataforma conecta empresas a freteiros verificados e qualificados, garantindo entregas seguras, rápidas e com rastreamento em tempo real.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {highlights.map((h, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-white" style={{ backgroundColor: "oklch(0.52 0.22 260 / 0.12)", color: "oklch(0.52 0.22 260)" }}>
                      {h.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-0.5" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.18 0.04 250)" }}>{h.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{h.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663690743838/nwupWP2DVX6fXoVvixsESr/mobra-partner-banner-nQtKEgwkgfwUosQ7XqABai.webp"
                  alt="Parceria Mobra"
                  className="w-full h-72 object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "oklch(0.72 0.17 70 / 0.15)" }}>
                  <Award className="w-5 h-5" style={{ color: "oklch(0.62 0.14 70)" }} />
                </div>
                <div>
                  <p className="text-xs font-bold" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.18 0.04 250)" }}>Parceiros Verificados</p>
                  <p className="text-xs text-muted-foreground">+200 freteiros ativos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 section-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="container relative z-10 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "Sora, sans-serif" }}>
            Pronto para começar?
          </h2>
          <p className="mb-8 max-w-xl mx-auto" style={{ color: "oklch(0.72 0.03 250)" }}>
            Faça seu primeiro pedido agora e descubra por que milhares de empresas confiam na Mobra para suas entregas.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="text-white font-semibold px-8" style={{ backgroundColor: "oklch(0.52 0.22 260)" }}>
              Solicitar Entrega
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Link href="/parceiro">
              <Button size="lg" variant="outline" className="font-semibold px-8 border-white/30 text-white hover:bg-white/10">
                Criar Conta Parceiro
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
