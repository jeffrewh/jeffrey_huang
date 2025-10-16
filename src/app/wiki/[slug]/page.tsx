// src/app/wiki/[slug]/page.tsx
import { MDXRemote } from "next-mdx-remote/rsc";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import Link from "next/link";
import React from "react"; // Explicitly import React for JSX types
// ... other imports ...
import { FourPillarsDiagram } from "@/components/diagrams/FourPillarsDiagram"; // Adjust path if needed
import { ProcessModelDiagram } from "@/components/diagrams/ProcessModelDiagram"; // Adjust path if needed
import { GlossaryTerm } from "@/components/GlossaryTerm"; // Adjust path if needed

// ... rest of the file ...

interface WikiPageProps {
  params: {
    slug: string[]; // slug will be an array for nested routes, e.g., ['manufacturing', 'dfm']
  };
}

interface WikiFrontmatter {
  title?: string;
  theme?: string;
  // Add any other properties you expect in your MDX frontmatter here, e.g.:
  // date?: string;
  // author?: string;
}

// Define types for default HTML elements to avoid 'any'
interface HeadingProps {
  children?: React.ReactNode;
  id?: string;
  className?: string; // Allow className for custom styling
}
interface ParagraphProps {
  children?: React.ReactNode;
  className?: string;
}
interface LinkComponentProps {
  // Renamed to avoid conflict with Next's Link if used directly
  href: string;
  children?: React.ReactNode;
  className?: string;
}
interface ListProps {
  children?: React.ReactNode;
  className?: string;
}
interface ListItemProps {
  children?: React.ReactNode;
  className?: string;
}

// Define a more explicit generic type for custom components
interface CustomComponentProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  // If you have specific props for ALL custom MDX components, define them here.
  // Otherwise, individual custom components will infer their specific props.
  // We extend HTMLElement attributes to cover common things like 'id', 'className', etc.
}

// Somewhere near your other interfaces (e.g., above WikiFrontmatter)
// ADD THIS INTERFACE
interface QuizQuestion {
  question: string;
  options: string[]; // Or 'string[]' if options are strings
  answer: string;
}

const components = {
  // Custom components (like Quiz, GlossaryLink) still need their specific types
  // Using CustomComponentProps here covers basic HTML attributes that MDX might pass.
  Quiz: (
    props: CustomComponentProps & { id: string; questions?: QuizQuestion[] }
  ) => {
    if (props.questions) {
      return (
        <div className="p-4 bg-slate-700 rounded-md my-4">
          <p className="font-bold text-xl text-slate-200 mb-4">
            Quiz for ID: {props.id}
          </p>
          {props.questions.map(
            (
              q: QuizQuestion,
              i: number // Now uses QuizQuestion
            ) => (
              <div key={i} className="mb-4">
                <p className="text-lg text-slate-300 mb-2">
                  {i + 1}. {q.question}
                </p>
                {/* You might want to render options here eventually */}
                {/* For now, just showing the question */}
              </div>
            )
          )}
        </div>
      );
    }
    return (
      <div className="p-4 bg-slate-700 rounded-md my-4">
        Interactive Quiz for ID: {props.id} (No questions defined in MDX)
      </div>
    );
  },
  GlossaryLink: (props: CustomComponentProps & { term: string }) => (
    <Link
      href={`/wiki/glossary#${props.term.toLowerCase().replace(/\s/g, "-")}`}
      className="text-teal-300 hover:underline"
    >
      {props.term}
    </Link>
  ),
  FourPillarsDiagram: (props: CustomComponentProps) => (
    <FourPillarsDiagram {...props} />
  ), // Add this
  ProcessModelDiagram: (props: CustomComponentProps) => (
    <ProcessModelDiagram {...props} />
  ), // Add this
  GlossaryTerm: (
    props: CustomComponentProps & { term: string; children: React.ReactNode }
  ) => <GlossaryTerm {...props} />, // Add this
  // ... rest of your existing h1, p, a, etc. overrides ...
  h1: (props: HeadingProps) => (
    <h1 className="text-3xl font-bold text-slate-200 mt-8 mb-4" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2 className="text-2xl font-bold text-slate-300 mt-6 mb-3" {...props} />
  ),
  h3: (props: HeadingProps) => (
    <h3 className="text-xl font-semibold text-slate-300 mt-5 mb-2" {...props} />
  ),
  p: (props: ParagraphProps) => (
    <p className="text-lg text-slate-400 my-4 leading-relaxed" {...props} />
  ),
  a: (props: LinkComponentProps) => (
    <a className="text-blue-400 hover:underline" {...props} />
  ), // Using 'a' here for direct HTML links
  ul: (props: ListProps) => (
    <ul className="list-disc list-inside ml-4 my-4" {...props} />
  ),
  ol: (props: ListProps) => (
    <ol className="list-decimal list-inside ml-4 my-4" {...props} />
  ),
  li: (props: ListItemProps) => (
    <li className="text-slate-400 mb-1" {...props} />
  ),
  strong: (props: CustomComponentProps) => (
    <strong className="font-semibold text-slate-200" {...props} />
  ),
  em: (props: CustomComponentProps) => <em className="italic" {...props} />,
  blockquote: (props: CustomComponentProps) => (
    <blockquote
      className="border-l-4 border-teal-500 pl-4 italic text-slate-300 my-4"
      {...props}
    />
  ),
  hr: () => <hr className="border-t border-slate-700 my-8" />,
  Link: (props: LinkComponentProps) => (
    <Link {...props} className="text-blue-400 hover:underline" />
  )
};

