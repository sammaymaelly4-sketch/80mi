"use client";

import ExamRemindersRotator from "@/components/exams/ExamRemindersRotator";
import AllOkList from "@/components/exams/AllOkList";
import examAlertData from "@/data/exams/julio_alert_cards.json";
import FlashCard from "@/components/flash/FlashCard";

const exams = [
  { type: "Sangue", date: "10/01", status: "Atenção", note: "Glicemia e rins" },
  { type: "Urina", date: "10/01", status: "Atenção", note: "Proteína presente" },
  { type: "ECG", date: "02/12", status: "Ok", note: "Sem alterações" }
];

export default function ExamesPage() {
  return (
    <main className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Exames</h1>
        <p className="text-sm text-slate-500">Resultados simples e organizados.</p>
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Resultados em destaque</h2>
        <div className="space-y-4">
          {examAlertData.cards.map((card) => (
            <article key={card.id} className="card-base space-y-4 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 text-xl">
                    {card.icon}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                    <p className="text-sm text-slate-600">{card.message}</p>
                  </div>
                </div>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                  atenção leve
                </span>
              </div>
              <div className="grid gap-2 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                {card.values.map((value) => (
                  <div key={value.name} className="flex items-center justify-between">
                    <span>{value.name}</span>
                    <span className="font-semibold text-slate-900">
                      {value.value}
                      {value.unit ? ` ${value.unit}` : ""}
                    </span>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm font-semibold text-slate-900">Como cuidar hoje</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                  {card.how_to_improve.slice(0, 3).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ExamRemindersRotator mode="carousel" />

      <AllOkList title={examAlertData.all_ok_section.title} items={examAlertData.all_ok_section.items} />

      <p className="card-base p-5 text-sm text-slate-600">{examAlertData.display_rules.final_human_message}</p>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Histórico recente</h2>
        {exams.map((exam, index) => (
          <FlashCard
            key={index}
            title={`${exam.type} • ${exam.date}`}
            subtitle={exam.note}
            icon="🔬"
            actionLabel={exam.status}
          />
        ))}
      </section>

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
