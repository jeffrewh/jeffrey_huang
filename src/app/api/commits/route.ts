// src/app/api/commits/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

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

const REPO = "jeffrewh/jeffrey_huang";

async function fetchCommits(token?: string) {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(`https://api.github.com/repos/${REPO}/commits?per_page=100`, {
    headers,
    cache: "no-store",
  });
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN?.trim();

  try {
    let response = await fetchCommits(token || undefined);

    // Public repos work without a token; retry unauthenticated if auth fails
    if (!response.ok && token && (response.status === 401 || response.status === 403)) {
      console.warn(
        `GitHub token rejected (${response.status}); retrying without authentication`
      );
      response = await fetchCommits();
    }

    if (!response.ok) {
      const details = await response.text();
      console.error(
        `GitHub API error ${response.status} for ${REPO}:`,
        details.slice(0, 500)
      );

      let message = "Failed to fetch commits from GitHub";
      if (response.status === 401 || response.status === 403) {
        message =
          "GitHub authentication failed. Check that GITHUB_TOKEN is valid and has repo read access.";
      } else if (response.status === 404) {
        message = `Repository not found: ${REPO}`;
      } else if (response.status === 403 && !token) {
        message =
          "GitHub rate limit exceeded. Add a GITHUB_TOKEN environment variable on Vercel.";
      }

      return NextResponse.json({ error: message }, { status: response.status });
    }

    const commitsData: GitHubCommit[] = await response.json();

    const filteredCommits = commitsData
      .filter((c) => !c.commit.message.includes("| omit"))
      .map((c) => ({
        hash: c.sha,
        date: c.commit.author.date,
        message: c.commit.message.replace("| omit", "").trim(),
        author: c.commit.author.name,
      }));

    return NextResponse.json(filteredCommits);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Failed to fetch commits from GitHub API:", errorMessage);
    return NextResponse.json(
      { error: "Failed to fetch commits" },
      { status: 500 }
    );
  }
}
