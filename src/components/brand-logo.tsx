import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function BrandLogo({ className }: Props) {
  return (
    <div className={cn("flex items-center gap-1.5 sm:gap-2", className)}>
      <motion.div
        className="relative h-7 w-7 sm:h-8 sm:w-8 overflow-hidden rounded-lg sm:rounded-xl shadow-sm"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <Image
          src="/icons/logo.png"
          alt="NexaUI Logo"
          fill
          className="object-cover"
          priority
        />
      </motion.div>
      <span className="text-lg font-bold tracking-tight text-black dark:text-zinc-50">
        Nexa UI
      </span>
    </div>
  );
}
