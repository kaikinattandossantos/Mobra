/*
 * MOBRA — PÁGINA DE FAZER PEDIDO
 * Design: Clean Tech Logistics
 * Formulário para criar novo pedido com notificação automática no Telegram
 * Colors: Navy + Electric Blue + Amber
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import {
  MapPin,
  Package,
  DollarSign,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageSquare,
} from "lucide-react";

export default function FazerPedido() {
  const [formData, setFormData] = useState({
    pickupLocation: "",
    deliveryLocation: "",
    description: "",
    value: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

  const createOrderMutation = trpc.orders.create.useMutation();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.pickupLocation.trim() || !formData.deliveryLocation.trim()) {
      toast.error("Preencha os locais de coleta e entrega");
      return;
    }

    setLoading(true);

    try {
      const result = await createOrderMutation.mutateAsync({
        pickupLocation: formData.pickupLocation,
        deliveryLocation: formData.deliveryLocation,
        description: formData.description,
        value: formData.value,
      });

      if (result.success) {
        setSuccess(true);
        setOrderId(result.orderId);
        setFormData({
          pickupLocation: "",
          deliveryLocation: "",
          description: "",
          value: "",
        });

        toast.success(
          result.telegramNotified
            ? "Pedido criado! Notificação enviada para o Telegram ✓"
            : "Pedido criado com sucesso!"
        );

        // Resetar sucesso após 5 segundos
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      toast.error("Erro ao criar pedido. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (success && orderId) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <section className="flex-1 py-20 section-light-blue flex items-center justify-center">
          <div className="container">
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "oklch(0.45 0.18 145 / 0.15)" }}>
                <CheckCircle2 className="w-8 h-8" style={{ color: "oklch(0.45 0.18 145)" }} />
              </div>

              <h2 className="text-2xl font-extrabold mb-2" style={{ fontFamily: "Sora, sans-serif", color: "oklch(0.18 0.04 250)" }}>
                Pedido Criado!
              </h2>

              <p className="text-muted-foreground mb-6">
                Seu pedido foi criado com sucesso e uma notificação foi enviada para o seu Telegram.
              </p>

              <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
                <p className="text-sm font-semibold mb-1" style={{ color: "oklch(0.35 0.04 250)" }}>
                  ID do Pedido
                </p>
                <p className="text-2xl font-bold" style={{ color: "oklch(0.52 0.22 260)" }}>
                  #{orderId}
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1 text-white font-semibold"
                  style={{ backgroundColor: "oklch(0.52 0.22 260)" }}
                  onClick={() => setSuccess(false)}
                >
                  Criar Novo Pedido
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 font-semibold"
                  onClick={() => (window.location.href = "/ofertas")}
                >
                  Ver Ofertas
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="pt-24 pb-10 section-navy">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: "oklch(0.52 0.22 260)" }}>
              <Package className="w-5 h-5" />
            </div>
            <h1 className="text-4xl font-extrabold text-white" style={{ fontFamily: "Sora, sans-serif" }}>
              Fazer Pedido
            </h1>
          </div>
          <p style={{ color: "oklch(0.72 0.03 250)" }}>
            Preencha os detalhes do seu pedido e receba uma notificação automática no Telegram
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 section-light-blue flex-1">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10">
              {/* Info box */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8 flex gap-3">
                <MessageSquare className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "oklch(0.52 0.22 260)" }} />
                <div>
                  <p className="text-sm font-semibold mb-1" style={{ color: "oklch(0.35 0.04 250)" }}>
                    Notificação Automática
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Você receberá uma notificação no Telegram assim que seu pedido for criado com todos os detalhes.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Pickup Location */}
                <div className="space-y-2">
                  <Label htmlFor="pickupLocation" className="text-sm font-semibold">
                    Local de Coleta *
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="pickupLocation"
                      name="pickupLocation"
                      placeholder="Ex: Rua das Flores, 123, São Paulo - SP"
                      className="pl-9 h-11"
                      value={formData.pickupLocation}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Endereço completo de onde o item será coletado</p>
                </div>

                {/* Delivery Location */}
                <div className="space-y-2">
                  <Label htmlFor="deliveryLocation" className="text-sm font-semibold">
                    Local de Entrega *
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="deliveryLocation"
                      name="deliveryLocation"
                      placeholder="Ex: Avenida Paulista, 456, São Paulo - SP"
                      className="pl-9 h-11"
                      value={formData.deliveryLocation}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Endereço completo de destino</p>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-semibold">
                    Descrição do Item (opcional)
                  </Label>
                  <div className="relative">
                    <Package className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <textarea
                      id="description"
                      name="description"
                      placeholder="Ex: Caixa com documentos, frágil, refrigerado, etc."
                      className="pl-9 p-3 w-full rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                      rows={3}
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Informações sobre o tipo de carga</p>
                </div>

                {/* Value */}
                <div className="space-y-2">
                  <Label htmlFor="value" className="text-sm font-semibold">
                    Valor Estimado (opcional)
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="value"
                      name="value"
                      type="number"
                      placeholder="Ex: 150.00"
                      className="pl-9 h-11"
                      step="0.01"
                      min="0"
                      value={formData.value}
                      onChange={handleInputChange}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Valor em reais (R$)</p>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full text-white font-semibold h-12 text-base gap-2"
                    style={{ backgroundColor: "oklch(0.52 0.22 260)" }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Criando pedido...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Criar Pedido
                      </>
                    )}
                  </Button>
                </div>

                {/* Info */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "oklch(0.62 0.14 70)" }} />
                  <p className="text-xs" style={{ color: "oklch(0.35 0.04 250)" }}>
                    Todos os campos marcados com <strong>*</strong> são obrigatórios. Você receberá uma notificação no Telegram com o ID do pedido.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
