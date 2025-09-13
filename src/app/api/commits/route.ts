// src/app/api/commits/route.ts
import { NextResponse } from "next/server";
import simpleGit from "simple-git";

// Initialize simple-git in your project's root
const git = simpleGit(process.cwd());

export async function GET() {
  try {
    // Fetch the last 100 commits (you can adjust maxCount as needed)
    const log = await git.log({ maxCount: 100 });

    // Filter commits: Show ALL commits UNLESS they include '| omit' in their message
    const filteredCommits = log.all
      .filter((commit) => !commit.message.includes("| omit")) // The key change here
      .map((commit) => ({
        hash: commit.hash,
        date: commit.date,
        // Clean up the message: remove the '| omit' tag if it exists, and trim whitespace
        message: commit.message.replace("| omit", "").trim(),
        author: commit.author_name
      }));

    return NextResponse.json(filteredCommits);
  } catch (error) {
    console.error("Failed to fetch git log:", error);
    return NextResponse.json(
      { error: "Failed to fetch git log" },
      { status: 500 }
    );
  }
}
