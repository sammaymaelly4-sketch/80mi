"use client";

import { useState } from "react";
import FoodIconGrid from "@/components/flash/FoodIconGrid";
import FlashCard from "@/components/flash/FlashCard";
import { buildMenu, buildRecipe, defaultMenu } from "@/lib/recipeBuilder";

const foods = [
  { id: "arroz", label: "Arroz", icon: "🍚", group: "carb" },
  { id: "pao", label: "Pão", icon: "🍞", group: "carb" },
  { id: "batata", label: "Batata", icon: "🥔", group: "carb" },
  { id: "macarrao", label: "Macarrão", icon: "🍝", group: "carb" },
  { id: "ovo", label: "Ovo", icon: "🥚", group: "protein" },
  { id: "frango", label: "Frango", icon: "🐔", group: "protein" },
  { id: "carne", label: "Carne", icon: "🥩", group: "protein" },
  { id: "queijo", label: "Queijo", icon: "🧀", group: "dairy" },
  { id: "cenoura", label: "Cenoura", icon: "🥕", group: "veg" },
  { id: "tomate", label: "Tomate", icon: "🍅", group: "veg" },
  { id: "folhas", label: "Folhas", icon: "🥬", group: "veg" },
  { id: "cebola", label: "Cebola", icon: "🧅", group: "veg" },
  { id: "banana", label: "Banana", icon: "🍌", group: "fruit" },
  { id: "maca", label: "Maçã", icon: "🍎", group: "fruit" },
  { id: "laranja", label: "Laranja", icon: "🍊", group: "fruit" }
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
    setMenu(buildMenu(selectedFoods));
  };

  const handleGenerateMenu = () => {
    const selectedFoods = foods.filter((food) => selectedIds.includes(food.id));
    setMenu(buildMenu(selectedFoods));
  };

  return (
    <main className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Alimentação</h1>
        <p className="text-sm text-slate-500">
          Informe os ingredientes que você tem para gerar receita e cardápio.
        </p>
      </header>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Cardápio semanal</h2>
          <button
            type="button"
            onClick={handleGenerateMenu}
            className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600"
          >
            Gerar com ingredientes
          </button>
        </div>
        {selectedIds.length === 0 && (
          <p className="text-xs text-slate-400">
            Dica: escolha alguns itens abaixo para personalizar o cardápio.
          </p>
        )}
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
