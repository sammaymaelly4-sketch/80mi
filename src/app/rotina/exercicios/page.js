"use client";

import { useEffect, useMemo, useState } from "react";
import ActionCardPremium from "@/components/flash/ActionCardPremium";
import ProgressRingCard from "@/components/flash/ProgressRingCard";
import { softFeedback } from "@/lib/feedback";
import { getStorageItem, setStorageItem, updateStreakIfNeeded } from "@/lib/storage";

const exercises = [
  {
    id: "cadeira",
    title: "Sentar e levantar da cadeira",
    subtitle: "Com apoio"
  },
  {
    id: "panturrilha",
    title: "Elevação de panturrilha",
    subtitle: "Segurando o encosto"
  },
  {
    id: "marcha",
    title: "Marcha parada",
    subtitle: "Segurando" 
  },
  {
    id: "ombros",
    title: "Rotação de ombros",
    subtitle: "Devagar"
  },
  {
    id: "respiracao",
    title: "Respiração 4-4-4",
    subtitle: "Inspire, segure, solte"
  }
];

export default function ExerciciosPage() {
  const [completedIds, setCompletedIds] = useState([]);

  useEffect(() => {
    setCompletedIds(getStorageItem("exerciseTodos", []));
  }, []);

  const handleComplete = (id) => {
    if (completedIds.includes(id)) return;
    const next = [...completedIds, id];
    setCompletedIds(next);
    setStorageItem("exerciseTodos", next);
    softFeedback();
    updateStreakIfNeeded();
  };

  const progressValue = useMemo(() => {
    if (!exercises.length) return 0;
    return Math.round((completedIds.length / exercises.length) * 100);
  }, [completedIds]);

  return (
    <main className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Exercícios</h1>
        <p className="text-sm text-slate-500">Rotina de 5 a 8 minutos, com calma.</p>
      </header>

      <ProgressRingCard
        title="Progresso de hoje"
        subtitle="Movimentos seguros"
        icon="🏃‍♂️"
        value={progressValue}
      />

      <div className="space-y-3">
        {exercises.map((exercise) => (
          <ActionCardPremium
            key={exercise.id}
            title={exercise.title}
            subtitle={exercise.subtitle}
            icon="✅"
            actionLabel="Concluído"
            done={completedIds.includes(exercise.id)}
            onAction={() => handleComplete(exercise.id)}
          />
        ))}
      </div>
    </main>
  );
}
