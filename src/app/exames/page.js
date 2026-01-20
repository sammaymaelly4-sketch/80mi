"use client";

import ExamRemindersRotator from "@/components/exams/ExamRemindersRotator";
import AllOkList from "@/components/exams/AllOkList";
import examAlertData from "@/data/exams/julio_alert_cards.json";
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

      <ExamRemindersRotator mode="carousel" />

      <AllOkList title={examAlertData.all_ok_section.title} items={examAlertData.all_ok_section.items} />

      <p className="card-base p-5 text-sm text-slate-600">{examAlertData.display_rules.final_human_message}</p>

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
