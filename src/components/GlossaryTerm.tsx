import React from "react";
import Link from "next/link";

interface GlossaryTermProps {
  term: string; // The term to display and link to
  children: React.ReactNode; // The description of the term
  className?: string;
}

export function GlossaryTerm({ term, children, className }: GlossaryTermProps) {
  const glossaryId = term.toLowerCase().replace(/\s/g, "-");
  return (
    <div
      className={`my-4 p-4 border-l-4 border-purple-500 bg-slate-800 rounded-r-md ${className}`}
    >
      <h3 className="text-xl font-semibold text-purple-300 mb-2">
        <Link href={`/wiki/glossary#${glossaryId}`} className="hover:underline">
          {term}
        </Link>
      </h3>
      <p className="text-slate-400">{children}</p>
    </div>
  );
}
