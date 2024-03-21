import Navigation from "@/components/Navigation";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DigiKAR Prototype",
  description:
    'Explorative, point-based visualizations for the context of the Holy Roman Empire ("Altes Reich").',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="container">{children}</main>
        <footer className="container mt-5 py-3 text-xs">
          DigiKAR · {new Date().getFullYear()}
        </footer>
      </body>
    </html>
  );
}
