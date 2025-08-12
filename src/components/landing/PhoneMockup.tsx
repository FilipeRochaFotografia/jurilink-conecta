import WhatsAppChat from "./WhatsAppChat";

export default function PhoneMockup() {
  return (
    <div className="mx-auto w-[320px] md:w-[360px]">
      <div className="relative rounded-[2.5rem] border bg-card p-2 shadow-xl" aria-hidden>
        <WhatsAppChat />
        <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] ring-1 ring-foreground/10" />
      </div>
    </div>
  );
}
