"use client";

import { motion, useReducedMotion } from "framer-motion";
import { springPreset, tapScale } from "@/lib/motion";

export default function FlashCard({ title, subtitle, icon, onClick, actionLabel }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="card-base w-full text-left p-5 flex items-center gap-4 focus-ring"
      transition={springPreset(reducedMotion)}
      {...tapScale}
    >
      <span className="text-3xl" aria-hidden="true">
        {icon}
      </span>
      <span className="flex-1">
        <span className="block text-lg font-semibold">{title}</span>
        {subtitle && <span className="block text-sm text-slate-500">{subtitle}</span>}
        {actionLabel && (
          <span className="mt-3 inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-sm text-brand-700">
            {actionLabel}
          </span>
        )}
      </span>
    </motion.button>
  );
}
