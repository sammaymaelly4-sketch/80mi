// src/components/flash/ActionCardPremium.jsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { springPreset, tapScale, shouldReduceMotion, layoutTransition } from "@/lib/motion";

export default function ActionCardPremium({
  title,
  subtitle,
  icon,
  actionLabel,
  done,
  onAction,
  collapsible = true
}) {
  return (
    <motion.div
      layout={!shouldReduceMotion}
      transition={layoutTransition()}
      className="card-base p-5 flex items-center gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <span className="text-3xl flex-shrink-0" aria-hidden="true">
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-lg font-semibold truncate">{title}</p>
        {subtitle && <p className="text-sm text-slate-500 truncate">{subtitle}</p>}
      </div>
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <AnimatePresence mode="wait">
          {done && (
            <motion.span
              key="stamp"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 whitespace-nowrap"
            >
              FEITO ✅
            </motion.span>
          )}
        </AnimatePresence>
        {!done && actionLabel && (
          <motion.button
            type="button"
            onClick={onAction}
            className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white focus-ring whitespace-nowrap"
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
