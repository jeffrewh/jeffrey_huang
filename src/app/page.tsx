import LeftSidebar from "@/components/LeftSidebar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-16 lg:px-24 lg:py-0">
      <div className="lg:flex lg:justify-between lg:gap-24">
        <LeftSidebar />

        {/* The width is set on the parent columns, so this main tag just needs to fill its container. */}
        <main id="content" className="pt-24 lg:w-3/5 lg:py-24">
          {/* ===== ABOUT SECTION ===== */}
          <section
            id="about"
            className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
          >
            {/* THIS IS THE NEW STICKY HEADER FOR MOBILE/TABLET */}
            <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                About
              </h2>
            </div>

            {/* This is the actual content, which now follows the sticky header */}
            <div>
              <p className="mb-4">
                Here I detail my ceaseless journey in becoming the
                comprehensive, multi-disciplined engineer. I aim to become
                self-sufficient and a jack of all trades—don&apos;t finish that
                phrase. I&apos;m an aspiring engineer, passionate in nigh all
                things learning, and thusly, tend to get my fingers stuck in too
                many pies. I liken it to &quot;knowledge-FOMO&quot;, if you
                will.
              </p>
              <p className="mb-4">
                Currently, I am a Systems Engineer at{" "}
                <a
                  href="https://aerospace.honeywell.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
                >
                  Honeywell Aerospace
                </a>
                , where I focus on systems and product integration for the
                company&apos;s portfolio of aircraft engines, avionics, and
                other aerospace products. Here, my role is twofold: I integrate
                subteam developments in a technical, systems capacity while also
                leading programmatic efforts, including document authoring,
                project development, export compliance, and milestone
                management.
              </p>
              <p className="mb-4">
                My career at Honeywell Aerospace started on the production side,
                progressing from a Manufacturing/Quality Engineer to an Advanced
                Manufacturing Engineer, which built the foundation for my
                current systems and project responsibilities. In the past,
                I&apos;ve also engaged in web development efforts as contractor
              </p>
              <p className="mb-4">
                Here are a few technologies I’ve been working with recently:
              </p>
              <ul className="grid grid-cols-2 gap-2 font-mono text-sm">
                <li className="before:content-['▹'] before:mr-2 before:text-teal-300">
                  TypeScript
                </li>
                <li className="before:content-['▹'] before:mr-2 before:text-teal-300">
                  React
                </li>
                <li className="before:content-['▹'] before:mr-2 before:text-teal-300">
                  Next.js
                </li>
                <li className="before:content-['▹'] before:mr-2 before:text-teal-300">
                  Python
                </li>
              </ul>
            </div>
          </section>
          {/* ===== EXPERIENCE SECTION ===== */}
          <section
            id="experience"
            className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
          >
            <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                Experience
              </h2>
            </div>
            <div>
              <ol className="group/list">
                {/* === SINGLE JOB EXPERIENCE CARD === */}
                <li className="mb-12">
                  <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                    {/* Invisible full-card link overlay */}
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50"></div>

                    <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                      Jan 2024 — Present
                    </header>

                    <div className="z-10 sm:col-span-6">
                      <h3 className="font-medium leading-snug text-slate-200">
                        <a
                          className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
                          href="https://aerospace.honeywell.com/"
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {/* The hidden span you noticed is what makes the whole card clickable on desktop */}
                          <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                          <span>
                            Systems Engineer ·&nbsp;
                            <span className="inline-block">
                              Honeywell Aerospace
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </span>
                          </span>
                        </a>
                      </h3>
                      <p className="mt-2 text-sm leading-normal">
                        Facilitate and integrate subteam developments as they
                        occur. Author critical documents (proposals, SOWs, ATPs,
                        etc), provide export compliance guidance, and support
                        test campaigns and other project/IMS milestones.
                      </p>
                      <ul className="mt-2 flex flex-wrap">
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-300/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                            MBSE
                          </div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-300/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                            V&V
                          </div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-300/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                            Dev. Testing
                          </div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-300/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                            Qual. Testing
                          </div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-300/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                            HIL
                          </div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-300/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                            SIL
                          </div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-300/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                            Embedded Systems
                          </div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-300/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                            Project Management
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                {/* === ADD MORE 'li' BLOCKS HERE FOR OTHER JOBS === */}
                <li className="mb-12">
                  <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                    {/* Invisible full-card link overlay */}
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50"></div>

                    <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                      Nov 2022 — 2024
                    </header>

                    <div className="z-10 sm:col-span-6">
                      <h3 className="font-medium leading-snug text-slate-200">
                        <a
                          className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
                          href="https://aerospace.honeywell.com/"
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {/* The hidden span you noticed is what makes the whole card clickable on desktop */}
                          <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                          <span>
                            Advanced Manufacturing Engineer ·&nbsp;
                            <span className="inline-block">
                              Honeywell Aerospace
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </span>
                          </span>
                        </a>
                      </h3>
                      <p className="mt-2 text-sm leading-normal">
                        Build and maintain critical components used to construct
                        Klaviyo’s frontend, across the whole product. Work
                        closely with cross-functional teams to implement and
                        advocate for best practices in web accessibility.
                      </p>
                      <ul className="mt-2 flex flex-wrap">
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-300/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                            DfM/DfX
                          </div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-300/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                            CI
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li className="mb-12">
                  <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                    {/* Invisible full-card link overlay */}
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50"></div>

                    <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                      Apr — Nov 2022
                    </header>

                    <div className="z-10 sm:col-span-6">
                      <h3 className="font-medium leading-snug text-slate-200">
                        <a
                          className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
                          href="https://aerospace.honeywell.com/"
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {/* The hidden span you noticed is what makes the whole card clickable on desktop */}
                          <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                          <span>
                            Manufacturing Quality Engineer ·&nbsp;
                            <span className="inline-block">
                              Honeywell Aerospace
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </span>
                          </span>
                        </a>
                      </h3>
                      <p className="mt-2 text-sm leading-normal">
                        Facilitate and integrate subteam developments as they
                        occur. Author critical documents (proposals, SOWs, ATPs,
                        etc), provide export compliance guidance, and support
                        test campaigns and other project/IMS milestones.
                      </p>
                      <ul className="mt-2 flex flex-wrap">
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-300/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                            MBSE
                          </div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-300/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                            V&V
                          </div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-300/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                            Dev. Testing
                          </div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-300/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                            Qual. Testing
                          </div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-300/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                            HIL
                          </div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-300/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                            SIL
                          </div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-300/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                            Embedded Systems
                          </div>
                        </li>
                        <li className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-teal-300/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                            Project Management
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </section>

          {/* ===== PROJECTS SECTION (Placeholder with correct structure) ===== */}
          <section
            id="projects"
            className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
          >
            <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                Projects
              </h2>
            </div>
            <div>
              {/* Project cards will go here... */}
              <p>Project content coming soon...</p>
            </div>
          </section>

          {/* ===== CONTACT SECTION (Refined) ===== */}
          <section
            id="contact"
            className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
          >
            <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                Contact
              </h2>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-200">
                Get In Touch
              </h2>
              <p className="text-base text-slate-400 leading-relaxed mt-4">
                My inbox is always open. Whether you have a question, an
                opportunity, or just want to say hi, I’ll do my best to get back
                to you!
              </p>
              {/* This button is now smaller */}
              <a
                href="mailto:your.email@gmail.com"
                className="group inline-block mt-8 px-4 py-2 border border-teal-300 text-teal-300 rounded-md font-mono
                 text-sm hover:bg-teal-300 hover:bg-opacity-10 transition-all duration-300"
              >
                Say Hello
              </a>
            </div>
          </section>
          <Footer />
        </main>
      </div>
    </div>
  );
}
