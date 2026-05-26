"use client";

import DesktopWindow from "@/components/desktop/DesktopWindow";
import ModelViewport from "@/components/desktop/ModelViewport";
import { resolveViewerProject } from "@/lib/viewerProjects";

interface CadViewerShellProps {
  projectId: string | null;
}

export default function CadViewerShell({ projectId }: CadViewerShellProps) {
  const project = resolveViewerProject(projectId);

  return (
    <DesktopWindow title={project.cad.windowTitle}>
      <div className="flex h-full flex-col">
        <header className="border-b border-slate-500 bg-slate-200 text-slate-800">
          <div className="flex gap-4 border-b border-slate-400 px-3 py-1.5 text-xs font-medium">
            <span>Home</span>
            <span>Assembly</span>
            <span>Analysis</span>
            <span>Surface</span>
          </div>
          <div className="flex gap-2 px-3 py-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="h-7 w-16 rounded border border-slate-400 bg-white/80"
              />
            ))}
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          <aside className="w-72 border-r border-slate-700 bg-[#1a1f27] p-3 text-xs">
            <p className="mb-2 font-semibold text-slate-200">Part Navigator</p>
            <div className="space-y-1 text-slate-400">
              {project.cad.historyTree.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
          </aside>

          <main className="min-w-0 flex-1">
            <ModelViewport modelPath={project.cad.modelPath} showAxes />
          </main>
        </div>
      </div>
    </DesktopWindow>
  );
}
