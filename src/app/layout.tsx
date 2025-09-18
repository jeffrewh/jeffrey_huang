// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Spotlight from "@/components/Spotlight";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jeffrey Huang | Engineering Portfolio",
  description:
    "A digital garden and portfolio for my engineering and software projects."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} bg-slate-900 leading-relaxed text-slate-400`}
      >
        <div
          className="pointer-events-none fixed inset-0 z-10 transition duration-300 lg:hidden"
          style={{
            background:
              "radial-gradient(600px at 50% 100px, rgba(29, 78, 216, 0.15), transparent 80%)"
          }}
        ></div>
        <Spotlight />
        {children}
      </body>
    </html>
  );
}
