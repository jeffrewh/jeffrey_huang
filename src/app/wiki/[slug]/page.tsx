// src/app/wiki/[slug]/page.tsx
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image"; // <--- Imported Next.js Image component
import { MDXRemote } from "next-mdx-remote/rsc";
import React from "react"; // Explicitly import React for JSX types
import clsx from "clsx"; // For conditional class names

// *** IMPORTS FOR CUSTOM COMPONENTS ***
import { Quiz, QuizQuestion } from "@/components/Quiz"; // Import Quiz and its interface
import { GlossaryTerm } from "@/components/GlossaryTerm";
import { FourPillarsDiagram } from "@/components/diagrams/FourPillarsDiagram";
import { ProcessModelDiagram } from "@/components/diagrams/ProcessModelDiagram";

// Make sure these component stubs actually exist at the specified paths:
// src/components/Quiz.tsx
// src/components/GlossaryTerm.tsx
// src/components/diagrams/FourPillarsDiagram.tsx
// src/components/diagrams/ProcessModelDiagram.tsx

// Define the expected props for the page component
interface WikiPageProps {
  params: {
    slug: string[]; // slug will be an array for nested routes, e.g., ['manufacturing', 'dfm']
  };
}

// Define the expected frontmatter structure for your MDX files
interface WikiFrontmatter {
  title: string;
  description?: string; // Optional description
  theme?: string; // Optional theme (e.g., for styling)
  date?: string;
  author?: string;
  // Add any other properties you expect in your MDX frontmatter here
}

// CustomComponentProps interface to allow for generic HTML attributes on MDX components
// Using `unknown` for index signature to avoid `unexpected any` error
interface CustomComponentProps {
  [key: string]: unknown; // Changed `any` to `unknown`
  children?: React.ReactNode;
}

export async function generateStaticParams() {
  console.log("\n--- Debugging generateStaticParams START ---");
  const contentDir = path.join(process.cwd(), "content");
  console.log(`Content Directory: ${contentDir}`);

  let files: string[] = [];
  try {
    files = await fs.readdir(contentDir, { recursive: true });
    console.log(`Found ${files.length} raw files/directories in contentDir`);
  } catch (error) {
    console.warn(
      `Content directory not found or unreadable at ${contentDir}. No static params will be generated for MDX.`,
      error
    );
    console.log("--- Debugging generateStaticParams END (Error) --- \n");
    return [];
  }

  const paths = new Set<string>();

  for (const file of files) {
    console.log(`\nProcessing file: ${file}`);
    if (file.endsWith(".mdx") || file.endsWith(".md")) {
      const originalFile = file;

      // 1. Remove file extension (.mdx or .md)
      const pathWithoutExtension = file.replace(/\.(mdx?)$/, "");
      console.log(`  1. pathWithoutExtension: ${pathWithoutExtension}`);

      // 2. Split the path into individual segments, normalizing separators
      //    Example: 'manufacturing/subtractive/_index' -> ['manufacturing', 'subtractive', '_index']
      //    Example: 'manufacturing/subtractive/index' -> ['manufacturing', 'subtractive', 'index']
      const segments = pathWithoutExtension
        .split(path.sep)
        .filter((segment) => segment.length > 0);
      console.log(
        `  2. Segments (after split by path.sep): [${segments.join(", ")}]`
      );
      console.log(`  path.sep in use: '${path.sep}'`);

      // 3. Filter out any segment that is exactly '_index' OR 'index' (case-sensitive)
      const cleanSegments = segments.filter((segment) => {
        const isIndexFileIdentifier =
          segment === "_index" || segment === "index"; // <--- CRITICAL CHANGE HERE
        // console.log(`    Checking segment '${segment}': isIndexFileIdentifier=${isIndexFileIdentifier}`); // uncomment for extreme verbosity
        return !isIndexFileIdentifier;
      });
      console.log(
        `  3. Clean Segments (after filtering '_index' and 'index'): [${cleanSegments.join(
          ", "
        )}]`
      );

      // 4. If after filtering, there are segments left, add them to our set of unique paths
      if (cleanSegments.length > 0) {
        const joinedPath = cleanSegments.join("/");
        paths.add(joinedPath);
        console.log(`  4. Added to paths set: '${joinedPath}'`);
      } else {
        // This case handles `content/index.mdx` or `content/_index.mdx`
        // if it should map to the root wiki URL `/wiki` (i.e., { slug: [] })
        // For now, let's add an empty slug array if the path becomes empty,
        // assuming your /wiki/ page expects it.
        paths.add(""); // Add an empty string for the root if content has an index
        console.log(
          `  4. Clean segments were empty, adding root path for: ${originalFile}`
        );
      }
    } else {
      console.log(`  Skipping non-MDX file: ${file}`);
    }
  }

  const finalParams = Array.from(paths)
    .map((pathStr) => {
      const slugSegments = pathStr
        .split("/")
        .filter((segment) => segment.length > 0);
      return { slug: slugSegments };
    })
    .filter((param) => param.slug.length > 0 || pathStr === ""); // Keep empty slug array if pathStr was empty for root
  // The `pathStr === ''` ensures { slug: [] } is not filtered out if it's explicitly added for the root.

  console.log(
    "\nGenerated Params (Final - Ultra-robust _index AND index removal with debug logs):",
    finalParams
  );
  console.log("--- Debugging generateStaticParams END --- \n");
  return finalParams;
}

