import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import CTAButton from "@/components/landing/CTAButton";
import PhoneMockup from "@/components/landing/PhoneMockup";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageSquare, Bot, FileText } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

function formatCurrencyBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function useInViewCounter(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    let raf = 0;
    const animate = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      setValue(Math.round(p * target));
      if (p < 1) raf = requestAnimationFrame(animate);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          raf = requestAnimationFrame(animate);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    const el = document.getElementById(`counter-${target}`);
    if (el) io.observe(el);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

export default function Index() {
  const [showSticky, setShowSticky] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 480);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const counter3 = useInViewCounter(3);
  const counter15000 = useInViewCounter(15000);

  return (
    <div>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: 'IA Jurídica True Rise',
          description: 'Automação de atendimento jurídico 24h no WhatsApp com conformidade LGPD.',
          brand: { '@type': 'Brand', name: 'True Rise' },
          offers: { '@type': 'Offer', price: '500.00', priceCurrency: 'BRL' }
        })
      }} />

      <header className="hero-bg border-b">
        <nav className="container mx-auto flex items-center justify-between py-4" aria-label="Navegação principal">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary" aria-hidden />
            <span className="text-sm font-semibold tracking-wide">True Rise</span>
          </div>
          <div className="hidden gap-6 md:flex">
            <a href="#como-funciona" className="text-sm text-muted-foreground hover:text-foreground story-link">Como funciona</a>
            <a href="#seguranca" className="text-sm text-muted-foreground hover:text-foreground story-link">Segurança</a>
            <a href="#precos" className="text-sm text-muted-foreground hover:text-foreground story-link">Preços</a>
            <a href="#contato" className="text-sm text-muted-foreground hover:text-foreground story-link">Contato</a>
          </div>
          <div className="hidden md:block">
            <a href="#cta">
              <Button variant="outline">Entrar na Lista</Button>
            </a>
          </div>
        </nav>

        {/* Hero */}
        <main>
          <section className="container mx-auto grid min-h-[92vh] grid-cols-1 items-center gap-12 py-10 md:grid-cols-2">
            {/* Left content */}
            <div className="order-2 md:order-1">
              <motion.h1
                className="text-4xl font-bold leading-tight md:text-5xl"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
              >
                IA Jurídica True Rise
              </motion.h1>
              <motion.p
                className="mt-4 text-lg text-muted-foreground md:text-xl"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.1 }}
              >
                Seu escritório atendendo 24h no WhatsApp
              </motion.p>

              <motion.div
                className="mt-8 flex flex-wrap items-center gap-4"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.2 }}
              >
                <CTAButton className="h-12 px-6 text-base">
                  Entrar na Lista de Espera
                </CTAButton>
                <a href="#como-funciona" className="text-sm story-link">Ver como funciona</a>
              </motion.div>

              <motion.div
                className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted-foreground"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.3 }}
                aria-label="Provas de segurança e rapidez"
              >
                <span>🔒 Dados protegidos</span>
                <span>•</span>
                <span>⚡ Ativa em 48h</span>
                <span>•</span>
                <span>🏆 Tecnologia premiada</span>
              </motion.div>
            </div>

            {/* Right mockup */}
            <motion.div
              className="order-1 md:order-2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease }}
            >
              <PhoneMockup />
            </motion.div>
          </section>
        </main>
      </header>

      {/* Problem Section */}
      <section id="problema" className="bg-secondary py-16">
        <div className="container mx-auto">
          <motion.h2 className="text-2xl font-semibold" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }}>
            Enquanto você lê isso...
          </motion.h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <motion.div className="rounded-lg border bg-background p-6" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }}>
              <p id="counter-3" className="text-lg"><span className="font-bold">❌ {counter3}</span> clientes mandaram mensagem e desistiram</p>
            </motion.div>
            <motion.div className="rounded-lg border bg-background p-6" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease, delay: 0.05 }}>
              <p className="text-lg">❌ Seu concorrente respondeu na hora</p>
            </motion.div>
            <motion.div className="rounded-lg border bg-background p-6" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease, delay: 0.1 }}>
              <p id="counter-15000" className="text-lg"><span className="font-bold">❌ {formatCurrencyBRL(counter15000)}</span> em honorários perdidos este mês</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="como-funciona" className="py-20">
        <div className="container mx-auto">
          <motion.h2 className="text-2xl font-semibold" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }}>
            Como funciona na prática
          </motion.h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <motion.div className="rounded-xl border bg-background p-6 shadow-sm hover-scale" whileHover={{ y: -2 }}>
              <MessageSquare className="mb-3 h-6 w-6 text-primary" aria-hidden />
              <h3 className="font-semibold">Cliente manda mensagem</h3>
              <p className="mt-2 text-sm text-muted-foreground">Direto no WhatsApp do seu escritório</p>
            </motion.div>
            <motion.div className="rounded-xl border bg-background p-6 shadow-sm hover-scale" whileHover={{ y: -2 }}>
              <Bot className="mb-3 h-6 w-6 text-primary" aria-hidden />
              <h3 className="font-semibold">IA responde NA HORA</h3>
              <p className="mt-2 text-sm text-muted-foreground">Com conhecimento jurídico especializado</p>
            </motion.div>
            <motion.div className="rounded-xl border bg-background p-6 shadow-sm hover-scale" whileHover={{ y: -2 }}>
              <FileText className="mb-3 h-6 w-6 text-primary" aria-hidden />
              <h3 className="font-semibold">Você recebe o resumo</h3>
              <p className="mt-2 text-sm text-muted-foreground">Preparado para a consulta agendada</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section id="depoimentos" className="bg-secondary py-20">
        <div className="container mx-auto">
          <motion.blockquote
            className="mx-auto max-w-3xl rounded-xl border bg-background p-8 shadow-sm"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
          >
            <p className="text-lg md:text-xl">
              “Achei que ia perder o toque pessoal. Mas agora tenho MAIS tempo para dar atenção real aos clientes nas consultas. Recuperamos 47 horas por mês.”
            </p>
            <footer className="mt-4 text-sm text-muted-foreground">— Dr. João Coelho, Vaz & Coelho Advogados</footer>
          </motion.blockquote>
        </div>
      </section>

      {/* Security Section */}
      <section id="seguranca" className="py-20">
        <div className="container mx-auto">
          <motion.h2 className="text-2xl font-semibold" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }}>
            Segurança em primeiro lugar
          </motion.h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border bg-background p-6">
              <p>🔐 Dados criptografados ponta a ponta</p>
            </div>
            <div className="rounded-lg border bg-background p-6">
              <p>📋 Conformidade total com LGPD</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precos" className="bg-secondary py-20">
        <div className="container mx-auto">
          <motion.h2 className="text-2xl font-semibold" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }}>
            Quanto custa perder clientes?
          </motion.h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border bg-background p-6">
              <p className="flex items-start gap-2"><span>❌</span> <span>Atendente: R$ 2.500/mês + encargos + férias</span></p>
            </div>
            <div className="rounded-xl border bg-background p-6">
              <p className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-5 w-5 text-accent" aria-hidden /> <span>Sua IA Jurídica: R$ 500/mês</span></p>
              <p className="mt-2 text-xs text-muted-foreground">Implementação única de R$ 2.500</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="cta" className="py-20">
        <div className="container mx-auto text-center">
          <motion.h2 className="text-3xl font-semibold" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }}>
            Vagas limitadas
          </motion.h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">Abrimos apenas 20 vagas por mês para garantir implementação perfeita</p>
          <div className="mt-8 flex justify-center">
            <CTAButton className="h-12 px-8 text-base">Garantir Minha Vaga</CTAButton>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Sem compromisso. Demonstração personalizada incluída.</p>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="border-t py-10">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">© 2025 True Rise - Transformação Digital com IA</p>
            <nav className="flex flex-wrap items-center gap-4 text-sm" aria-label="Links do rodapé">
              <a href="#" className="text-muted-foreground hover:text-foreground">Termos de Uso</a>
              <span className="text-muted-foreground">|</span>
              <a href="#" className="text-muted-foreground hover:text-foreground">Política de Privacidade</a>
              <span className="text-muted-foreground">|</span>
              <a href="#" className="text-muted-foreground hover:text-foreground">Contato</a>
              <span className="text-muted-foreground">|</span>
              <span className="text-muted-foreground">WhatsApp: (11) 99999-9999</span>
            </nav>
          </div>
        </div>
      </footer>

      {/* Sticky CTA (mobile) */}
      {showSticky && (
        <div className="fixed inset-x-0 bottom-0 z-50 block border-t bg-background/95 p-3 backdrop-blur md:hidden">
          <div className="container mx-auto">
            <CTAButton className="h-12 w-full">Garantir Minha Vaga</CTAButton>
          </div>
        </div>
      )}
    </div>
  );
}