export default async function WikiMDXPage({ params }: WikiPageProps) {
  const slugPath = params.slug.join("/");
  let finalFileName: string; // Use 'let' here as it will be assigned conditionally

  // Try to find 'slug.mdx' first
  const directPath = path.join(process.cwd(), "content", `${slugPath}.mdx`);
  try {
    await fs.access(directPath);
    finalFileName = slugPath; // Direct file exists
  } catch {
    // If direct file doesn't exist, try 'slug/_index.mdx'
    const indexPath = path.join(
      process.cwd(),
      "content",
      slugPath,
      "_index.mdx"
    );
    try {
      await fs.access(indexPath);
      finalFileName = path.join(slugPath, "_index"); // _index file exists
    } catch {
      // If neither exists, then it's a 404
      console.error(
        `Failed to find MDX file for slug: ${slugPath}. Tried ${directPath} and ${indexPath}`
      );
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-red-400 p-8">
          <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
          <p className="text-xl mb-8">
            Could not find content for /{params.slug.join("/")}.
          </p>
          <Link href="/wiki" className="text-teal-300 hover:underline">
            Back to Wiki Map
          </Link>
        </div>
      );
    }
  }

  const filePath = path.join(process.cwd(), "content", `${finalFileName}.mdx`); // Use the determined finalFileName

  let mdxSource: string = ""; // Explicitly type mdxSource
  let frontmatter: WikiFrontmatter = {}; // Use our new interface

  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    frontmatter = data as WikiFrontmatter; // Explicitly cast data to our interface
    mdxSource = content;
  } catch (error) {
    console.error(`Error reading MDX file for path: ${filePath}`, error);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-red-400 p-8">
        <h1 className="text-4xl font-bold mb-4">500 - Server Error</h1>
        <p className="text-xl mb-8">
          Failed to process content for /{params.slug.join("/")}.
        </p>
        <Link href="/wiki" className="text-teal-300 hover:underline">
          Back to Wiki Map
        </Link>
      </div>
    );
  }

  const layoutTheme = frontmatter.theme || "default";
  const isBerkshireHathaway = layoutTheme === "berkshire-hathaway";

  const pageClasses = isBerkshireHathaway
    ? "font-serif bg-white text-black min-h-screen p-8"
    : "bg-slate-900 text-slate-400 min-h-screen p-8";

  return (
    <div className={pageClasses}>
      <div className="max-w-screen-md mx-auto">
        <Link
          href="/wiki"
          className={
            isBerkshireHathaway
              ? "text-blue-800 visited:text-purple-600 hover:underline"
              : "text-slate-500 hover:text-teal-300"
          }
        >
          &lt;&lt; Back to Wiki Map
        </Link>

        <article className="mt-8">
          <MDXRemote source={mdxSource} components={components} />
        </article>
      </div>
    </div>
  );
}
// Inside src/app/wiki/[slug]/page.tsx

export async function generateStaticParams() {
  console.log(
    "Running refined generateStaticParams (Attempt with direct relative path)..."
  );
  const contentDir = path.join(process.cwd(), "content");
  let files: string[] = [];
  try {
    // Read all files recursively from the content directory
    // We get names relative to contentDir because 'recursive: true' does this
    // for path.join(base, file) type of usage.
    files = await fs.readdir(contentDir, { recursive: true });
  } catch (error) {
    console.warn(
      `Content directory not found or unreadable at ${contentDir}. No static params will be generated for MDX.`,
      error
    );
    return [];
  }

  const paths = new Set<string>();

  for (const file of files) {
    // Only process .md or .mdx files
    if (file.endsWith(".mdx") || file.endsWith(".md")) {
      // The 'file' variable from recursive readdir should already be relative to contentDir
      const relativePath = file;

      let pathWithoutExtension = relativePath.replace(/\.(mdx?)$/, "");

      if (pathWithoutExtension.endsWith("/_index")) {
        pathWithoutExtension = pathWithoutExtension.substring(
          0,
          pathWithoutExtension.length - "/_index".length
        );
      }

      if (pathWithoutExtension.length > 0) {
        paths.add(pathWithoutExtension);
      }
    }
  }

  const finalParams = Array.from(paths)
    .map((pathStr) => {
      // Split by path separator and filter out empty segments
      const slugSegments = pathStr
        .split(path.sep)
        .filter((segment) => segment.length > 0);
      return { slug: slugSegments };
    })
    .filter((param) => param.slug.length > 0); // Ensure no empty slug arrays are returned

  console.log("Generated Params (Final):", finalParams);
  return finalParams;
}