// Main Page Component
export default async function WikiMDXPage({ params }: WikiPageProps) {
  const fullSlug = params.slug.join(path.sep); // e.g., 'manufacturing' or 'manufacturing/additive/fdm'
  let mdxPath: string;

  // Try to find the MDX file for the given slug
  // 1. Direct match: content/manufacturing/additive/fdm.mdx
  // 2. Directory index: content/manufacturing/_index.mdx
  const directPath = path.join(process.cwd(), "content", `${fullSlug}.mdx`);
  const indexPath = path.join(process.cwd(), "content", fullSlug, "_index.mdx");
  const directPathMd = path.join(process.cwd(), "content", `${fullSlug}.md`); // .md support
  const indexPathMd = path.join(
    process.cwd(),
    "content",
    fullSlug,
    "_index.md"
  ); // .md support

  try {
    await fs.access(directPath);
    mdxPath = directPath;
  } catch {
    try {
      await fs.access(indexPath);
      mdxPath = indexPath;
    } catch {
      try {
        await fs.access(directPathMd);
        mdxPath = directPathMd;
      } catch {
        try {
          await fs.access(indexPathMd);
          mdxPath = indexPathMd;
        } catch {
          // If no MDX file found, return a 404 (or appropriate handling)
          return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
              <h1 className="text-4xl font-bold text-red-500 mb-4">
                404 - Content Not Found
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                The wiki page for &quot;/{fullSlug}&quot; could not be found.
              </p>
              <Link
                href="/wiki"
                className="text-blue-400 hover:underline text-lg"
              >
                Go back to Wiki Home
              </Link>
            </div>
          );
        }
      }
    }
  }

  const fileContent = await fs.readFile(mdxPath, "utf8");
  const { content, data: frontmatter } = matter(fileContent);
  const typedFrontmatter = frontmatter as WikiFrontmatter; // Type assertion

  // Re-integrated theming logic
  const layoutTheme = typedFrontmatter.theme || "default"; // Default theme if not specified
  const isBerkshireHathaway = layoutTheme === "berkshire-hathaway";

  // Define components available to your MDX files
  const components = {
    // Referencing the imported Quiz component
    Quiz: (
      props: CustomComponentProps & { id: string; questions?: QuizQuestion[] }
    ) => (
      <Quiz {...props} /> // Pass all props to the actual Quiz component
    ),
    // Using `React.ComponentPropsWithoutRef` for components that don't typically have children
    // to avoid the "no properties in common with intrinsicattributes" error.
    GlossaryTerm: (
      props: React.ComponentPropsWithoutRef<typeof GlossaryTerm> &
        CustomComponentProps & { term: string; children?: React.ReactNode }
    ) => <GlossaryTerm {...props} />,
    FourPillarsDiagram: (
      props: React.ComponentPropsWithoutRef<typeof FourPillarsDiagram> &
        CustomComponentProps
    ) => <FourPillarsDiagram {...props} />,
    ProcessModelDiagram: (
      props: React.ComponentPropsWithoutRef<typeof ProcessModelDiagram> &
        CustomComponentProps
    ) => <ProcessModelDiagram {...props} />,
    // Example: A component for glossary links (assuming you have a /wiki/glossary page)
    GlossaryLink: (props: CustomComponentProps & { term: string }) => (
      <Link
        href={`/wiki/glossary#${(props.term as string)
          .toLowerCase()
          .replace(/\s/g, "-")}`}
        className="text-teal-300 hover:underline"
      >
        {props.term as string}
      </Link>
    ),
    // Standard HTML elements overrides for consistent styling
    h1: (props: CustomComponentProps) => (
      <h1 className="text-4xl font-bold mt-8 mb-4 text-white" {...props} />
    ),
    h2: (props: CustomComponentProps) => (
      <h2 className="text-3xl font-semibold mt-6 mb-3 text-white" {...props} />
    ),
    h3: (props: CustomComponentProps) => (
      <h3 className="text-2xl font-medium mt-5 mb-2 text-white" {...props} />
    ),
    h4: (props: CustomComponentProps) => (
      <h4 className="text-xl font-medium mt-4 mb-2 text-white" {...props} />
    ),
    p: (props: CustomComponentProps) => (
      <p className="text-lg text-slate-300 leading-relaxed mb-4" {...props} />
    ),
    a: (props: CustomComponentProps) => (
      <a className="text-blue-400 hover:underline" {...props} />
    ),
    ul: (props: CustomComponentProps) => (
      <ul
        className="list-disc list-inside text-lg text-slate-300 mb-4 pl-5"
        {...props}
      />
    ),
    ol: (props: CustomComponentProps) => (
      <ol
        className="list-decimal list-inside text-lg text-slate-300 mb-4 pl-5"
        {...props}
      />
    ),
    li: (props: CustomComponentProps) => <li className="mb-1" {...props} />,
    strong: (props: CustomComponentProps) => (
      <strong className="font-bold text-white" {...props} />
    ),
    em: (props: CustomComponentProps) => (
      <em className="italic text-slate-400" {...props} />
    ),
    hr: (props: CustomComponentProps) => (
      <hr className="my-8 border-t-2 border-slate-700" {...props} />
    ),
    blockquote: (props: CustomComponentProps) => (
      <blockquote
        className="border-l-4 border-blue-500 pl-4 italic text-slate-400 my-4"
        {...props}
      />
    ),
    // --- Using Next.js Image component for optimization ---
    img: (props: CustomComponentProps) => {
      // Extract necessary props, casting potentially `unknown` values
      const src = props.src as string;
      const alt = (props.alt as string) || "";
      const width = (props.width as number | undefined) || 800; // Default width
      const height = (props.height as number | undefined) || 600; // Default height

      return (
        <span className="my-6 block rounded-lg shadow-lg overflow-hidden">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            layout="responsive" // Make image responsive
            objectFit="contain" // Or "cover", depending on desired behavior
            {...(props as Record<string, unknown>)} // Pass remaining props
          />
        </span>
      );
    },
    table: (props: CustomComponentProps) => (
      <table
        className="w-full text-left table-auto my-6 border-collapse"
        {...props}
      />
    ),
    thead: (props: CustomComponentProps) => (
      <thead className="bg-slate-700 text-white" {...props} />
    ),
    th: (props: CustomComponentProps) => (
      <th className="p-3 border border-slate-600 font-semibold" {...props} />
    ),
    tbody: (props: CustomComponentProps) => (
      <tbody className="bg-slate-800 text-slate-300" {...props} />
    ),
    td: (props: CustomComponentProps) => (
      <td className="p-3 border border-slate-700" {...props} />
    ),
    code: (props: CustomComponentProps) => (
      <code
        className="bg-slate-700 rounded px-1 py-0.5 text-sm text-yellow-300"
        {...props}
      />
    ),
    pre: (props: CustomComponentProps) => (
      <pre className="bg-slate-900 rounded-lg p-4 my-4 overflow-x-auto text-sm">
        <code className="text-white" {...props} />
      </pre>
    )
    // You'd add your custom citation components here once implemented:
    // CiteStart: (props: CustomComponentProps) => <span className="text-sm font-light text-slate-500 italic" {...props} />,
    // Cite: (props: CustomComponentProps & { id: string }) => <sup className="ml-1 text-blue-400 cursor-help">[{props.id}]</sup>,
  };

  return (
    // Conditional styling based on theme
    <div
      className={clsx(
        "min-h-screen p-4 md:p-8 lg:p-12 xl:p-16",
        isBerkshireHathaway
          ? "font-serif bg-white text-black"
          : "bg-slate-900 text-slate-400"
      )}
    >
      <div
        className={clsx(
          "max-w-prose mx-auto", // Max-width for readable content
          isBerkshireHathaway ? "text-black" : "text-white"
        )}
      >
        <Link
          href="/wiki"
          className={clsx(
            "block mb-8",
            isBerkshireHathaway
              ? "text-blue-800 visited:text-purple-600 hover:underline"
              : "text-slate-500 hover:text-teal-300"
          )}
        >
          &lt;&lt; Back to Wiki Map
        </Link>
        <article className="prose prose-invert max-w-none">
          {" "}
          {/* prose-invert for dark mode defaults */}
          <h1
            className={clsx(
              "text-5xl font-extrabold mb-4",
              isBerkshireHathaway ? "text-gray-900" : "text-white"
            )}
          >
            {typedFrontmatter.title}
          </h1>
          {typedFrontmatter.description && (
            <p
              className={clsx(
                "text-xl mb-8",
                isBerkshireHathaway ? "text-gray-700" : "text-slate-400"
              )}
            >
              {typedFrontmatter.description}
            </p>
          )}
          <MDXRemote source={content} components={components} />
        </article>
      </div>
    </div>
  );
}
