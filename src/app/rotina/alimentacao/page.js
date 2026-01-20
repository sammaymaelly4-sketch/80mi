"use client";

import { useState } from "react";
import FoodIconGrid from "@/components/flash/FoodIconGrid";
import FlashCard from "@/components/flash/FlashCard";
import { buildRecipe } from "@/lib/recipeBuilder";

const foods = [
  { id: "arroz", label: "Arroz", icon: "🍚" },
  { id: "pao", label: "Pão", icon: "🍞" },
  { id: "batata", label: "Batata", icon: "🥔" },
  { id: "macarrao", label: "Macarrão", icon: "🍝" },
  { id: "ovo", label: "Ovo", icon: "🥚" },
  { id: "frango", label: "Frango", icon: "🐔" },
  { id: "carne", label: "Carne", icon: "🥩" },
  { id: "queijo", label: "Queijo", icon: "🧀" },
  { id: "cenoura", label: "Cenoura", icon: "🥕" },
  { id: "tomate", label: "Tomate", icon: "🍅" },
  { id: "folhas", label: "Folhas", icon: "🥬" },
  { id: "cebola", label: "Cebola", icon: "🧅" },
  { id: "banana", label: "Banana", icon: "🍌" },
  { id: "maca", label: "Maçã", icon: "🍎" },
  { id: "laranja", label: "Laranja", icon: "🍊" }
];

const defaultMenu = [
  { day: "Seg", meals: "Café: pão + queijo • Almoço: arroz + frango • Jantar: sopa" },
  { day: "Ter", meals: "Café: banana • Almoço: macarrão + carne • Jantar: omelete" },
  { day: "Qua", meals: "Café: pão + café • Almoço: arroz + salada • Jantar: purê" },
  { day: "Qui", meals: "Café: fruta • Almoço: frango + legumes • Jantar: canja" },
  { day: "Sex", meals: "Café: pão + queijo • Almoço: arroz + carne • Jantar: sopa" },
  { day: "Sáb", meals: "Café: banana • Almoço: macarrão + frango • Jantar: salada" },
  { day: "Dom", meals: "Café: fruta • Almoço: almoço leve • Jantar: sopa" }
];

export default function AlimentacaoPage() {
  const [menu, setMenu] = useState(defaultMenu);
  const [selectedIds, setSelectedIds] = useState([]);
  const [recipe, setRecipe] = useState(null);

  const toggleFood = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBuild = () => {
    const selectedFoods = foods.filter((food) => selectedIds.includes(food.id));
    setRecipe(buildRecipe(selectedFoods));
  };

  const handleGenerateMenu = () => {
    setMenu(defaultMenu);
  };

  return (
    <main className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Alimentação</h1>
        <p className="text-sm text-slate-500">Cardápio simples e receitas com o que há em casa.</p>
      </header>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Cardápio semanal</h2>
          <button
            type="button"
            onClick={handleGenerateMenu}
            className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600"
          >
            Gerar novamente
          </button>
        </div>
        <div className="space-y-3">
          {menu.map((item) => (
            <FlashCard key={item.day} title={item.day} subtitle={item.meals} icon="📅" />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Montar Receita com o que tem em casa</h2>
        <FoodIconGrid foods={foods} selectedIds={selectedIds} onToggle={toggleFood} />
        <button
          type="button"
          onClick={handleBuild}
          className="w-full rounded-full bg-emerald-500 px-4 py-3 text-base font-semibold text-white"
        >
          Montar Receita
        </button>
        {recipe && (
          <div className="space-y-3">
            <FlashCard
              title={recipe.name}
              subtitle={`Tempo: ${recipe.time} • Boa para: ${recipe.goodFor}`}
              icon="🍲"
            />
            <div className="card-base p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-700">Passos</p>
              <ol className="mt-2 list-decimal space-y-1 pl-5">
                {recipe.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
