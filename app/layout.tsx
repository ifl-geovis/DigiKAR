import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DigiKAR Prototype",
  description:
    'Explorative, punktbasierte Visualisierungen für das Heilige Römische Reich deutscher Nation ("Altes Reich").',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={
          inter.className + " grid h-dvh w-dvw grid-rows-[auto,_1fr,_auto]"
        }
      >
        <Navigation />
        <main className="overflow-y-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
