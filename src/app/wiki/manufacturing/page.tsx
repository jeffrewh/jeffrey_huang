// src/app/wiki/manufacturing/page.tsx
import Link from "next/link";

export default function ManufacturingWiki() {
  return (
    // We apply the minimalist styling to this main container
    <div className="font-serif bg-white text-black min-h-screen p-8">
      <div className="max-w-screen-md mx-auto">
        <Link
          href="/wiki"
          className="text-blue-800 visited:text-purple-600 hover:underline"
        >
          &lt;&lt; Back to Wiki Map
        </Link>

        <h1 className="text-3xl font-bold text-center my-8">
          Manufacturing & Industrial Engineering
        </h1>

        <div className="text-center text-lg leading-loose">
          <p className="mb-4">
            A collection of notes and resources on the principles of modern
            manufacturing.
          </p>
          <hr className="my-6 border-gray-300" />

          {/* This will be our "Table of Contents" */}
          <a
            href="#"
            className="block text-blue-800 visited:text-purple-600 hover:underline"
          >
            Design for Manufacturing (DFM)
          </a>
          <a
            href="#"
            className="block text-blue-800 visited:text-purple-600 hover:underline"
          >
            Lean Manufacturing & Continuous Improvement (CI)
          </a>
          <a
            href="#"
            className="block text-blue-800 visited:text-purple-600 hover:underline"
          >
            Systems Engineering Principles
          </a>
          <a
            href="#"
            className="block text-blue-800 visited:text-purple-600 hover:underline"
          >
            Supply Chain & Logistics
          </a>
        </div>
      </div>
    </div>
  );
}
