"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import ActionCardPremium from "@/components/flash/ActionCardPremium";
import { springPreset } from "@/lib/motion";

export default function PremiumTodoList({
  title,
  todos,
  completed,
  onComplete,
  emptyLabel = "Tudo certo por aqui."
}) {
  const reducedMotion = useReducedMotion();

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="space-y-3">
        <AnimatePresence>
          {todos.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500"
            >
              {emptyLabel}
            </motion.div>
          ) : (
            todos.map((item) => (
              <motion.div
                key={item.id}
                layout
                transition={springPreset(reducedMotion)}
              >
                <ActionCardPremium
                  title={item.title}
                  subtitle={item.subtitle}
                  icon={item.icon}
                  actionLabel={item.actionLabel}
                  done={false}
                  onAction={() => onComplete(item.id)}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
      <div className="space-y-3">
        {completed.length > 0 && (
          <p className="text-sm font-semibold text-slate-500">Concluídos</p>
        )}
        <AnimatePresence>
          {completed.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={springPreset(reducedMotion)}
            >
              <ActionCardPremium
                title={item.title}
                subtitle={item.subtitle}
                icon={item.icon}
                done
                actionLabel=""
                collapsible={false}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
