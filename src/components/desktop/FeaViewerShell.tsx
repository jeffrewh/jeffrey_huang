"use client";

import DesktopWindow from "@/components/desktop/DesktopWindow";
import ModelViewport from "@/components/desktop/ModelViewport";
import { resolveViewerProject } from "@/lib/viewerProjects";

interface FeaViewerShellProps {
  projectId: string | null;
}

export default function FeaViewerShell({ projectId }: FeaViewerShellProps) {
  const project = resolveViewerProject(projectId);

  return (
    <DesktopWindow title={project.fea.windowTitle}>
      <div className="flex h-full flex-col">
        <header className="border-b border-slate-700 bg-[#1f2733]">
          <div className="flex items-center gap-2 px-3 py-2">
            <span className="rounded bg-[#2e3a4d] px-2 py-1 text-xs text-slate-200">
              Home
            </span>
            <span className="rounded bg-[#2e3a4d] px-2 py-1 text-xs text-slate-200">
              Results
            </span>
            <span className="rounded bg-[#2e3a4d] px-2 py-1 text-xs text-slate-200">
              Probe
            </span>
            <span className="rounded bg-[#2e3a4d] px-2 py-1 text-xs text-slate-200">
              View
            </span>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          <aside className="w-72 border-r border-slate-700 bg-[#1a1f27] p-3 text-xs">
            <p className="mb-2 font-semibold text-slate-200">Outline</p>
            <div className="space-y-1 text-slate-400">
              {project.fea.outlineTree.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
          </aside>

          <main className="relative min-w-0 flex-1">
            <ModelViewport modelPath={project.fea.modelPath} />
            <div className="pointer-events-none absolute right-4 top-1/2 z-30 w-16 -translate-y-1/2 rounded border border-slate-400/40 bg-slate-900/80 p-2 text-[10px] text-slate-200">
              <div className="mb-2 text-center">Von Mises (MPa)</div>
              <div
                className="mx-auto h-48 w-4 rounded"
                style={{
                  background:
                    "linear-gradient(to top, #0b3b8c 0%, #1d4ed8 20%, #22c55e 45%, #facc15 70%, #f97316 85%, #dc2626 100%)",
                }}
              />
              <div className="mt-2 flex flex-col gap-1 text-[9px]">
                <span>{project.fea.stressMaxMpa} max</span>
                <span>{project.fea.stressOpMpa} op</span>
                <span>0 min</span>
              </div>
            </div>
          </main>
        </div>
      </div>
    </DesktopWindow>
  );
}
