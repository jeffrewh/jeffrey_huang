// next.config.ts
import nextMDX from "@next/mdx"; // Import the MDX plugin
import type { NextConfig } from "next";

const withMDX = nextMDX({
  extension: /\.mdx?$/, // This tells MDX to process files ending with .md or .mdx
  options: {
    // You can add MDX specific options here, like remark or rehype plugins
    // For now, we'll keep it simple, but this is where you'd configure
    // things like syntax highlighting, footnotes, etc., if you needed them later.
    // E.g., remarkPlugins: [], rehypePlugins: [],
  }
});

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // Your existing config options (which are currently empty but could grow)
  reactStrictMode: true, // Generally a good default for Next.js apps
  //swcMinify: true, // Speeds up minification

  // This is the crucial part for MDX:
  // We extend Next.js's default page extensions to include .md and .mdx files
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"]

  // Any other configurations would go here, e.g.:
  // images: {
  //   domains: ['your-image-host.com'],
  // },
};

// We wrap your nextConfig with the withMDX function
// This applies the MDX capabilities to your Next.js project
export default withMDX(nextConfig);
