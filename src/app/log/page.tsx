// src/app/log/page.tsx
'use client'; // This page will fetch data dynamically

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Commit {
  hash: string;
  date: string;
  message: string;
  author: string;
}

export default function DevLog() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCommits() {
      try {
        const response = await fetch('/api/commits');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Commit[] = await response.json();
        setCommits(data);
      } catch (e) { // CHANGED: 'e: any' to 'e'
        // Type assertion for 'e' to access its message property reliably
        setError((e instanceof Error) ? e.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }
    fetchCommits();
  }, []);

  return (
    <div className="mx-auto max-w-screen-md py-12 px-6">
      <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-teal-300 mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 mr-1 rotate-180" aria-hidden="true"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd"></path></svg>
        Back to Home
      </Link>
      <h1 className="text-4xl font-bold text-slate-200 mb-4">Revision History</h1>
      <p className="text-slate-400 max-w-lg mb-8">
        A chronological log of significant updates to this site. Commits with &quot;| omit&quot; in their message are excluded.
      </p>

      {loading && <p className="text-slate-500">Loading commit history...</p>}
      {error && <p className="text-red-400">Error loading commit history: {error}</p>}

      {!loading && commits.length === 0 && !error && (
        <p className="text-slate-500">No commits found yet. All commits will show by default unless tagged with &quot;| omit&quot;!</p>
      )}

      <ul className="space-y-6">
        {commits.map((commit) => (
          <li key={commit.hash} className="group relative grid grid-cols-1 md:grid-cols-4 gap-4 pb-1 transition-all">
            <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50"></div>
            <time dateTime={commit.date} className="z-10 text-xs font-semibold uppercase tracking-wide text-slate-500 md:col-span-1">
              {new Date(commit.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </time>
            <div className="z-10 md:col-span-3">
              <p className="font-medium leading-snug text-slate-200">
                {commit.message}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                By {commit.author} &bull; <code className="text-xs">{commit.hash.substring(0, 7)}</code>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}