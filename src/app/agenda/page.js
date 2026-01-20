"use client";

import { useRouter } from "next/navigation";
import FlashCard from "@/components/flash/FlashCard";

export default function AgendaPage() {
  const router = useRouter();

  return (
    <main className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Agenda</h1>
        <p className="text-sm text-slate-500">Lembretes importantes do seu dia.</p>
      </header>
      <div className="space-y-4">
        <FlashCard
          title="Remédios"
          subtitle="Horários e doses"
          icon="💊"
          onClick={() => router.push("/agenda/remedios")}
        />
        <FlashCard
          title="Consultas"
          subtitle="Próximos horários"
          icon="🩺"
          onClick={() => router.push("/agenda/consultas")}
        />
      </div>
    </main>
  );
}
