import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

export type ChatMessage = {
  id: number;
  from: "cliente" | "ia";
  text: string;
};

const baseMessages: Omit<ChatMessage, "id">[] = [
  { from: "cliente", text: "Boa noite, preciso de ajuda com uma questão trabalhista" },
  { from: "ia", text: "Boa noite! Sou a assistente jurídica do escritório Vaz & Coelho. Posso te ajudar com sua questão trabalhista. Pode me contar mais detalhes sobre o que aconteceu?" },
  { from: "cliente", text: "Fui demitido sem justa causa após 3 anos..." },
  { from: "ia", text: "Entendo sua situação. Na demissão sem justa causa, você tem direito a: aviso prévio, 13º proporcional, férias vencidas + 1/3, saldo FGTS + multa 40%. Gostaria de agendar uma consulta com o Dr. Vaz?" },
  { from: "cliente", text: "Sim, por favor" },
  { from: "ia", text: "Perfeito! Temos horários disponíveis amanhã às 10h ou 14h. Qual prefere?" },
  { from: "cliente", text: "14h seria ótimo" },
  { from: "ia", text: "✅ Consulta agendada! Amanhã, 14h com Dr. Vaz. Até amanhã!" },
  { from: "cliente", text: "Muito obrigado, até amanhã!" },
] as const;

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

  // Start with the first user message visible immediately
  const [index, setIndex] = useState(1);
  const [showTyping, setShowTyping] = useState(true); // typing indicator between messages
  const [typingFrom, setTypingFrom] = useState<"cliente" | "ia" | null>("ia");
  const containerRef = useRef<HTMLDivElement>(null);

  // Reveal messages every 4s and loop after a 20s pause when the conversation ends
  useEffect(() => {
    let isMounted = true;
    let timeout: number | undefined;

    const schedule = () => {
      const isFinished = index >= messages.length;
      if (isFinished) {
        // Wait 20s, then restart
        timeout = window.setTimeout(() => {
          if (!isMounted) return;
          setIndex(1);
          setShowTyping(true);
        }, 20000);
        return;
      }

      const next = messages[index];
      // Always show typing before both IA and cliente messages
      setTypingFrom(next.from);
      setShowTyping(true);
      timeout = window.setTimeout(() => {
        if (!isMounted) return;
        setShowTyping(false);
        setIndex((v) => v + 1);
      }, 4000);
    };

    schedule();
    return () => {
      isMounted = false;
      if (timeout) window.clearTimeout(timeout);
    };
  }, [index, messages.length]);

  useEffect(() => {
    // Auto-scroll to bottom when messages update
    const el = containerRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [index, showTyping]);

  return (
    <div className="rounded-[2rem] border bg-card text-card-foreground shadow-sm overflow-hidden">
      <div className="relative h-14 bg-foreground/5">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center gap-2 px-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-[11px] font-bold">V&amp;C</div>
          <div className="flex flex-col leading-none">
            <span className="text-[12px] font-semibold">Atendente | Vaz &amp; Coelho</span>
            <span className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-foreground/60">
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
              online agora
            </span>
          </div>
        </div>
      </div>
      <div
        ref={containerRef}
        className="h-[480px] md:h-[520px] w-full overflow-y-auto bg-secondary px-3 py-4"
        aria-live="polite"
        aria-label="Simulação de conversa no WhatsApp"
      >
        <div className="mx-auto flex max-w-xs flex-col gap-3">
          {messages.slice(0, index).map((m) => {
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
          {showTyping && (
            <div className={`flex ${typingFrom === 'ia' ? 'justify-start' : 'justify-end'}`}>
              <TypingBubble />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
