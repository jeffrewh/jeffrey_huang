// src/app/wiki/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import WikiCanvas from "@/components/WikiCanvas"; // Import the 3D Canvas component

export default function Wiki() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [showOverlay, setShowOverlay] = useState(true);

  // Use env var for security; fallback for local dev if .env.local isn't set
  const CORRECT_PASSWORD =
    process.env.NEXT_PUBLIC_WIKI_PASSWORD || "your_secret_password";

  useEffect(() => {
    // Check if the user is already logged in (e.g., from session storage)
    const storedLogin = localStorage.getItem("wikiLoggedIn");
    if (storedLogin === "true") {
      setIsLoggedIn(true);
      setShowOverlay(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsLoggedIn(true);
      setShowOverlay(false);
      setError("");
      localStorage.setItem("wikiLoggedIn", "true"); // Persist login for the session
    } else {
      setError("Incorrect password.");
    }
  };

  return (
    // The main container needs to be relative to position the back link absolutely
    <div className="relative min-h-screen bg-slate-900 text-slate-400">
      {/* Back to Home link - always visible, but positioned relative to the overall div */}
      <Link
        href="/"
        className="absolute top-8 left-8 z-20 inline-flex items-center text-sm font-medium text-slate-500 hover:text-teal-300"
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

      {/* Wiki Content (The 3D Canvas) - only visible if logged in */}
      {isLoggedIn ? (
        // The WikiCanvas will take full height/width
        <WikiCanvas />
      ) : (
        // Placeholder or initial message when not logged in, but overlay not yet active
        <div className="flex items-center justify-center min-h-screen">
          {/* This div just ensures min-h-screen for initial load before overlay appears */}
        </div>
      )}

      {/* Password Overlay - only visible if showOverlay is true AND not logged in */}
      {showOverlay && !isLoggedIn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-sm">
          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-4 p-8 rounded-lg bg-slate-800 shadow-xl text-center"
          >
            <h2 className="text-2xl font-bold text-slate-200">Access Wiki</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="rounded border-2 border-slate-600 bg-slate-700 p-3 text-slate-200 focus:border-teal-300 focus:outline-none placeholder-slate-500"
              aria-label="Wiki Password"
            />
            <button
              type="submit"
              className="rounded bg-teal-400/10 px-6 py-2 text-teal-300 font-semibold hover:bg-teal-400/20 transition-colors"
            >
              Enter
            </button>
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          </form>
        </div>
      )}
    </div>
  );
}
