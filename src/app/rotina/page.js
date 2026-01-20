"use client";

import { useRouter } from "next/navigation";
import FlashCard from "@/components/flash/FlashCard";

export default function RotinaPage() {
  const router = useRouter();

  return (
    <main className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Rotina</h1>
        <p className="text-sm text-slate-500">
          Sessão rotina com foco em alimentação e exercícios.
        </p>
      </header>
      <div className="space-y-4">
        <FlashCard
          title="Alimentação"
          subtitle="Cardápio e receitas rápidas"
          icon="🍽️"
          onClick={() => router.push("/rotina/alimentacao")}
        />
        <FlashCard
          title="Exercícios"
          subtitle="Movimentos seguros"
          icon="🏃‍♂️"
          onClick={() => router.push("/rotina/exercicios")}
        />
      </div>
    </main>
  );
}
