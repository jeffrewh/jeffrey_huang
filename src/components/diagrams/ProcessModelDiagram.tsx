import React from "react";

interface ProcessModelDiagramProps {
  // Define any props this diagram might take, or leave empty if none for now
  className?: string;
}

export function ProcessModelDiagram({ className }: ProcessModelDiagramProps) {
  return (
    <div
      className={`my-8 p-4 bg-slate-800 text-slate-300 rounded-lg text-center ${className}`}
    >
      <p className="font-bold text-xl mb-2">
        Process Model Diagram (Placeholder)
      </p>
      <p>Visualizing Equipment, Material, Operator, and their interactions.</p>
    </div>
  );
}
