"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { setStorageItem } from "@/lib/storage";
import { springPreset, tapScale } from "@/lib/motion";

const animationVariants = {
  gentle_pulse: {
    animate: { scale: [1, 1.06, 1] },
    transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
  },
  shrink_meter: {
    animate: { scaleX: [1, 0.9, 1] },
    transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
  },
  heart_fill: {
    animate: { scale: [1, 1.1, 1], opacity: [0.9, 1, 0.9] },
    transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
  },
  brain_glow_once: {
    animate: { scale: [1, 1.12, 1], opacity: [0.9, 1, 0.95] },
    transition: { duration: 1.2, repeat: 1 }
  },
  drop_shield: {
    animate: { y: [0, -4, 0], opacity: [0.9, 1, 0.95] },
    transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
  }
};

const defaultCtaStyle =
  "rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600";

const primaryCtaStyle =
  "rounded-full bg-brand-500 px-3 py-2 text-sm font-semibold text-white";

export default function ExamReminderCard({ card, onDismiss }) {
  const router = useRouter();
  const reducedMotion = useReducedMotion();

  const animation = useMemo(() => {
    if (reducedMotion) return {};
    return animationVariants[card.animation?.type] || {};
  }, [card.animation?.type, reducedMotion]);

  const handleCta = (cta) => {
    if (cta.type === "dismiss") {
      onDismiss?.(card.id);
      return;
    }

    if (cta.type === "navigate") {
      router.push(cta.to);
      return;
    }

    if (cta.type === "mark_done") {
      setStorageItem(`exam_card_done_${cta.done_key}`, { doneAt: new Date().toISOString() });
      return;
    }

    if (cta.type === "add_note") {
      setStorageItem(`exam_card_note_${card.id}`, {
        note: cta.note,
        target: cta.target,
        createdAt: new Date().toISOString()
      });
      router.push(cta.target);
      return;
    }

    if (cta.type === "open_sheet") {
      window.alert("Em breve teremos uma dica rápida aqui 💙");
    }
  };

  return (
    <motion.article
      className="card-base space-y-4 p-5"
      transition={springPreset(reducedMotion)}
      {...tapScale}
    >
      <div className="flex items-start gap-4">
        <motion.span
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-2xl"
          aria-hidden="true"
          {...animation}
        >
          {card.icon}
        </motion.span>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
            <span className="rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">
              alerta leve
            </span>
          </div>
          <p className="text-sm text-slate-600">{card.message}</p>
        </div>
      </div>

      <div className="rounded-2xl bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Seus valores</p>
        <div className="mt-2 grid gap-2">
          {card.values.map((value) => (
            <div key={value.name} className="flex items-center justify-between text-sm">
              <span className="text-slate-600">{value.name}</span>
              <span className="font-semibold text-slate-900">
                {value.value}
                {value.unit ? ` ${value.unit}` : ""}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3 text-sm text-slate-600">
        <p>
          <span className="font-semibold text-slate-900">O que é:</span> {card.what_is}
        </p>
        <p>
          <span className="font-semibold text-slate-900">Por que importa:</span> {card.why_matters}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 p-4">
        <p className="text-sm font-semibold text-slate-900">Ação simples hoje</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
          {card.how_to_improve.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-2">
        {card.cta.map((cta, index) => (
          <button
            key={`${cta.label}-${index}`}
            type="button"
            className={index === 0 ? primaryCtaStyle : defaultCtaStyle}
            onClick={() => handleCta(cta)}
          >
            {cta.label}
          </button>
        ))}
      </div>
    </motion.article>
  );
}
