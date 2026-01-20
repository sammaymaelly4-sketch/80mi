"use client";

export default function SnapCarousel({ children }) {
  return (
    <div className="-mx-6 overflow-x-auto px-6">
      <div className="flex gap-4 snap-x snap-mandatory scroll-px-6">
        {children.map((child, index) => (
          <div key={index} className="min-w-[260px] snap-start pb-2">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
