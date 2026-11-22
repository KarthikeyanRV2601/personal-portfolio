import type { Metadata } from "next";
import { Montserrat, Work_Sans } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-work-sans",
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
      <body className={`${montserrat.variable} ${workSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
