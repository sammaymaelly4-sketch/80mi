"use client";

import { useEffect, useMemo, useState } from "react";
import PremiumTodoList from "@/components/flash/PremiumTodoList";
import StreakPill from "@/components/flash/StreakPill";
import TipFlipCard from "@/components/flash/TipFlipCard";
import ExamRemindersRotator from "@/components/exams/ExamRemindersRotator";
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

      <ExamRemindersRotator />

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
