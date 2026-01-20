"use client";

import FlashCard from "@/components/flash/FlashCard";

const consultations = [
  { date: "Quinta", time: "10:00", place: "Clínica X", doctor: "Dr(a). Y" }
];

export default function ConsultasPage() {
  return (
    <main className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Consultas</h1>
        <p className="text-sm text-slate-500">Seus próximos compromissos.</p>
      </header>

      <section className="space-y-3">
        {consultations.map((item, index) => (
          <FlashCard
            key={index}
            title={`${item.date} • ${item.time}`}
            subtitle={`${item.place} • ${item.doctor}`}
            icon="🩺"
            actionLabel="Adicionar alerta"
          />
        ))}
      </section>
    </main>
  );
}
