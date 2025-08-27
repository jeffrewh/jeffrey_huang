"use client"; // This is a client component because it uses hooks for state

import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Jeffrey Huang
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-gray-300 transition-colors">
            Home
          </Link>
          <Link href="/notes" className="hover:text-gray-300 transition-colors">
            Notes
          </Link>
          <Link
            href="/projects"
            className="hover:text-gray-300 transition-colors"
          >
            Projects
          </Link>
          <Link href="/log" className="hover:text-gray-300 transition-colors">
            Developer&apos;s Log
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4">
          <Link
            href="/"
            className="block py-2 px-4 text-sm hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/notes"
            className="block py-2 px-4 text-sm hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            Notes
          </Link>
          <Link
            href="/projects"
            className="block py-2 px-4 text-sm hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            Projects
          </Link>
          <Link
            href="/log"
            className="block py-2 px-4 text-sm hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            Developer&apos;s Log
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
