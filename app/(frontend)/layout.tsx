import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "DigiForge — Forge Better Digital Businesses",
  description:
    "DigiForge is an independent digital agency in Sri Lanka helping ambitious businesses build, launch and grow through Strategy, Technology, Creative and AI.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-forge-black text-pure-white">
        {children}
      </body>
    </html>
  );
}
