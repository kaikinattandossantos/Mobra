import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { createOrder, markOrderAsNotified } from "./db";
import { sendTelegramNotification, formatOrderNotification } from "./telegram";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  orders: router({
    create: protectedProcedure
      .input(
        z.object({
          pickupLocation: z.string().min(1),
          deliveryLocation: z.string().min(1),
          description: z.string().optional(),
          value: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        try {
          // Criar pedido no banco de dados
          const result = await createOrder({
            userId: ctx.user.id,
            pickupLocation: input.pickupLocation,
            deliveryLocation: input.deliveryLocation,
            description: input.description || undefined,
            value: input.value ? (input.value as unknown as string) : null,
            status: "pending",
            telegramNotified: 0,
          });

          if (!result) {
            throw new Error("Failed to create order");
          }

          // Enviar notificação para o Telegram
          const orderId = (result as any).insertId || 0;
          const message = formatOrderNotification({
            id: orderId,
            pickupLocation: input.pickupLocation,
            deliveryLocation: input.deliveryLocation,
            description: input.description,
            value: input.value,
          });

          const telegramSent = await sendTelegramNotification(message);

          // Marcar como notificado se enviado com sucesso
          if (telegramSent && orderId) {
            await markOrderAsNotified(orderId);
          }

          return {
            success: true,
            orderId,
            telegramNotified: telegramSent,
          };
        } catch (error) {
          console.error("[Orders] Error creating order:", error);
          throw error;
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
