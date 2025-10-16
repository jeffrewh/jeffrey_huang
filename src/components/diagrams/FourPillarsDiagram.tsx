import React from "react";

interface FourPillarsDiagramProps {
  // Define any props this diagram might take, or leave empty if none for now
  className?: string;
}

export function FourPillarsDiagram({ className }: FourPillarsDiagramProps) {
  return (
    <div
      className={`my-8 p-4 bg-slate-800 text-slate-300 rounded-lg text-center ${className}`}
    >
      <p className="font-bold text-xl mb-2">
        Four Pillars Diagram (Placeholder)
      </p>
      <p>
        This is where your diagram visualizing Quality, Rate, Cost, and
        Flexibility will go.
      </p>
    </div>
  );
}
