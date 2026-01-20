"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export default function ExamsSplash({ active }) {
  const reducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-600 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.2 : 0.6 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.2 : 0.6 }}
            className="text-center"
          >
            <p className="text-sm uppercase tracking-wide">Abrindo</p>
            <h2 className="mt-2 text-3xl font-semibold">Exames</h2>
            <p className="mt-3 text-sm text-brand-100">Tudo organizado para você.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
