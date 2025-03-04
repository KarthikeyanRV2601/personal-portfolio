import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Karthikeyan R V",
  description: "Personal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Work+Sans:wght@400;700&display=swap"
        />
        <link rel="stylesheet" href="https://geists-fonts.vercel.app/stylesheet.css" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
