"use client";

const menuItems = ["Medicamentos", "Consultas", "Exames", "Lembretes"];

export default function MenuPrincipal() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {menuItems.map((item) => (
        <button
          key={item}
          type="button"
          className="rounded-2xl bg-blue-600 px-6 py-6 text-lg font-semibold text-white shadow-lg transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
          aria-label={item}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
