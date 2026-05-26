"use client";

import Link from "next/link";
import type { ReactNode } from "react";

interface DesktopWindowProps {
  title: string;
  children: ReactNode;
}

export default function DesktopWindow({ title, children }: DesktopWindowProps) {
  return (
    <div className="relative z-20 h-screen w-screen overflow-hidden bg-[#0b0f16] text-slate-200">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-slate-700 bg-[#131a24] px-4 py-2">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
            <span className="ml-3 text-sm font-medium text-slate-300">{title}</span>
          </div>
          <Link
            href="/"
            className="rounded border border-slate-600 px-2.5 py-1 text-xs text-slate-300 hover:bg-slate-700/40"
          >
            Exit
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
