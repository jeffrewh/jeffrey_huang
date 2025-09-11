// src/app/wiki/page.tsx
"use client"; // This page requires user interaction, so it must be a Client Component

import { useState } from "react";

export default function Wiki() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  // IMPORTANT: For now, the password is hardcoded. We can make this more secure later.
  const CORRECT_PASSWORD = "your_secret_password"; // Change this to a secure password

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the form from reloading the page
    if (password === CORRECT_PASSWORD) {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Incorrect password.");
    }
  };

  // If the user is logged in, show the Wiki content.
  if (isLoggedIn) {
    return (
      <div className="container mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold text-slate-200">
          Knowledge Database
        </h1>
        <p className="mt-4 text-slate-400">
          Welcome. This is the entry point to the 3D map.
        </p>
        {/* The Three.js canvas will be rendered here in a future step */}
      </div>
    );
  }

  // If the user is NOT logged in, show the login form.
  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-slate-200">Enter Password</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded border-2 border-slate-600 bg-slate-800 p-2 text-slate-200 focus:border-teal-300 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded bg-teal-400/10 px-4 py-2 text-teal-300 hover:bg-teal-400/20"
        >
          Access
        </button>
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </form>
    </div>
  );
}
