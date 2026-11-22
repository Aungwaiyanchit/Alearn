import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ALearn — Burmese to English Writing Practice",
  description:
    "Practice English writing skills with Burmese prompts, animated typing feedback, categories, and custom random practice sets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
