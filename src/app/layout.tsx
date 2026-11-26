import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const display = localFont({
  src: "./fonts/Anton-Regular.ttf",
  variable: "--font-display",
  display: "swap",
});
const grunge = localFont({
  src: "./fonts/RubikDirt-Regular.ttf",
  variable: "--font-grunge",
  display: "swap",
});
const body = localFont({
  src: "./fonts/DMSans.ttf",
  variable: "--font-body",
  weight: "100 1000",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Karthikeyan R.V. — AI Workflows & Software Engineering",
  description: "Software Engineer II at Oracle Hospitality. Full-stack engineering, agentic AI workflows, and RAG systems for OPERA Cloud.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/resources/logoblack.svg" />
      </head>
      <body className={`${display.variable} ${grunge.variable} ${body.variable} pw-dark-mode`}>
        {children}
      </body>
    </html>
  );
}
