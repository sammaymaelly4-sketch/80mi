"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { speak } from "@/lib/voice";

const NORMAL_DURATION_MS = 2200;
const REDUCED_DURATION_MS = 600;

const greetingByTime = [
  {
    start: 0,
    end: 11,
    text: "Bom dia",
    icon: "☀️",
    extra: "Vamos com calma."
  },
  {
    start: 12,
    end: 17,
    text: "Boa tarde",
    icon: "🌤️",
    extra: "Um passo de cada vez."
  },
  {
    start: 18,
    end: 23,
    text: "Boa noite",
    icon: "🌙",
    extra: "Hora de descansar com tranquilidade."
  }
];

const getGreetingForNow = (date = new Date()) => {
  const hour = date.getHours();
  return (
    greetingByTime.find((item) => hour >= item.start && hour <= item.end) || greetingByTime[0]
  );
};

export default function WelcomeSplash({ name = "Julio", onDone }) {
  const reducedMotion = useReducedMotion();
  const duration = reducedMotion ? REDUCED_DURATION_MS : NORMAL_DURATION_MS;
  const greeting = useMemo(() => getGreetingForNow(), []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      if (onDone) {
        onDone();
      }
    }, duration);

    return () => window.clearTimeout(timeout);
  }, [duration, onDone]);

  useEffect(() => {
    speak(`${greeting.text}, ${name}. Já já vemos seu dia.`);
  }, [greeting.text, name]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-white via-white to-amber-50 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0.2 : 0.5 }}
      role="status"
      aria-live="polite"
    >
      <div className="w-full max-w-sm space-y-6 text-center">
        <motion.div
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/80 text-4xl shadow-sm"
          initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reducedMotion ? 0.2 : 0.6, ease: "easeOut" }}
          aria-hidden="true"
        >
          {greeting.icon}
        </motion.div>

        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0.2 : 0.6, ease: "easeOut" }}
        >
          <p className="text-3xl font-semibold text-slate-900">
            {greeting.text}, {name}
          </p>
          <p className="text-xl text-slate-700">Já já vemos seu dia.</p>
          {greeting.extra ? (
            <p className="text-base text-slate-500">{greeting.extra}</p>
          ) : null}
        </motion.div>

        <div className="mx-auto h-2 w-56 overflow-hidden rounded-full bg-amber-100">
          <motion.div
            className="h-full rounded-full bg-amber-400"
            initial={{ width: 0 }}
            animate={{ width: "70%" }}
            transition={{
              duration: reducedMotion ? 0.3 : 1.4,
              ease: "easeOut"
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
