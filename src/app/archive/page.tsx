// src/app/archive/page.tsx
import Link from "next/link";

export default function ProjectArchive() {
  return (
    <div className="mx-auto max-w-screen-md py-12 px-6">
      <Link
        href="/"
        className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-teal-300 mb-8"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4 mr-1 rotate-180"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
            clipRule="evenodd"
          ></path>
        </svg>
        Back to Home
      </Link>
      <h1 className="text-4xl font-bold text-slate-200">All Projects</h1>
      <p className="mt-4 text-slate-400">
        A comprehensive list of all my coding projects, both personal and
        professional.
      </p>
      <div className="mt-12">
        {/* Your archived project cards will go here */}
        <p className="font-mono text-sm text-slate-500">
          [Archived Projects Coming Soon...]
        </p>
      </div>
    </div>
  );
}
