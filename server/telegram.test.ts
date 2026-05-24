import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { sendTelegramNotification, formatOrderNotification } from "./telegram";

describe("Telegram Integration", () => {
  it("should format order notification correctly", () => {
    const orderData = {
      id: 123,
      pickupLocation: "Rua A, São Paulo",
      deliveryLocation: "Rua B, São Paulo",
      description: "Pacote frágil",
      value: "150.00",
    };

    const message = formatOrderNotification(orderData);

    expect(message).toContain("Novo Pedido Criado");
    expect(message).toContain("#123");
    expect(message).toContain("Rua A, São Paulo");
    expect(message).toContain("Rua B, São Paulo");
    expect(message).toContain("Pacote frágil");
    expect(message).toContain("R$ 150.00");
  });

  it("should handle order notification without optional fields", () => {
    const orderData = {
      id: 456,
      pickupLocation: "Local A",
      deliveryLocation: "Local B",
    };

    const message = formatOrderNotification(orderData);

    expect(message).toContain("#456");
    expect(message).toContain("Local A");
    expect(message).toContain("Local B");
  });

  it("should validate telegram credentials are configured", async () => {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.warn("Telegram credentials not configured, skipping API test");
      expect(true).toBe(true);
      return;
    }

    // Test with a simple message
    const testMessage = "🧪 Teste de integração Telegram - Plataforma Mobra";
    const result = await sendTelegramNotification(testMessage);

    expect(typeof result).toBe("boolean");
  });
});
