import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

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
          `${inter.variable} ${geistMono.variable}` +
          " grid h-dvh w-dvw grid-rows-[auto__1fr__auto] antialiased"
        }
      >
        <Navigation />
        <main className="overflow-y-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
