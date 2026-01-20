"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ActionCardPremium from "@/components/flash/ActionCardPremium";
import FlashCard from "@/components/flash/FlashCard";
import ProgressRingCard from "@/components/flash/ProgressRingCard";
import PremiumTodoList from "@/components/flash/PremiumTodoList";
import SnapCarousel from "@/components/flash/SnapCarousel";
import StreakPill from "@/components/flash/StreakPill";
import TipFlipCard from "@/components/flash/TipFlipCard";
import { softFeedback } from "@/lib/feedback";
import { getStorageItem, setStorageItem, getStreak, updateStreakIfNeeded } from "@/lib/storage";

const todosData = [
  {
    id: "remedio",
    title: "Tomar remédio da manhã",
    subtitle: "Lembrete principal",
    icon: "💊",
    actionLabel: "Feito"
  },
  {
    id: "agua",
    title: "Beber água",
    subtitle: "1 copo agora",
    icon: "💧",
    actionLabel: "Bebi"
  },
  {
    id: "exercicio",
    title: "Exercício leve",
    subtitle: "5 minutos",
    icon: "🏃‍♂️",
    actionLabel: "Concluí"
  }
];

const tips = [
  "Beber 1 copo de água agora.",
  "Tomar sol 10 min antes das 10h.",
  "Levantar e sentar 5 vezes na cadeira."
];

export default function HomePage() {
  const router = useRouter();
  const [completedIds, setCompletedIds] = useState([]);
  const [streakCount, setStreakCount] = useState(0);

  useEffect(() => {
    setCompletedIds(getStorageItem("homeTodos", []));
    const streak = getStreak();
    setStreakCount(streak.count || 0);
  }, []);

  const handleComplete = (id) => {
    const next = Array.from(new Set([...completedIds, id]));
    setCompletedIds(next);
    setStorageItem("homeTodos", next);
    softFeedback();
    const updated = updateStreakIfNeeded();
    setStreakCount(updated.count || 0);
  };

  const todos = todosData.filter((item) => !completedIds.includes(item.id));
  const completed = todosData.filter((item) => completedIds.includes(item.id));
  const tip = useMemo(() => tips[Math.floor(Math.random() * tips.length)], []);

  return (
    <main className="space-y-6">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold">Painel</h1>
        <StreakPill count={streakCount} />
      </header>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Atalhos rápidos</h2>
          <SnapCarousel>
            {[
              <ActionCardPremium
                key="remedio"
                title="Próximo Remédio"
                subtitle="14:00 • Losartana 50mg"
                icon="💊"
                actionLabel="TOMEI ✅"
                onAction={() => handleComplete("remedio")}
                done={completedIds.includes("remedio")}
              />,
              <ActionCardPremium
                key="agenda"
                title="Agenda do Dia"
                subtitle="Consulta quinta 10h"
                icon="🩺"
                actionLabel="VER"
                onAction={() => router.push("/agenda")}
                done={false}
              />,
              <ProgressRingCard
                key="rotina"
                title="Rotina de Hoje"
                subtitle="Exercícios leves"
                icon="🏃‍♂️"
                value={40}
              />,
              <FlashCard
                key="exames"
                title="Exames"
                subtitle="Ver resultados"
                icon="🔬"
                actionLabel="Abrir"
                onClick={() => router.push("/exames")}
              />
            ]}
          </SnapCarousel>
        </section>

        <TipFlipCard tip={tip} onDone={() => handleComplete("agua")} />

        <PremiumTodoList
          title="Hoje"
          todos={todos}
          completed={completed}
          onComplete={handleComplete}
          emptyLabel="Você cuidou de tudo hoje."
        />
    </main>
  );
}
