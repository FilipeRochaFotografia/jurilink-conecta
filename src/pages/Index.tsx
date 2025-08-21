import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

import CTAButton from "@/components/landing/CTAButton";
import LeadCaptureDialog from "@/components/landing/LeadCaptureDialog";
import FloatingShapes from "@/components/landing/FloatingShapes";
import PhoneMockup from "@/components/landing/PhoneMockup";
import { EnhancedCard } from "@/components/landing/EnhancedCard";
import { AnimatedSection } from "@/components/landing/AnimatedSection";
import { SectionContainer } from "@/components/landing/SectionContainer";
import { TestimonialSection } from "@/components/landing/TestimonialSection";
import { CheckCircle2, MessageSquare, Bot, FileText, AlertTriangle, TrendingDown, DollarSign, X, Star, Zap, Clock, Users, Sparkles } from "lucide-react";

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
  const [leadOpen, setLeadOpen] = useState(false);

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

      <header className="relative border-b bg-white">
        <FloatingShapes />

        {/* Hero */}
        <main>
          <section className="container mx-auto grid min-h-[92vh] grid-cols-1 items-center gap-4 py-6 md:grid-cols-2">
            {/* Left content */}
            <div className="order-1 md:order-1 text-center md:text-left">
              {/* Mobile logo above title */}
              <motion.img
                src="/logo.png"
                alt="True Rise"
                className="mx-auto md:mx-0 mb-3 h-10 md:h-8"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
              />
              <motion.h1
                className="text-5xl md:text-6xl font-bold tracking-[-0.02em] leading-[1.02]"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
              >
                IA Jurídica
              </motion.h1>
              <motion.p
                className="mt-4 text-lg text-muted-foreground md:text-xl"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.1 }}
              >
                Seu escritório de Advocacia atendendo 24h com conhecimento personalizado
              </motion.p>

              <motion.div
                className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-muted-foreground"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.3 }}
                aria-label="Provas de segurança e rapidez"
              >
                <span>🔒 Dados protegidos</span>
                <span className="hidden md:inline">•</span>
                <span>⚡ Ativa em 48h</span>
                <span className="hidden md:inline">•</span>
                <span>🏆 IA Humanizada</span>
              </motion.div>

              {/* Desktop/Tablet CTA */}
              <motion.div
                className="hidden md:flex justify-start mt-6"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.4 }}
              >
                <CTAButton className="h-12 px-8 text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => setLeadOpen(true)}>
                  Quero uma atendente com IA
                </CTAButton>
              </motion.div>
            </div>

            {/* Right mockup */}
            <motion.div
              className="order-2 md:order-2 md:justify-self-end mt-2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease }}
            >
              <PhoneMockup />
            </motion.div>

            {/* Mobile CTA under mockup */}
            <div className="order-3 md:hidden flex justify-center mt-2">
              <CTAButton className="h-12 px-6 text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => setLeadOpen(true)}>
                Quero uma atendente com IA
              </CTAButton>
            </div>
          </section>
        </main>
      </header>

      {/* Problem Section */}
      <SectionContainer id="problema" background="secondary">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center md:text-left">
            Enquanto você lê isso...
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-center md:text-left max-w-2xl">
            Seu escritório está perdendo oportunidades valiosas a cada minuto
          </p>
        </AnimatedSection>
        
        <div className="mt-8 md:mt-12 grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3">
          <AnimatedSection delay={0.1}>
            <EnhancedCard 
              icon={<AlertTriangle className="h-6 w-6 text-red-500" />}
              className="shadow-lg hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/40"
            >
              <div className="space-y-2">
                <div id="counter-3" className="text-2xl font-bold text-red-600">
                  {counter3}
                </div>
                <p className="text-base font-medium">
                  clientes mandaram mensagem e desistiram
                </p>
                <p className="text-sm text-muted-foreground">
                  Por falta de resposta imediata
                </p>
              </div>
            </EnhancedCard>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <EnhancedCard 
              icon={<TrendingDown className="h-6 w-6 text-red-500" />}
              className="shadow-lg hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/40"
            >
              <div className="space-y-2">
                <div className="text-2xl font-bold text-red-600">
                  Agora
                </div>
                <p className="text-base font-medium">
                  Seu concorrente respondeu na hora
                </p>
                <p className="text-sm text-muted-foreground">
                  E conquistou o cliente
                </p>
              </div>
            </EnhancedCard>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <EnhancedCard 
              icon={<DollarSign className="h-6 w-6 text-red-500" />}
              className="shadow-lg hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/40"
            >
              <div className="space-y-2">
                <div id="counter-15000" className="text-2xl font-bold text-red-600">
                  {formatCurrencyBRL(counter15000)}
                </div>
                <p className="text-base font-medium">
                  em honorários perdidos este mês
                </p>
                <p className="text-sm text-muted-foreground">
                  Valor que poderia estar no seu caixa
                </p>
              </div>
            </EnhancedCard>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.4} className="mt-8">
          <div className="text-center">
            <div className="mt-4 block md:hidden">
              <span className="text-3xl">⏰</span>
            </div>
            <p className="text-base text-muted-foreground italic block md:hidden">
              A cada hora que passa
            </p>
            <p className="text-base text-muted-foreground italic block md:hidden">
              mais oportunidades são perdidas
            </p>
            <p className="text-base text-muted-foreground italic hidden md:flex items-center justify-center">
              <span className="text-3xl mr-2">⏰</span> A cada hora que passa, mais oportunidades são perdidas
            </p>
          </div>
        </AnimatedSection>
      </SectionContainer>

      {/* Solution Section */}
      <SectionContainer id="como-funciona">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center md:text-left">
            Como funciona na prática
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-center md:text-left max-w-2xl">
            Processo simples e automatizado que transforma seu atendimento
          </p>
        </AnimatedSection>
        
        <div className="mt-8 md:mt-12 relative">
          {/* Process Flow Indicators */}
          <div className="hidden md:block absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
            <div className="flex justify-between items-center px-12">
              <motion.div 
                className="w-16 h-0.5 bg-gradient-to-r from-primary to-primary/60"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
              <motion.div 
                className="w-16 h-0.5 bg-gradient-to-r from-primary/60 to-primary"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
            </div>
          </div>

          <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-4 relative">
            <AnimatedSection delay={0.1}>
              <EnhancedCard 
                icon={<MessageSquare className="h-12 w-12 text-primary mx-auto" />}
                className="text-center relative group border-primary/20 hover:border-primary/40 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute top-4 right-4 text-xs font-bold text-primary/60 bg-primary/10 px-2 py-1 rounded-full">
                  1
                </div>
                <div className="space-y-3 pt-2">
                  <h3 className="text-lg md:text-xl font-bold">Cliente manda mensagem</h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Direto no WhatsApp do seu escritório, a qualquer hora do dia
                  </p>
                  <div className="text-xs text-primary font-medium bg-primary/5 px-3 py-1 rounded-full inline-block">
                    ⚡ Instantâneo
                  </div>
                </div>
              </EnhancedCard>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <EnhancedCard 
                icon={<Bot className="h-12 w-12 text-primary mx-auto" />}
                className="text-center relative group border-primary/20 hover:border-primary/40 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute top-4 right-4 text-xs font-bold text-primary/60 bg-primary/10 px-2 py-1 rounded-full">
                  2
                </div>
                <div className="space-y-3 pt-2">
                  <h3 className="text-lg md:text-xl font-bold">IA responde em segundos</h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Com conhecimento jurídico especializado e personalizado
                  </p>
                  <div className="text-xs text-primary font-medium bg-primary/5 px-3 py-1 rounded-full inline-block">
                    🧠 Inteligente
                  </div>
                </div>
              </EnhancedCard>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <EnhancedCard 
                icon={<Calendar className="h-12 w-12 text-primary mx-auto" />}
                className="text-center relative group border-primary/20 hover:border-primary/40 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute top-4 right-4 text-xs font-bold text-primary/60 bg-primary/10 px-2 py-1 rounded-full">
                  3
                </div>
                <div className="space-y-3 pt-2">
                  <h3 className="text-lg md:text-xl font-bold">IA faz a marcação</h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Marca no Google Calendar e prepara um resumo da conversa
                  </p>
                  <div className="text-xs text-primary font-medium bg-primary/5 px-3 py-1 rounded-full inline-block">
                    📅 Organizado
                  </div>
                </div>
              </EnhancedCard>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <EnhancedCard 
                icon={<FileText className="h-12 w-12 text-primary mx-auto" />}
                className="text-center relative group border-primary/20 hover:border-primary/40 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute top-4 right-4 text-xs font-bold text-primary/60 bg-primary/10 px-2 py-1 rounded-full">
                  4
                </div>
                <div className="space-y-3 pt-2">
                  <h3 className="text-lg md:text-xl font-bold">Você recebe o resumo</h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Preparado e organizado para a consulta agendada
                  </p>
                  <div className="text-xs text-primary font-medium bg-primary/5 px-3 py-1 rounded-full inline-block">
                    📄 Detalhado
                  </div>
                </div>
              </EnhancedCard>
            </AnimatedSection>
          </div>
        </div>

        <AnimatedSection delay={0.7} className="mt-12">
          <div className="text-center">
            <CTAButton 
              className="h-12 px-8 text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300" 
              onClick={() => setLeadOpen(true)}
            >
              Quero implementar também
            </CTAButton>
          </div>
        </AnimatedSection>
      </SectionContainer>

      {/* Trust Section */}
      <TestimonialSection />


      {/* Pricing Section */}
      <SectionContainer id="precos" background="secondary">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            Quanto custa perder clientes?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-center max-w-2xl mx-auto">
            Compare os custos e veja o retorno imediato do seu investimento
          </p>
        </AnimatedSection>

        <div className="mt-8 md:mt-12 grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Traditional Option */}
          <AnimatedSection delay={0.1}>
            <EnhancedCard className="relative border-red-200 bg-gradient-to-br from-red-50 to-red-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
              {/* Negative Badge */}
              <div className="absolute -top-3 left-6 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                CARO & LIMITADO
              </div>
              
              <div className="p-6 space-y-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <X className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-red-800">Atendente Tradicional</h3>
                  <p className="text-red-600 mt-1 text-xs md:text-sm">Solução antiga e custosa</p>
                </div>

                <div className="space-y-3">
                  <div className="text-center">
                    <div className="w-16 h-0.5 bg-red-600 mx-auto" />
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-700">R$ 2.500</div>
                    <div className="text-xs text-red-600">por mês + encargos</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-red-700">
                      <X className="w-3 h-3 flex-shrink-0" />
                      <span className="text-xs">Só funciona em horário comercial</span>
                    </div>
                    <div className="flex items-center gap-2 text-red-700">
                      <X className="w-3 h-3 flex-shrink-0" />
                      <span className="text-xs">Férias, 13º salário, FGTS</span>
                    </div>
                    <div className="flex items-center gap-2 text-red-700">
                      <X className="w-3 h-3 flex-shrink-0" />
                      <span className="text-xs">Pode faltar ou sair da empresa</span>
                    </div>
                    <div className="flex items-center gap-2 text-red-700">
                      <X className="w-3 h-3 flex-shrink-0" />
                      <span className="text-xs">Conhecimento limitado</span>
                    </div>
                  </div>

                  <div className="bg-red-100 p-3 rounded-lg border border-red-200">
                    <div className="text-center">
                      <div className="text-sm font-bold text-red-800">Custo Real Anual</div>
                      <div className="text-xl font-bold text-red-700">R$ 40.000+</div>
                      <div className="text-xs text-red-600">Incluindo todos os encargos</div>
                    </div>
                  </div>
                </div>
              </div>
            </EnhancedCard>
          </AnimatedSection>

          {/* AI Solution */}
          <AnimatedSection delay={0.2}>
            <EnhancedCard className="relative border-green-200 bg-gradient-to-br from-green-50 to-green-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
              {/* Recommended Badge */}
              <div className="absolute -top-3 left-6 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <Star className="w-3 h-3" />
                RECOMENDADO
              </div>
              
              <div className="p-6 space-y-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-green-800">IA Jurídica True Rise</h3>
                  <p className="text-green-600 mt-1 text-xs md:text-sm">Solução inteligente e econômica</p>
                </div>

                <div className="space-y-3">
                  <div className="text-center">
                    <div className="w-16 h-0.5 bg-green-600 mx-auto" />
                  </div>

                  <div className="text-center">
                    <p className="text-base font-bold text-green-800">Muito mais benefícios<br />por uma fração do custo</p>
                  </div>

                  <div className="space-y-2 text-left">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-xs text-green-700 whitespace-nowrap">Atendimento 24h, 7 dias por semana</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-xs text-green-700 whitespace-nowrap">Sem férias, sem faltas, sem encargos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-xs text-green-700 whitespace-nowrap">Sempre disponível e atualizada</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-xs text-green-700 whitespace-nowrap">Conhecimento jurídico especializado</span>
                    </div>
                  </div>

                  <div className="bg-green-100 p-3 rounded-lg border border-green-200">
                    <div className="text-center">
                      <div className="text-sm font-bold text-green-800">Economia Real Anual</div>
                      <div className="text-xl font-bold text-green-600">Até 80% menos</div>
                      <div className="text-xs text-green-600">Veja quanto pode economizar</div>
                    </div>
                  </div>
                </div>
              </div>
            </EnhancedCard>
          </AnimatedSection>
        </div>

        {/* Small CTA Button */}
        <div className="mt-8 flex justify-center">
          <CTAButton className="h-12 px-8 text-lg font-bold shadow-md hover:shadow-lg transition-all duration-300" onClick={() => setLeadOpen(true)}>
            Solicite sua demonstração
          </CTAButton>
        </div>
      </SectionContainer>

      {/* Final CTA */}
      <SectionContainer id="cta">
        <div className="relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 md:top-8 left-4 md:left-8 text-2xl md:text-4xl text-primary">✨</div>
            <div className="absolute top-8 md:top-16 right-6 md:right-12 text-xl md:text-2xl text-primary">⚡</div>
            <div className="absolute bottom-6 md:bottom-12 left-8 md:left-16 text-2xl md:text-3xl text-primary">🚀</div>
            <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 text-2xl md:text-4xl text-primary">💎</div>
          </div>

          <div className="relative z-10">
            <AnimatedSection>
              <div className="text-center space-y-4 md:space-y-6">
                {/* Urgency Badge */}
                <motion.div
                  className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease }}
                >
                  <Clock className="w-3 md:w-4 h-3 md:h-4" />
                  ÚLTIMAS VAGAS DO MÊS
                </motion.div>

                <div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                    Vagas limitadas
                  </h2>
                  <p className="mt-3 md:mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4 md:px-0 text-center">
                    Abrimos apenas <span className="text-green-600 font-bold">20 vagas por mês</span> para garantir implementação perfeita
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Scarcity Indicators */}
            <AnimatedSection delay={0.2} className="mt-8 md:mt-12">
              <div className="grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <Users className="h-8 w-8 text-red-500" />
                  </div>
                  <p className="text-2xl font-bold text-red-600">5</p>
                  <p className="text-sm text-muted-foreground">vagas já preenchidas na semana</p>
                </div>
                
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                    <Clock className="h-8 w-8 text-orange-500" />
                  </div>
                  <p className="text-2xl font-bold text-orange-600">0</p>
                  <p className="text-sm text-muted-foreground">vagas restantes na semana</p>
                </div>
                
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Sparkles className="h-8 w-8 text-green-500" />
                  </div>
                  <p className="text-2xl font-bold text-green-600">2</p>
                  <p className="text-sm text-muted-foreground">escritórios na fila</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Main CTA */}
            <AnimatedSection delay={0.4} className="mt-8 md:mt-12">
              <div className="text-center space-y-4 md:space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease }}
                >
                  <CTAButton 
                    className="h-14 md:h-16 px-8 md:px-12 text-lg md:text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 w-full md:w-auto"
                    onClick={() => setLeadOpen(true)}
                  >
                    <span className="flex items-center justify-center gap-2 md:gap-3">
                      Quero entrar na fila de espera
                    </span>
                  </CTAButton>
                </motion.div>

                <div className="space-y-2 px-4 md:px-0">
                  <p className="text-xs md:text-sm text-muted-foreground">
                    ✅ Sem compromisso ✅ Demonstração personalizada incluída
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Trust Elements */}
            <AnimatedSection delay={0.6} className="mt-8 md:mt-12">
              <div className="bg-gray-50 rounded-2xl p-6 max-w-3xl mx-auto">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <h2 className="text-lg font-bold text-center">Por que limitamos as vagas?</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Implementação personalizada</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Treinamento completo da equipe</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Suporte dedicado 1:1</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Garantia de resultados</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </SectionContainer>

      {/* Footer */}
      <footer id="contato" className="border-t py-10">
        <div className="container mx-auto text-center">
          <p className="text-sm text-muted-foreground">© 2025 True Rise - Transformação Digital</p>
        </div>
      </footer>



      <LeadCaptureDialog open={leadOpen} onOpenChange={setLeadOpen} />
    </div>
  );
}