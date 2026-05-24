/*
 * MOBRA — PÁGINA DE OFERTAS ATIVAS
 * Design: Clean Tech Logistics
 * Mostra freteiros disponíveis com: avatar, nome, estrelas, tipo de veículo, valor e status
 * Colors: Navy + Electric Blue + Amber
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import {
  Star,
  MapPin,
  Truck,
  Clock,
  Filter,
  Search,
  CheckCircle2,
  Award,
  ArrowRight,
  RefreshCw,
  Package,
  Shield,
} from "lucide-react";

const AVATAR_1 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663690743838/nwupWP2DVX6fXoVvixsESr/mobra-driver-avatar-1-gAhQDnPSupGZa3kRHVMc5i.webp";
const AVATAR_2 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663690743838/nwupWP2DVX6fXoVvixsESr/mobra-driver-avatar-2-BFt85dH9Np989kuhKckNzN.webp";
const AVATAR_3 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663690743838/nwupWP2DVX6fXoVvixsESr/mobra-driver-avatar-3-oT7wDAcoc6o5uigM.webp";

type Offer = {
  id: number;
  name: string;
  avatar: string;
  stars: number;
  reviews: number;
  vehicle: string;
  vehicleType: "moto" | "van" | "caminhao" | "pickup";
  location: string;
  distance: string;
  price: number;
  priceType: "por km" | "por entrega" | "por hora";
  eta: string;
  verified: boolean;
  partner: boolean;
  available: boolean;
  tags: string[];
};

const allOffers: Offer[] = [
  {
    id: 1,
    name: "Carlos Mendes",
    avatar: AVATAR_1,
    stars: 4.9,
    reviews: 127,
    vehicle: "Fiat Ducato 2022",
    vehicleType: "van",
    location: "Vila Madalena, SP",
    distance: "2.3 km",
    price: 85,
    priceType: "por entrega",
    eta: "~15 min",
    verified: true,
    partner: true,
    available: true,
    tags: ["Carga frágil", "Refrigerado"],
  },
  {
    id: 2,
    name: "Rafael Souza",
    avatar: AVATAR_2,
    stars: 4.7,
    reviews: 89,
    vehicle: "Volkswagen Delivery",
    vehicleType: "caminhao",
    location: "Pinheiros, SP",
    distance: "3.8 km",
    price: 120,
    priceType: "por entrega",
    eta: "~22 min",
    verified: true,
    partner: true,
    available: true,
    tags: ["Carga pesada", "Paletizado"],
  },
  {
    id: 3,
    name: "Ana Lima",
    avatar: AVATAR_3,
    stars: 4.8,
    reviews: 203,
    vehicle: "Renault Master 2021",
    vehicleType: "van",
    location: "Moema, SP",
    distance: "5.1 km",
    price: 95,
    priceType: "por entrega",
    eta: "~28 min",
    verified: true,
    partner: false,
    available: true,
    tags: ["Documentos", "Pequeno volume"],
  },
  {
    id: 4,
    name: "Marcos Oliveira",
    avatar: AVATAR_1,
    stars: 4.5,
    reviews: 56,
    vehicle: "Fiat Strada 2023",
    vehicleType: "pickup",
    location: "Itaim Bibi, SP",
    distance: "1.9 km",
    price: 65,
    priceType: "por entrega",
    eta: "~12 min",
    verified: false,
    partner: false,
    available: true,
    tags: ["Mudança pequena"],
  },
  {
    id: 5,
    name: "Pedro Alves",
    avatar: AVATAR_2,
    stars: 4.6,
    reviews: 74,
    vehicle: "Honda CG 160",
    vehicleType: "moto",
    location: "Consolação, SP",
    distance: "0.8 km",
    price: 18,
    priceType: "por km",
    eta: "~8 min",
    verified: true,
    partner: true,
    available: true,
    tags: ["Expresso", "Documentos"],
  },
  {
    id: 6,
    name: "Fernanda Costa",
    avatar: AVATAR_3,
    stars: 4.9,
    reviews: 312,
    vehicle: "Mercedes Sprinter",
    vehicleType: "van",
    location: "Brooklin, SP",
    distance: "6.4 km",
    price: 140,
    priceType: "por entrega",
    eta: "~35 min",
    verified: true,
    partner: true,
    available: false,
    tags: ["Carga frágil", "Climatizado", "Grande volume"],
  },
  {
    id: 7,
    name: "Lucas Ferreira",
    avatar: AVATAR_1,
    stars: 4.3,
    reviews: 41,
    vehicle: "Iveco Daily",
    vehicleType: "caminhao",
    location: "Santo André, SP",
    distance: "18.2 km",
    price: 180,
    priceType: "por entrega",
    eta: "~50 min",
    verified: false,
    partner: false,
    available: true,
    tags: ["Carga pesada"],
  },
  {
    id: 8,
    name: "Juliana Martins",
    avatar: AVATAR_3,
    stars: 4.7,
    reviews: 98,
    vehicle: "Yamaha Factor",
    vehicleType: "moto",
    location: "Bela Vista, SP",
    distance: "1.2 km",
    price: 15,
    priceType: "por km",
    eta: "~6 min",
    verified: true,
    partner: false,
    available: true,
    tags: ["Expresso", "Pequeno volume"],
  },
];

const vehicleLabels: Record<string, string> = {
  moto: "Moto",
  van: "Van",
  caminhao: "Caminhão",
  pickup: "Pickup",
};

const vehicleIcons: Record<string, React.ReactNode> = {
  moto: <Package className="w-3.5 h-3.5" />,
  van: <Truck className="w-3.5 h-3.5" />,
  caminhao: <Truck className="w-3.5 h-3.5" />,
  pickup: <Truck className="w-3.5 h-3.5" />,
};

function StarRating({ value, count }: { value: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            className={`w-3.5 h-3.5 fill-current ${s <= Math.round(value) ? "star-filled" : "star-empty"}`}
          />
        ))}
      </div>
      <span className="text-sm font-semibold" style={{ color: "oklch(0.18 0.04 250)" }}>{value.toFixed(1)}</span>
      <span className="text-xs text-muted-foreground">({count})</span>
    </div>
  );
}

export default function Ofertas() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("todos");
  const [filterPartner, setFilterPartner] = useState(false);
  const [filterAvailable, setFilterAvailable] = useState(false);
  const [sortBy, setSortBy] = useState<"preco" | "avaliacao" | "distancia">("avaliacao");
  const [refreshing, setRefreshing] = useState(false);

  function handleRefresh() {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast.success("Ofertas atualizadas!");
    }, 1000);
  }

  const filtered = allOffers
    .filter((o) => {
      const matchSearch =
        o.name.toLowerCase().includes(search.toLowerCase()) ||
        o.vehicle.toLowerCase().includes(search.toLowerCase()) ||
        o.location.toLowerCase().includes(search.toLowerCase());
      const matchType = filterType === "todos" || o.vehicleType === filterType;
      const matchPartner = !filterPartner || o.partner;
      const matchAvailable = !filterAvailable || o.available;
      return matchSearch && matchType && matchPartner && matchAvailable;
    })
    .sort((a, b) => {
      if (sortBy === "preco") return a.price - b.price;
      if (sortBy === "avaliacao") return b.stars - a.stars;
      if (sortBy === "distancia") return parseFloat(a.distance) - parseFloat(b.distance);
      return 0;
    });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="pt-24 pb-10 section-navy">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="badge-partner">Ao vivo</span>
                <span className="text-sm" style={{ color: "oklch(0.72 0.03 250)" }}>
                  {allOffers.filter((o) => o.available).length} freteiros disponíveis agora
                </span>
              </div>
              <h1 className="text-4xl font-extrabold text-white mb-2" style={{ fontFamily: "Sora, sans-serif" }}>
                Ofertas Ativas
              </h1>
              <p style={{ color: "oklch(0.72 0.03 250)" }}>
                Escolha o freteiro ideal para sua entrega com base em avaliações, preço e disponibilidade.
              </p>
            </div>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 gap-2 self-start md:self-auto"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
              Atualizar
            </Button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="bg-white border-b border-border sticky top-16 z-40 shadow-sm">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, veículo ou localização..."
                className="pl-9 h-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Vehicle type filter */}
            <div className="flex gap-1.5 flex-wrap">
              {[
                { value: "todos", label: "Todos" },
                { value: "moto", label: "Moto" },
                { value: "van", label: "Van" },
                { value: "caminhao", label: "Caminhão" },
                { value: "pickup", label: "Pickup" },
              ].map((f) => (
                <button
                  key={f.value}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                  style={
                    filterType === f.value
                      ? { backgroundColor: "oklch(0.52 0.22 260)", color: "white" }
                      : { backgroundColor: "oklch(0.96 0.005 250)", color: "oklch(0.45 0.04 250)" }
                  }
                  onClick={() => setFilterType(f.value)}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Toggle filters */}
            <div className="flex gap-2">
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                style={
                  filterPartner
                    ? { backgroundColor: "oklch(0.72 0.17 70 / 0.15)", color: "oklch(0.52 0.14 70)" }
                    : { backgroundColor: "oklch(0.96 0.005 250)", color: "oklch(0.45 0.04 250)" }
                }
                onClick={() => setFilterPartner(!filterPartner)}
              >
                <Award className="w-3.5 h-3.5" />
                Só parceiros
              </button>
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                style={
                  filterAvailable
                    ? { backgroundColor: "oklch(0.45 0.18 145 / 0.15)", color: "oklch(0.35 0.15 145)" }
                    : { backgroundColor: "oklch(0.96 0.005 250)", color: "oklch(0.45 0.04 250)" }
                }
                onClick={() => setFilterAvailable(!filterAvailable)}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Disponíveis
              </button>
            </div>

            {/* Sort */}
            <select
              className="h-9 px-3 rounded-lg border border-border text-xs font-medium bg-white"
              style={{ color: "oklch(0.35 0.04 250)" }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            >
              <option value="avaliacao">Melhor avaliação</option>
              <option value="preco">Menor preço</option>
              <option value="distancia">Mais próximo</option>
            </select>
          </div>
        </div>
      </div>

      {/* Offers list */}
      <section className="py-10 section-light-blue flex-1">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Truck className="w-12 h-12 mx-auto mb-4 text-muted-foreground/40" />
              <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.35 0.04 250)" }}>
                Nenhuma oferta encontrada
              </h3>
              <p className="text-sm text-muted-foreground">Tente ajustar os filtros ou buscar por outro termo.</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Mostrando <strong>{filtered.length}</strong> oferta{filtered.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((offer, i) => (
                  <div
                    key={offer.id}
                    className={`bg-white rounded-2xl shadow-sm card-hover animate-fade-in-up stagger-${Math.min(i + 1, 6)} overflow-hidden ${
                      !offer.available ? "opacity-60" : ""
                    }`}
                  >
                    {/* Card header */}
                    <div className="p-5 pb-4">
                      <div className="flex items-start gap-4">
                        <div className="relative shrink-0">
                          <img
                            src={offer.avatar}
                            alt={offer.name}
                            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                          />
                          {offer.available && (
                            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white" style={{ backgroundColor: "oklch(0.55 0.18 145)" }} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="font-bold text-base truncate" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.18 0.04 250)" }}>
                              {offer.name}
                            </h3>
                            {offer.partner && (
                              <span className="badge-partner shrink-0">★ PARCEIRO</span>
                            )}
                            {offer.verified && !offer.partner && (
                              <span className="inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-full font-semibold" style={{ backgroundColor: "oklch(0.52 0.22 260 / 0.1)", color: "oklch(0.52 0.22 260)" }}>
                                <Shield className="w-3 h-3" />
                                Verificado
                              </span>
                            )}
                          </div>
                          <StarRating value={offer.stars} count={offer.reviews} />
                        </div>
                      </div>

                      {/* Vehicle info */}
                      <div className="mt-4 flex items-center gap-2 text-sm" style={{ color: "oklch(0.45 0.04 250)" }}>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{ backgroundColor: "oklch(0.96 0.005 250)" }}>
                          {vehicleIcons[offer.vehicleType]}
                          <span className="font-medium">{vehicleLabels[offer.vehicleType]}</span>
                        </div>
                        <span className="truncate text-xs">{offer.vehicle}</span>
                      </div>

                      {/* Location & ETA */}
                      <div className="mt-3 flex items-center justify-between text-xs" style={{ color: "oklch(0.52 0.04 250)" }}>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{offer.location}</span>
                          <span className="text-muted-foreground">· {offer.distance}</span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{offer.eta}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      {offer.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {offer.tags.map((tag) => (
                            <span key={tag} className="text-xs px-2 py-0.5 rounded-full border border-border" style={{ color: "oklch(0.45 0.04 250)" }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Card footer */}
                    <div className="px-5 py-4 border-t border-border flex items-center justify-between gap-3" style={{ backgroundColor: "oklch(0.99 0 0)" }}>
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-extrabold" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.18 0.04 250)" }}>
                            R$ {offer.price}
                          </span>
                          <span className="text-xs text-muted-foreground">{offer.priceType}</span>
                        </div>
                        {!offer.available && (
                          <span className="text-xs font-medium" style={{ color: "oklch(0.55 0.18 25)" }}>Indisponível agora</span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        className="text-white font-semibold gap-1.5 shrink-0"
                        style={{ backgroundColor: offer.available ? "oklch(0.52 0.22 260)" : undefined }}
                        variant={offer.available ? "default" : "outline"}
                        disabled={!offer.available}
                        onClick={() =>
                          offer.available
                            ? toast.success(`Solicitação enviada para ${offer.name}!`)
                            : undefined
                        }
                      >
                        {offer.available ? (
                          <>
                            Solicitar
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        ) : (
                          "Indisponível"
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA parceiro */}
      <section className="py-14 bg-white border-t border-border">
        <div className="container text-center">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "oklch(0.52 0.22 260)", fontFamily: "Sora, sans-serif" }}>
            É freteiro?
          </p>
          <h2 className="text-3xl font-extrabold mb-3" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.18 0.04 250)" }}>
            Apareça nas ofertas como Parceiro
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Crie sua conta parceiro e apareça com destaque para clientes que buscam freteiros confiáveis. Parceiros recebem mais pedidos e têm maior credibilidade.
          </p>
          <Button
            size="lg"
            className="text-white font-semibold px-8"
            style={{ backgroundColor: "oklch(0.52 0.22 260)" }}
            onClick={() => (window.location.href = "/parceiro")}
          >
            Criar Conta Parceiro
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
