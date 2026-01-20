"use client";

export default function StreakPill({ count }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
      🔥 {count} dias seguidos
    </div>
  );
}
