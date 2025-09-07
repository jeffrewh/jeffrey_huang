// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
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
    <html lang="en">
      <body
        className={`${inter.className} bg-slate-900 leading-relaxed text-slate-400`}
      >
        <Spotlight />
        {children}
        <Footer />
      </body>
    </html>
  );
}
