// src/app/api/commits/route.ts
import { NextResponse } from "next/server";

// Define an interface for the structure of the GitHub API response
interface GitHubCommit {
  sha: string;
  commit: {
    author: {
      date: string;
      name: string;
    };
    message: string;
  };
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const repo = "jeffrewh/jeffrey_huang"; // Your username/repo

  if (!token) {
    return NextResponse.json(
      { error: "GitHub token not configured" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${repo}/commits`,
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json"
        }
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }

    // Tell TypeScript that the data will be an array of our GitHubCommit interface
    const commitsData: GitHubCommit[] = await response.json();

    // Now, 'c' is correctly typed as GitHubCommit, and the 'any' error is gone
    const filteredCommits = commitsData
      .filter((c: GitHubCommit) => !c.commit.message.includes("| omit"))
      .map((c: GitHubCommit) => ({
        hash: c.sha,
        date: c.commit.author.date,
        message: c.commit.message.replace("| omit", "").trim(),
        author: c.commit.author.name
      }));

    return NextResponse.json(filteredCommits);
  } catch (error) {
    // Type assertion for 'error'
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Failed to fetch commits from GitHub API:", errorMessage);
    return NextResponse.json(
      { error: "Failed to fetch commits" },
      { status: 500 }
    );
  }
}
