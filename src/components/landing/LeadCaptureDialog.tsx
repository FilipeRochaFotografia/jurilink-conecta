import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type LeadCaptureDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formspreeFormId?: string;
  useAirtableApi?: boolean;
};

export default function LeadCaptureDialog({ open, onOpenChange, formspreeFormId, useAirtableApi }: LeadCaptureDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formId = useMemo(() => {
    return (
      formspreeFormId || (import.meta.env.VITE_FORMSPREE_FORM_ID as string | undefined) || "YOUR_FORMSPREE_ID"
    );
  }, [formspreeFormId]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Honeypot: if filled, ignore
    if (formData.get("website")) return;

    const payload = {
      name: String(formData.get("name") || ""),
      businessName: String(formData.get("businessName") || ""),
      email: String(formData.get("email") || ""),
      whatsapp: String(formData.get("whatsapp") || ""),
      bestTimeToContact: String(formData.get("bestTimeToContact") || ""),
      page: typeof window !== "undefined" ? window.location.href : "",
    };

    try {
      setIsSubmitting(true);
      const res = await (async () => {
        if (useAirtableApi) {
          return fetch(`/api/airtable-lead`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        }
        if (!formId || formId === "YOUR_FORMSPREE_ID") {
          throw new Error("VITE_FORMSPREE_FORM_ID não configurado");
        }
        return fetch(`https://formspree.io/f/${formId}`, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      })();

      if (res.ok) {
        toast({ title: "Recebido!", description: "Entraremos em contato para agendar a demonstração." });
        onOpenChange(false);
      } else {
        const data = await res.json().catch(() => ({}));
        const msg = data?.errors?.[0]?.message || "Não foi possível enviar. Tente novamente.";
        toast({ title: "Erro no envio", description: msg, variant: "destructive" });
      }
    } catch (err: any) {
      toast({ title: "Erro", description: err?.message || "Verifique sua conexão e tente novamente.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Entrar na Lista de Espera</DialogTitle>
          <DialogDescription>
            Preencha seus dados e retornaremos com uma demonstração personalizada.
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

          <div className="grid gap-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input id="name" name="name" placeholder="Seu nome completo" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="businessName">Nome comercial</Label>
            <Input id="businessName" name="businessName" placeholder="Pessoal ou do Escritório" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" name="email" type="email" placeholder="voce@exemplo.com" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <Input id="whatsapp" name="whatsapp" placeholder="(11) 99999-9999" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="bestTimeToContact">Qual o melhor horário para ser contactado?</Label>
            <Input id="bestTimeToContact" name="bestTimeToContact" placeholder="Ex: Manhã (9h-12h), Tarde (14h-18h)" required />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar"}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Ao enviar, você concorda com nossa Política de Privacidade.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}


