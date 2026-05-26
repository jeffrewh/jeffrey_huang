"use client";

import { useEffect, useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import DesktopWindow from "@/components/desktop/DesktopWindow";
import { resolveViewerProject } from "@/lib/viewerProjects";

const FALLBACK_CODE = `# Solver file not found in /public/projects/<project-id>/
# Add your .py file and refresh this page.
`;

interface CodeViewerShellProps {
  projectId: string | null;
}

export default function CodeViewerShell({ projectId }: CodeViewerShellProps) {
  const project = resolveViewerProject(projectId);
  const [code, setCode] = useState<string>(FALLBACK_CODE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);

    fetch(project.code.publicPath)
      .then((res) => {
        if (!res.ok) throw new Error("Missing solver file");
        return res.text();
      })
      .then((text) => {
        if (active) setCode(text);
      })
      .catch(() => {
        if (active) setCode(FALLBACK_CODE);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [project.code.publicPath]);

  return (
    <DesktopWindow title={project.code.windowTitle}>
      <div className="flex h-full">
        <aside className="flex w-12 flex-col items-center gap-4 border-r border-slate-800 bg-[#121826] py-4 text-slate-400">
          <span>📁</span>
          <span>🔍</span>
          <span>⑂</span>
          <span>🧩</span>
        </aside>

        <aside className="w-64 border-r border-slate-800 bg-[#1a2232] p-3 text-xs">
          <p className="mb-3 text-[11px] font-semibold tracking-wide text-slate-300">
            EXPLORER
          </p>
          <div className="space-y-1 text-slate-400">
            {project.code.fileTree.map((item) => (
              <div key={item} className="truncate">
                {item}
              </div>
            ))}
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col bg-[#0f1724]">
          <div className="flex h-10 items-end border-b border-slate-800 bg-[#111a2a] px-3">
            <div className="rounded-t border border-b-0 border-slate-700 bg-[#0f1724] px-3 py-1.5 text-xs text-slate-200">
              {project.code.tabName}
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-4 text-sm">
            {loading ? (
              <p className="text-slate-500">Loading solver source...</p>
            ) : (
              <Highlight theme={themes.vsDark} code={code} language="python">
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                  <pre className={className} style={style}>
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line })}>
                        <span className="mr-4 inline-block w-8 text-right text-slate-500">
                          {i + 1}
                        </span>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            )}
          </div>

          <div className="flex h-7 items-center justify-between bg-indigo-600 px-3 text-[11px] text-indigo-50">
            <span>{project.code.tabName} • {project.id}</span>
            <span>Spaces: 4 • UTF-8 • Python</span>
          </div>
        </div>
      </div>
    </DesktopWindow>
  );
}
