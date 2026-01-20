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

export const defaultMenu = [
  { day: "Seg", meals: "Café: pão + queijo • Almoço: arroz + frango • Jantar: sopa" },
  { day: "Ter", meals: "Café: banana • Almoço: macarrão + carne • Jantar: omelete" },
  { day: "Qua", meals: "Café: pão + café • Almoço: arroz + salada • Jantar: purê" },
  { day: "Qui", meals: "Café: fruta • Almoço: frango + legumes • Jantar: canja" },
  { day: "Sex", meals: "Café: pão + queijo • Almoço: arroz + carne • Jantar: sopa" },
  { day: "Sáb", meals: "Café: banana • Almoço: macarrão + frango • Jantar: salada" },
  { day: "Dom", meals: "Café: fruta • Almoço: almoço leve • Jantar: sopa" }
];

const pick = (list) => list[Math.floor(Math.random() * list.length)];
const pickByIndex = (list, index, fallback) => (list.length ? list[index % list.length] : fallback);
const titleCase = (value) => value.charAt(0).toUpperCase() + value.slice(1);

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

export const buildMenu = (foods = []) => {
  if (!foods.length) return defaultMenu;

  const byGroup = (group) =>
    foods.filter((item) => item.group === group).map((item) => item.label.toLowerCase());

  const carbs = byGroup("carb");
  const proteins = byGroup("protein");
  const vegs = byGroup("veg");
  const fruits = byGroup("fruit");
  const dairy = byGroup("dairy");

  const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

  return days.map((day, index) => {
    const breakfastItems = [
      pickByIndex(carbs, index, "pão"),
      pickByIndex(dairy, index, "queijo"),
      pickByIndex(fruits, index, "fruta")
    ].filter(Boolean);

    const lunchItems = [
      pickByIndex(carbs, index + 1, "arroz"),
      pickByIndex(proteins, index, "frango"),
      pickByIndex(vegs, index, "legumes")
    ];

    const dinnerItems = [
      pickByIndex(proteins, index + 2, "ovo"),
      pickByIndex(vegs, index + 1, "salada")
    ];

    const meals = `Café: ${breakfastItems.join(" + ")} • Almoço: ${lunchItems.join(
      " + "
    )} • Jantar: ${dinnerItems.join(" + ")}`;

    return { day, meals: titleCase(meals) };
  });
};
