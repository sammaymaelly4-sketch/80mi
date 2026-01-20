"use client";

import { motion, useReducedMotion } from "framer-motion";
import { springPreset } from "@/lib/motion";

export default function ProgressRingCard({ title, subtitle, icon, value }) {
  const reducedMotion = useReducedMotion();
  const radius = 26;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <motion.div
      className="card-base p-5 flex items-center gap-4"
      transition={springPreset(reducedMotion)}
      layout
    >
      <span className="text-3xl" aria-hidden="true">
        {icon}
      </span>
      <div className="flex-1">
        <p className="text-lg font-semibold">{title}</p>
        {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
      </div>
      <div className="relative">
        <svg height={radius * 2} width={radius * 2}>
          <circle
            stroke="#e2e8f0"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <motion.circle
            stroke="#3a6dff"
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: reducedMotion ? 0 : 0.6 }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-slate-600">
          {value}%
        </span>
      </div>
    </motion.div>
  );
}
