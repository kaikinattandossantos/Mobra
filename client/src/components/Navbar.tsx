/*
 * MOBRA NAVBAR
 * Design: Clean Tech Logistics — Navy + Electric Blue
 * Fixed top navigation with logo, links and CTAs
 */

import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Truck } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Início" },
    { href: "/ofertas", label: "Ofertas Ativas" },
    { href: "/parceiro", label: "Conta Parceiro" },
    { href: "/perfil", label: "Perfil" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "oklch(0.52 0.22 260)" }}>
            <Truck className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-xl" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.22 0.06 250)" }}>
            Mobra
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                location === link.href
                  ? "text-white"
                  : "text-foreground/70 hover:text-foreground hover:bg-muted"
              }`}
              style={
                location === link.href
                  ? { backgroundColor: "oklch(0.52 0.22 260)" }
                  : {}
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="border-primary text-primary hover:bg-primary hover:text-white transition-colors"
            onClick={() => (window.location.href = "/perfil")}
          >
            Perfil
          </Button>
          <Button
            size="sm"
            className="text-white font-semibold"
            style={{ backgroundColor: "oklch(0.52 0.22 260)" }}
            onClick={() => (window.location.href = "/")}
          >
            Fazer Pedido
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-border px-4 py-3 flex flex-col gap-1 animate-fade-in">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                location === link.href
                  ? "text-white"
                  : "text-foreground/70 hover:text-foreground hover:bg-muted"
              }`}
              style={
                location === link.href
                  ? { backgroundColor: "oklch(0.52 0.22 260)" }
                  : {}
              }
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-2 mt-2 pt-2 border-t border-border">
            <Button variant="outline" size="sm" className="flex-1 border-primary text-primary">
              Entrar
            </Button>
            <Button size="sm" className="flex-1 text-white" style={{ backgroundColor: "oklch(0.52 0.22 260)" }}>
              Fazer Pedido
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
