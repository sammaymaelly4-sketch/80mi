const fallbackRecipe = {
  name: "Prato simples da casa",
  time: "20 min",
  goodFor: "energia",
  steps: [
    "Separe os alimentos escolhidos.",
    "Cozinhe o que precisa ficar macio.",
    "Finalize com um toque de azeite ou ervas.",
    "Sirva ainda morno e aproveite."
  ]
};

const pick = (list) => list[Math.floor(Math.random() * list.length)];

export const buildRecipe = (foods = []) => {
  if (!foods.length) return fallbackRecipe;
  const names = foods.map((item) => item.label.toLowerCase());
  const goodFor = pick(["energia", "recuperação", "leveza"]);
  const time = `${15 + foods.length * 3} min`;

  return {
    name: `Receita com ${foods[0].label}`,
    time,
    goodFor,
    steps: [
      `Lave ou prepare: ${names.join(", ")}.`,
      "Cozinhe ou aqueça os itens que precisam ficar macios.",
      "Misture tudo com cuidado e ajuste o sal.",
      "Sirva em porções pequenas e bem cheirosas."
    ]
  };
};
