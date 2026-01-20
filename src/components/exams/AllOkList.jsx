"use client";

export default function AllOkList({ title, items }) {
  if (!items?.length) return null;

  return (
    <section className="card-base space-y-4 p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
          Tudo certo ✅
        </span>
      </div>
      <ul className="space-y-2 text-sm text-slate-600">
        {items.map((item) => (
          <li key={item.name} className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="text-emerald-600">●</span>
              {item.name}
            </span>
            <span className="font-semibold text-slate-900">{item.value}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
