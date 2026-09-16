"use client";

import { useMemo, useState } from "react";
import { ResearchItem } from "@/types/content";
import ResearchCard from "./ResearchCard";

export default function ResearchFilters({ items }: { items: ResearchItem[] }) {
  const categories = useMemo(
    () => Array.from(new Set(items.map((i) => i.category))),
    [items]
  );

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeType, setActiveType] = useState<"All" | "free" | "premium">(
    "All"
  );
  const [query, setQuery] = useState("");

  const filtered = items.filter((item) => {
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;
    const matchesType = activeType === "All" || item.type === activeType;
    const matchesQuery =
      query.trim() === "" ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesType && matchesQuery;
  });

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search research"
          aria-label="Search research"
          className="w-full max-w-sm border border-line bg-ink-soft px-3 py-2 text-sm text-paper placeholder:text-paper-dim focus:border-gold"
        />

        <div className="flex flex-wrap gap-2">
          <FilterPill
            label="All"
            active={activeType === "All"}
            onClick={() => setActiveType("All")}
          />
          <FilterPill
            label="Free"
            active={activeType === "free"}
            onClick={() => setActiveType("free")}
          />
          <FilterPill
            label="Premium"
            active={activeType === "premium"}
            onClick={() => setActiveType("premium")}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <FilterPill
            label="All categories"
            active={activeCategory === "All"}
            onClick={() => setActiveCategory("All")}
          />
          {categories.map((c) => (
            <FilterPill
              key={c}
              label={c}
              active={activeCategory === c}
              onClick={() => setActiveCategory(c)}
            />
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-paper-dim">
          No research matches these filters yet.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <ResearchCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-sm border px-3 py-1.5 text-sm transition-colors ${
        active
          ? "border-gold text-gold"
          : "border-line text-paper-dim hover:text-paper"
      }`}
    >
      {label}
    </button>
  );
}
