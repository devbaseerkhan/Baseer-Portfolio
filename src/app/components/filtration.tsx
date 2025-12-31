"use client";

import type React from "react";

export type FilterOption = {
  id: string;
  label: string;
};

type FiltrationProps = {
  label?: string;
  options: FilterOption[];
  active: Set<string>;
  onToggle: (id: string) => void;
  onReset?: () => void;
};

export default function Filtration({
  label = "Filter:",
  options,
  active,
  onToggle,
  onReset,
}: FiltrationProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-primary bg-primary-10 px-2 py-2">
      <div className="flex items-center gap-5">
        <span className="title16 !text-info-light hidden md:block">{label}</span>
        <div className="flex flex-wrap gap-4">
          {options.map((option) => {
            const isActive = active.has(option.id);
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onToggle(option.id)}
                className="flex items-center gap-2 title16 uppercase text-primary text-shadow-primary-10"
              >
                <div className="h-5 w-5 flex justify-center items-center border border-primary rounded">
                  {isActive && (
                    <span className="h-3 w-3 rounded bg-primary" aria-hidden />
                  )}
                </div>
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      {onReset ? (
        <button
          type="button"
          onClick={onReset}
          className="title16 uppercase text-primary text-shadow-primary-10 w-max"
        >
          Show all
        </button>
      ) : null}
    </div>
  );
}
