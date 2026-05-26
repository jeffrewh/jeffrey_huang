"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CadViewerShell from "@/components/desktop/CadViewerShell";

function CadViewerPageInner() {
  const searchParams = useSearchParams();
  return <CadViewerShell projectId={searchParams.get("project")} />;
}

export default function CadViewerPage() {
  return (
    <Suspense fallback={<div className="h-screen w-screen bg-[#0b0f16]" />}>
      <CadViewerPageInner />
    </Suspense>
  );
}
