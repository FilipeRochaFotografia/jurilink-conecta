import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

export type ChatMessage = {
  id: number;
  from: "cliente" | "ia";
  text: string;
  delay: number; // ms before this message appears
};

const baseMessages: Omit<ChatMessage, "id">[] = [
  { from: "cliente", text: "Boa noite, preciso de ajuda com uma questão trabalhista", delay: 0 },
  { from: "typing" as any, text: "", delay: 800 },
  { from: "ia", text: "Boa noite! Sou a assistente jurídica do escritório Vaz & Coelho. Posso te ajudar com sua questão trabalhista. Pode me contar mais detalhes sobre o que aconteceu?", delay: 1400 },
  { from: "cliente", text: "Fui demitido sem justa causa após 3 anos...", delay: 900 },
  { from: "ia", text: "Entendo sua situação. Na demissão sem justa causa, você tem direito a: aviso prévio, 13º proporcional, férias vencidas + 1/3, saldo FGTS + multa 40%. Gostaria de agendar uma consulta com o Dr. Vaz?", delay: 1600 },
  { from: "cliente", text: "Sim, por favor", delay: 700 },
  { from: "ia", text: "Perfeito! Temos horários disponíveis amanhã às 10h ou 14h. Qual prefere?", delay: 1200 },
  { from: "ia", text: "Agendamento confirmado para amanhã às 14h. Você receberá um lembrete 1h antes.", delay: 1000 },
] as any;

function TypingBubble() {
  return (
    <div className="flex items-center gap-1 rounded-2xl bg-secondary px-3 py-2 w-fit">
      <span className="sr-only">Digitando…</span>
      <span className="h-2 w-2 rounded-full bg-foreground/40 animate-pulse" />
      <span className="h-2 w-2 rounded-full bg-foreground/40 animate-pulse [animation-delay:120ms]" />
      <span className="h-2 w-2 rounded-full bg-foreground/40 animate-pulse [animation-delay:240ms]" />
    </div>
  );
}

export default function WhatsAppChat() {
  const messages = useMemo<ChatMessage[]>(() => {
    return baseMessages.map((m, i) => ({ ...m, id: i })) as ChatMessage[];
  }, []);

  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reveal messages in sequence and loop ~20s
  useEffect(() => {
    let isMounted = true;
    let timeout: number | undefined;

    const step = () => {
      if (!isMounted) return;
      setIndex((prev) => {
        const next = prev + 1;
        if (next > messages.length) return 0; // reset
        return next;
      });
    };

    const scheduleNext = () => {
      const delay = 3000; // 3s por mensagem
      timeout = window.setTimeout(step, delay);
    };

    scheduleNext();
    return () => {
      isMounted = false;
      if (timeout) window.clearTimeout(timeout);
    };
  }, [index, messages]);

  useEffect(() => {
    // Auto-scroll to bottom when messages update
    const el = containerRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [index]);

  return (
    <div className="rounded-[2rem] border bg-card text-card-foreground shadow-sm overflow-hidden">
      <div className="relative h-10 bg-foreground/5">
        {/* Notch / speaker */}
        <div className="absolute left-1/2 top-1/2 h-4 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/20" />
      </div>
      <div
        ref={containerRef}
        className="h-[520px] w-full overflow-y-auto bg-secondary px-3 py-4"
        aria-live="polite"
        aria-label="Simulação de conversa no WhatsApp"
      >
        <div className="mx-auto flex max-w-xs flex-col gap-3">
          {messages.slice(0, index).map((m) => {
            if ((m as any).from === "typing") {
              return (
                <div key={`t-${m.id}`} className="flex justify-start">
                  <TypingBubble />
                </div>
              );
            }
            const isIA = m.from === "ia";
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={`flex ${isIA ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm ${
                    isIA
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-foreground border"
                  }`}
                >
                  {m.text}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
