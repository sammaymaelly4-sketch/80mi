"use client";

import FlashCard from "@/components/flash/FlashCard";

const exams = [
  { type: "Sangue", date: "10/01" },
  { type: "Urina", date: "10/01" },
  { type: "ECG", date: "02/12" }
];

export default function ExamesPage() {
  return (
    <main className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Exames</h1>
        <p className="text-sm text-slate-500">Resultados simples e organizados.</p>
      </header>

      <div className="space-y-3">
        {exams.map((exam, index) => (
          <FlashCard
            key={index}
            title={exam.type}
            subtitle={`Data: ${exam.date}`}
            icon="🔬"
            actionLabel="Ver"
          />
        ))}
      </div>

      <div className="grid gap-3">
        <button
          type="button"
          className="w-full rounded-full bg-brand-500 px-4 py-3 text-base font-semibold text-white"
        >
          Adicionar exame
        </button>
        <button
          type="button"
          className="w-full rounded-full border border-slate-200 px-4 py-3 text-base font-semibold text-slate-600"
        >
          Analisar exame
        </button>
      </div>
    </main>
  );
}
