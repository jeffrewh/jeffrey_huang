import React from "react";

interface OrthogonalCuttingDiagramProps {
  className?: string;
}

export function OrthogonalCuttingDiagram({
  className,
}: OrthogonalCuttingDiagramProps) {
  return (
    <div
      className={`my-8 rounded-lg border border-slate-700 bg-slate-800 p-6 text-slate-300 ${className ?? ""}`}
    >
      <p className="mb-2 text-center text-lg font-bold text-slate-200">
        Orthogonal Cutting Model
      </p>
      <div className="mx-auto max-w-md space-y-2 text-sm">
        <div className="flex justify-between border-b border-slate-600 pb-1">
          <span>Rake angle (α)</span>
          <span className="text-teal-300">Tool face vs. workpiece</span>
        </div>
        <div className="flex justify-between border-b border-slate-600 pb-1">
          <span>Shear angle (Φ)</span>
          <span className="text-teal-300">Chip formation plane</span>
        </div>
        <div className="flex justify-between">
          <span>Shear strain (γ)</span>
          <span className="text-teal-300">Material deformation</span>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-slate-500">
        Interactive diagram placeholder — simplified 2D orthogonal cutting model.
      </p>
    </div>
  );
}
