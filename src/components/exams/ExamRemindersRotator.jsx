"use client";

import { useEffect, useMemo, useState } from "react";
import SnapCarousel from "@/components/flash/SnapCarousel";
import ExamReminderCard from "@/components/exams/ExamReminderCard";
import examAlertData from "@/data/exams/julio_alert_cards.json";
import { markCardDismissed, selectDailyCard } from "@/lib/examCardsGate";

export default function ExamRemindersRotator({ mode = "rotator" }) {
  const [cardOfDay, setCardOfDay] = useState(null);
  const rotation = examAlertData.display_rules.rotation;

  const sortedCards = useMemo(
    () => [...examAlertData.cards].sort((a, b) => a.priority - b.priority),
    []
  );

  useEffect(() => {
    if (mode !== "rotator") return;
    const selected = selectDailyCard(sortedCards, rotation.storage_keys);
    setCardOfDay(selected);
  }, [mode, rotation.storage_keys, sortedCards]);

  const handleDismiss = (cardId) => {
    markCardDismissed(cardId, rotation.storage_keys);
    setCardOfDay(null);
  };

  if (mode === "rotator") {
    if (!cardOfDay) return null;
    return (
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Lembrete do exame</h2>
          <span className="text-xs font-semibold text-slate-400">1 por dia</span>
        </div>
        <ExamReminderCard card={cardOfDay} onDismiss={handleDismiss} />
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Alertinhas do exame</h2>
      <SnapCarousel>
        {sortedCards.map((card) => (
          <ExamReminderCard key={card.id} card={card} />
        ))}
      </SnapCarousel>
    </section>
  );
}
