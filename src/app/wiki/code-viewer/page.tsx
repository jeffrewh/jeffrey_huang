"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CodeViewerShell from "@/components/desktop/CodeViewerShell";

function CodeViewerPageInner() {
  const searchParams = useSearchParams();
  return <CodeViewerShell projectId={searchParams.get("project")} />;
}

export default function CodeViewerPage() {
  return (
    <Suspense fallback={<div className="h-screen w-screen bg-[#0b0f16]" />}>
      <CodeViewerPageInner />
    </Suspense>
  );
}
