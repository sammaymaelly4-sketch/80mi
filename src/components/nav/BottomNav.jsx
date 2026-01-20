"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import ExamsSplash from "@/components/exams/ExamsSplash";
import { tapScale } from "@/lib/motion";

const navItems = [
  { label: "Home", href: "/", icon: "🏠" },
  { label: "Rotina", href: "/rotina", icon: "🧭" },
  { label: "Exames", href: "/exames", icon: "🔬", center: true },
  { label: "Agenda", href: "/agenda", icon: "📅" },
  { label: "Perfil", href: "/perfil", icon: "🙂" }
];

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const [showSplash, setShowSplash] = useState(false);

  const handleExamsClick = () => {
    const duration = reducedMotion ? 400 : 1000;
    setShowSplash(true);
    setTimeout(() => {
      router.push("/exames");
      setTimeout(() => setShowSplash(false), 300);
    }, duration);
  };

  return (
    <>
      <ExamsSplash active={showSplash} />
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-md items-end justify-between">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            if (item.center) {
              return (
                <motion.button
                  key={item.label}
                  type="button"
                  onClick={handleExamsClick}
                  className="-mt-10 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-brand-500 text-white shadow-soft focus-ring"
                  {...tapScale}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-[11px] font-semibold">EXAMES</span>
                </motion.button>
              );
            }

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => router.push(item.href)}
                className={`flex flex-col items-center gap-1 text-xs font-semibold ${
                  isActive ? "text-brand-600" : "text-slate-400"
                } focus-ring`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
