"use client";

import { useEffect, useState } from "react";
import ActionCardPremium from "@/components/flash/ActionCardPremium";
import { softFeedback } from "@/lib/feedback";
import { getStorageItem, setStorageItem, updateStreakIfNeeded } from "@/lib/storage";

const defaultSchedule = [
  { id: "08:00", time: "08:00", name: "Medicamento A", dose: "1 comprimido" },
  { id: "12:00", time: "12:00", name: "Vitamina D", dose: "1 cápsula" },
  { id: "20:00", time: "20:00", name: "Medicamento B", dose: "1 comprimido" }
];

export default function RemediosPage() {
  const [completedIds, setCompletedIds] = useState([]);
  const [schedule, setSchedule] = useState(defaultSchedule);
  const [form, setForm] = useState({ name: "", dose: "", time: "" });

  useEffect(() => {
    setCompletedIds(getStorageItem("medsTodos", []));
    setSchedule(getStorageItem("medsSchedule", defaultSchedule));
  }, []);

  useEffect(() => {
    setStorageItem("medsSchedule", schedule);
  }, [schedule]);

  const handleComplete = (id) => {
    if (completedIds.includes(id)) return;
    const next = [...completedIds, id];
    setCompletedIds(next);
    setStorageItem("medsTodos", next);
    softFeedback();
    updateStreakIfNeeded();
  };

  const handleAdd = (event) => {
    event.preventDefault();
    if (!form.name || !form.dose || !form.time) return;
    const newItem = {
      id: `${form.time}-${Date.now()}`,
      time: form.time,
      name: form.name,
      dose: form.dose
    };
    const next = [...schedule, newItem].sort((a, b) => a.time.localeCompare(b.time));
    setSchedule(next);
    setForm({ name: "", dose: "", time: "" });
  };

  const pending = schedule.filter((item) => !completedIds.includes(item.id));
  const completed = schedule.filter((item) => completedIds.includes(item.id));

  return (
    <main className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Remédios</h1>
        <p className="text-sm text-slate-500">Registre nome, dosagem e horário.</p>
      </header>

      <section className="card-base space-y-4 p-5">
        <h2 className="text-lg font-semibold text-slate-900">Adicionar remédio</h2>
        <form className="grid gap-3 sm:grid-cols-3" onSubmit={handleAdd}>
          <label className="space-y-1 text-sm text-slate-600">
            Remédio
            <input
              type="text"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              placeholder="Ex: Losartana"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700"
            />
          </label>
          <label className="space-y-1 text-sm text-slate-600">
            Dosagem
            <input
              type="text"
              value={form.dose}
              onChange={(event) => setForm((prev) => ({ ...prev, dose: event.target.value }))}
              placeholder="Ex: 50mg"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700"
            />
          </label>
          <label className="space-y-1 text-sm text-slate-600">
            Horário
            <input
              type="time"
              value={form.time}
              onChange={(event) => setForm((prev) => ({ ...prev, time: event.target.value }))}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700"
            />
          </label>
          <button
            type="submit"
            className="sm:col-span-3 rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white"
          >
            Salvar remédio
          </button>
        </form>
      </section>

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
