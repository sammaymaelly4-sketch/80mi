"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { springPreset, tapScale } from "@/lib/motion";

export default function ActionCardPremium({
  title,
  subtitle,
  icon,
  actionLabel,
  done,
  onAction,
  collapsible = true
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      layout
      transition={springPreset(reducedMotion)}
      className="card-base p-5 flex items-center gap-4"
    >
      <span className="text-3xl" aria-hidden="true">
        {icon}
      </span>
      <div className="flex-1">
        <p className="text-lg font-semibold">{title}</p>
        {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
      </div>
      <div className="flex flex-col items-end gap-2">
        <AnimatePresence>
          {done && (
            <motion.span
              key="stamp"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={springPreset(reducedMotion)}
              className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700"
            >
              FEITO ✅
            </motion.span>
          )}
        </AnimatePresence>
        {!done && (
          <motion.button
            type="button"
            onClick={onAction}
            className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white focus-ring"
            {...tapScale}
          >
            {actionLabel}
          </motion.button>
        )}
        {done && !collapsible && (
          <span className="text-xs text-slate-400">Concluído</span>
        )}
      </div>
    </motion.div>
  );
}
