// src/app/page.tsx
import LeftSidebar from "@/components/LeftSidebar";

export default function Home() {
  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-16 lg:py-0">
      <div className="lg:flex lg:justify-between lg:gap-4">
        {/* === LEFT, FIXED SIDEBAR === */}
        <LeftSidebar />

        {/* === RIGHT, SCROLLABLE CONTENT === */}
        <main id="content" className="pt-24 lg:w-1/2 lg:py-24">
          {/* We are placing the "About" section we already built here */}
          <section
            id="about"
            className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
          >
            <h2 className="text-3xl font-bold mb-8 text-slate-200">
              <span className="font-mono text-green-400">01.</span> About Me
            </h2>
            {/* The rest of your "About" section grid and content goes here... */}
          </section>

          {/* The "Projects" section will go here next */}
          <section
            id="projects"
            className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
          >
            <h2 className="text-3xl font-bold mb-8 text-slate-200">
              <span className="font-mono text-green-400">02.</span> Projects
            </h2>
            {/* Project cards will go here... */}
          </section>

          {/* ... and so on for other sections ... */}
        </main>
      </div>
    </div>
  );
}
