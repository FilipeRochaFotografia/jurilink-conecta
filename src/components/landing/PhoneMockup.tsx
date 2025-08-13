import { motion } from "framer-motion";
import WhatsAppChat from "./WhatsAppChat";

export default function PhoneMockup() {
  return (
    <motion.div
      className="mx-auto w-[280px] md:w-[320px]"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <div className="relative rounded-[2.5rem] border bg-card p-1.5 shadow-xl">
        <WhatsAppChat />
        <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] ring-1 ring-foreground/10" />
      </div>
    </motion.div>
  );
}
