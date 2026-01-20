"use client";

import { useEffect, useState } from "react";
import ActionCardPremium from "@/components/flash/ActionCardPremium";
import { softFeedback } from "@/lib/feedback";
import { getStorageItem, setStorageItem, updateStreakIfNeeded } from "@/lib/storage";

const schedule = [
  { id: "08:00", time: "08:00", name: "Medicamento A", dose: "1 comprimido" },
  { id: "12:00", time: "12:00", name: "Vitamina D", dose: "1 cápsula" },
  { id: "20:00", time: "20:00", name: "Medicamento B", dose: "1 comprimido" }
];

export default function RemediosPage() {
  const [completedIds, setCompletedIds] = useState([]);

  useEffect(() => {
    setCompletedIds(getStorageItem("medsTodos", []));
  }, []);

  const handleComplete = (id) => {
    if (completedIds.includes(id)) return;
    const next = [...completedIds, id];
    setCompletedIds(next);
    setStorageItem("medsTodos", next);
    softFeedback();
    updateStreakIfNeeded();
  };

  const pending = schedule.filter((item) => !completedIds.includes(item.id));
  const completed = schedule.filter((item) => completedIds.includes(item.id));

  return (
    <main className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Remédios</h1>
        <p className="text-sm text-slate-500">Seus horários do dia.</p>
      </header>

      <section className="space-y-3">
        {pending.map((item) => (
          <div key={item.id} className="space-y-2">
            <ActionCardPremium
              title={`${item.time} • ${item.name}`}
              subtitle={item.dose}
              icon="💊"
              actionLabel="TOMEI ✅"
              done={false}
              onAction={() => handleComplete(item.id)}
            />
            <button
              type="button"
              className="ml-4 text-sm font-semibold text-brand-600"
            >
              Lembrar em 10 min
            </button>
          </div>
        ))}
        {pending.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
            Tudo tomado por aqui. Bom trabalho!
          </div>
        )}
      </section>

      {completed.length > 0 && (
        <section className="space-y-3">
          <p className="text-sm font-semibold text-slate-500">Concluídos</p>
          {completed.map((item) => (
            <ActionCardPremium
              key={item.id}
              title={`${item.time} • ${item.name}`}
              subtitle={item.dose}
              icon="✅"
              done
              actionLabel=""
              collapsible={false}
            />
          ))}
        </section>
      )}
    </main>
  );
}
