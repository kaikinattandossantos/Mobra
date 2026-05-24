import { ENV } from "./_core/env";

/**
 * Enviar mensagem para o Telegram
 */
export async function sendTelegramNotification(message: string): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn("[Telegram] Bot token or chat ID not configured");
    return false;
  }

  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("[Telegram] Failed to send message:", error);
      return false;
    }

    console.log("[Telegram] Message sent successfully");
    return true;
  } catch (error) {
    console.error("[Telegram] Error sending message:", error);
    return false;
  }
}

/**
 * Formatar mensagem de novo pedido
 */
export function formatOrderNotification(orderData: {
  id: number;
  pickupLocation: string;
  deliveryLocation: string;
  description?: string;
  value?: string;
}): string {
  return `
<b>📦 Novo Pedido Criado!</b>

<b>ID do Pedido:</b> #${orderData.id}
<b>Local de Coleta:</b> ${orderData.pickupLocation}
<b>Local de Entrega:</b> ${orderData.deliveryLocation}
${orderData.description ? `<b>Descrição:</b> ${orderData.description}` : ""}
${orderData.value ? `<b>Valor:</b> R$ ${orderData.value}` : ""}

<i>Acesse a plataforma para gerenciar este pedido.</i>
  `.trim();
}
