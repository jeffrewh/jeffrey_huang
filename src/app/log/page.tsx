// src/app/log/page.tsx
export default function DevLog() {
  return (
    <div className="container mx-auto max-w-screen-md py-12 px-6">
      <h1 className="text-4xl font-bold text-slate-200">Revision History</h1>
      <p className="mt-4 text-slate-400">
        A log of significant updates and changes to this site, pulled from the
        Git history.
      </p>
      <div className="mt-12">
        {/* We will map over and display the commit history here later */}
        <p className="font-mono text-sm text-slate-500">
          [Commit Log Coming Soon...]
        </p>
      </div>
    </div>
  );
}
