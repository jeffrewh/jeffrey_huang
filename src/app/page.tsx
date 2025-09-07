// src/app/page.tsx
import LeftSidebar from "@/components/LeftSidebar";

export default function Home() {
  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-16 lg:py-0">
      <div className="lg:flex lg:justify-between lg:gap-4">
        <LeftSidebar />

        <main id="content" className="pt-24 lg:w-[52%] lg:py-24">
          {/* ===== ABOUT SECTION ===== */}
          {/* This is the main "blurb" that starts the content */}
          <section
            id="about"
            className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
          >
            {/* The numbered heading is more subtle and part of the section */}
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
              About
            </h2>
            {/* Text content and image grid from the previous step */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
              {/* LEFT COLUMN: Text content */}
              <div className="md:col-span-3 text-slate-400">
                <p className="mb-4">
                  Here I detail my ceaseless journey in becoming the
                  comprehensive engineer. I aim to become self-sufficient and a
                  jack of all trades. (Don&apos;t finish that phrase!) I&apos;m
                  an aspiring engineer, passionate in nigh all things learning,
                  and thusly, tending to get my fingers stuck in too many pies.
                  I liken it to &quot;knowledge-FOMO&quot;, if you will.
                </p>
                <p className="mb-4">
                  Currently I am a Systems Engineer for Honeywell Aerospace.
                </p>
                <ul className="grid grid-cols-2 gap-2 font-mono text-sm">
                  {/* ... The rest of your tech list goes here ... */}
                </ul>
              </div>

              {/* RIGHT COLUMN: Image */}
              <div className="md:col-span-2 relative">
                {/* ... The rest of your image placeholder code goes here ... */}
              </div>
            </div>
          </section>

          {/* We'll build the Experience and Projects sections here next */}
        </main>
      </div>
    </div>
  );
}
