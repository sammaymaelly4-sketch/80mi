"use client";

import { motion } from "framer-motion";
import { tapScale } from "@/lib/motion";

export default function FoodIconGrid({ foods, selectedIds, onToggle }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {foods.map((food) => {
        const selected = selectedIds.includes(food.id);
        return (
          <motion.button
            key={food.id}
            type="button"
            onClick={() => onToggle(food.id)}
            className={`card-base flex flex-col items-center gap-2 p-4 text-center text-sm font-semibold ${
              selected ? "border-2 border-brand-400 bg-brand-50" : "border"
            }`}
            {...tapScale}
          >
            <span className="text-3xl" aria-hidden="true">
              {food.icon}
            </span>
            <span>{food.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
