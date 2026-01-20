"use client";

import { useEffect, useState } from "react";
import ActionCardPremium from "@/components/flash/ActionCardPremium";
import { getStorageItem, setStorageItem } from "@/lib/storage";

const defaultConsultations = [
  { id: "quinta-10", date: "Quinta", time: "10:00", place: "Clínica X", doctor: "Dr(a). Y" }
];

const formatDateLabel = (value) => {
  if (!value) return "";
  if (!value.includes("-")) return value;
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
};

export default function ConsultasPage() {
  const [consultations, setConsultations] = useState(defaultConsultations);
  const [completedIds, setCompletedIds] = useState([]);
  const [form, setForm] = useState({ date: "", time: "", place: "", doctor: "" });

  useEffect(() => {
    setConsultations(getStorageItem("consultationsSchedule", defaultConsultations));
    setCompletedIds(getStorageItem("consultationsDone", []));
  }, []);

  useEffect(() => {
    setStorageItem("consultationsSchedule", consultations);
  }, [consultations]);

  const handleComplete = (id) => {
    if (completedIds.includes(id)) return;
    const next = [...completedIds, id];
    setCompletedIds(next);
    setStorageItem("consultationsDone", next);
  };

  const handleAdd = (event) => {
    event.preventDefault();
    if (!form.date || !form.time || !form.place || !form.doctor) return;
    const newItem = {
      id: `${form.date}-${form.time}-${Date.now()}`,
      date: form.date,
      time: form.time,
      place: form.place,
      doctor: form.doctor
    };
    setConsultations((prev) => [...prev, newItem]);
    setForm({ date: "", time: "", place: "", doctor: "" });
  };

  const pending = consultations.filter((item) => !completedIds.includes(item.id));
  const completed = consultations.filter((item) => completedIds.includes(item.id));

  return (
    <main className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Consultas</h1>
        <p className="text-sm text-slate-500">Cadastre data, horário e local.</p>
      </header>

      <section className="card-base space-y-4 p-5">
        <h2 className="text-lg font-semibold text-slate-900">Adicionar consulta</h2>
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={handleAdd}>
          <label className="space-y-1 text-sm text-slate-600">
            Data
            <input
              type="date"
              value={form.date}
              onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
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
          <label className="space-y-1 text-sm text-slate-600">
            Local
            <input
              type="text"
              value={form.place}
              onChange={(event) => setForm((prev) => ({ ...prev, place: event.target.value }))}
              placeholder="Ex: Clínica Central"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700"
            />
          </label>
          <label className="space-y-1 text-sm text-slate-600">
            Profissional
            <input
              type="text"
              value={form.doctor}
              onChange={(event) => setForm((prev) => ({ ...prev, doctor: event.target.value }))}
              placeholder="Ex: Dr(a). Silva"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700"
            />
          </label>
          <button
            type="submit"
            className="sm:col-span-2 rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white"
          >
            Salvar consulta
          </button>
        </form>
      </section>

      <section className="space-y-3">
        {pending.map((item) => (
          <ActionCardPremium
            key={item.id}
            title={`${formatDateLabel(item.date)} • ${item.time}`}
            subtitle={`${item.place} • ${item.doctor}`}
            icon="🩺"
            actionLabel="Marcar realizada"
            done={false}
            onAction={() => handleComplete(item.id)}
          />
        ))}
        {pending.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
            Nenhuma consulta pendente no momento.
          </div>
        )}
      </section>

      {completed.length > 0 && (
        <section className="space-y-3">
          <p className="text-sm font-semibold text-slate-500">Consultas realizadas</p>
          {completed.map((item) => (
            <ActionCardPremium
              key={item.id}
              title={`${formatDateLabel(item.date)} • ${item.time}`}
              subtitle={`${item.place} • ${item.doctor}`}
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
