import React from "react";

interface SandCastingDiagramProps {
  className?: string;
}

export function SandCastingDiagram({ className }: SandCastingDiagramProps) {
  return (
    <div
      className={`my-8 rounded-lg border border-slate-700 bg-slate-800 p-6 text-slate-300 ${className ?? ""}`}
    >
      <p className="mb-2 text-center text-lg font-bold text-slate-200">
        Sand Casting Process
      </p>
      <div className="mx-auto max-w-md space-y-2 text-sm">
        <div className="flex justify-between border-b border-slate-600 pb-1">
          <span>Pattern</span>
          <span className="text-teal-300">Forms the mold cavity</span>
        </div>
        <div className="flex justify-between border-b border-slate-600 pb-1">
          <span>Molten metal</span>
          <span className="text-teal-300">Poured into sand mold</span>
        </div>
        <div className="flex justify-between">
          <span>Riser</span>
          <span className="text-teal-300">Feeds shrinkage during cooling</span>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-slate-500">
        Interactive diagram placeholder — sand casting workflow.
      </p>
    </div>
  );
}
