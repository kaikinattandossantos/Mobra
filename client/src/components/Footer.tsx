/*
 * MOBRA FOOTER
 * Design: Clean Tech Logistics — Navy background, white text
 */

import { Link } from "wouter";
import { Truck, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="section-navy pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "oklch(0.52 0.22 260)" }}>
                <Truck className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl text-white" style={{ fontFamily: "Sora, sans-serif" }}>
                Mobra
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "oklch(0.72 0.03 250)" }}>
              Soluções de logística e transporte para seu negócio crescer com segurança e eficiência.
            </p>
          </div>

          {/* Serviços */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider" style={{ fontFamily: "Sora, sans-serif" }}>
              Serviços
            </h4>
            <ul className="space-y-2">
              {["Apenas Motorista", "Motorista + Veículo", "Serviço Completo"].map((s) => (
                <li key={s}>
                  <a href="/" className="text-sm hover:text-white transition-colors" style={{ color: "oklch(0.72 0.03 250)" }}>
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Plataforma */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider" style={{ fontFamily: "Sora, sans-serif" }}>
              Plataforma
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/ofertas" className="text-sm hover:text-white transition-colors" style={{ color: "oklch(0.72 0.03 250)" }}>
                  Ofertas Ativas
                </Link>
              </li>
              <li>
                <Link href="/parceiro" className="text-sm hover:text-white transition-colors" style={{ color: "oklch(0.72 0.03 250)" }}>
                  Conta Parceiro
                </Link>
              </li>
              <li>
                <a href="/" className="text-sm hover:text-white transition-colors" style={{ color: "oklch(0.72 0.03 250)" }}>
                  Sobre Nós
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider" style={{ fontFamily: "Sora, sans-serif" }}>
              Contato
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm" style={{ color: "oklch(0.72 0.03 250)" }}>
                <Mail className="w-4 h-4 shrink-0" />
                contato@mobra.com.br
              </li>
              <li className="flex items-center gap-2 text-sm" style={{ color: "oklch(0.72 0.03 250)" }}>
                <Phone className="w-4 h-4 shrink-0" />
                (11) 98765-4321
              </li>
              <li className="flex items-center gap-2 text-sm" style={{ color: "oklch(0.72 0.03 250)" }}>
                <MapPin className="w-4 h-4 shrink-0" />
                São Paulo, SP
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-3" style={{ borderColor: "oklch(0.32 0.06 250)" }}>
          <p className="text-xs" style={{ color: "oklch(0.55 0.03 250)" }}>
            © 2026 Mobra. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            {["Privacidade", "Termos", "Cookies"].map((t) => (
              <a key={t} href="/" className="text-xs hover:text-white transition-colors" style={{ color: "oklch(0.55 0.03 250)" }}>
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
