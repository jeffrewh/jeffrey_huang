import Link from "next/link";

export default function Home() {
  return (
    // The main container is provided by layout.tsx
    // This component renders the content for the main page.
    <section className="text-center flex flex-col items-center justify-center flex-grow p-8">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
        Jeffrey Huang
      </h1>
      <p className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-600 max-w-2xl">
        A digital garden where I document my journey through engineering,
        software, and science. Welcome to my &quot;learning in public&quot;
        portfolio.
      </p>
      <Link
        href="/notes"
        className="mt-8 px-8 py-3 bg-gray-800 text-white font-bold rounded-full hover:bg-gray-700 transition-colors"
      >
        Explore My Notes
      </Link>
    </section>
  );
}
