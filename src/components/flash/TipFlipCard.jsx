"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { tapScale } from "@/lib/motion";

export default function TipFlipCard({ tip, onDone }) {
  const [flipped, setFlipped] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <div className="card-base p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-400">Dica do dia</p>
          <p className="mt-2 text-lg font-semibold text-slate-800">{tip}</p>
        </div>
        <button
          type="button"
          onClick={() => setFlipped((prev) => !prev)}
          className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 focus-ring"
        >
          {flipped ? "Voltar" : "Ver mais"}
        </button>
      </div>
      <motion.div
        className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600"
        animate={{ opacity: flipped ? 1 : 0, height: flipped ? "auto" : 0 }}
        style={{ overflow: "hidden" }}
        transition={{ duration: reducedMotion ? 0 : 0.2 }}
      >
        Faça esse cuidado com calma. Pequenos passos deixam o dia mais leve.
      </motion.div>
      <motion.button
        type="button"
        onClick={onDone}
        className="mt-4 w-full rounded-full bg-emerald-500 px-4 py-3 text-base font-semibold text-white focus-ring"
        {...tapScale}
      >
        Fiz ✅
      </motion.button>
    </div>
  );
}
