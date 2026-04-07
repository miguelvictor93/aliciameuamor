import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Qual Princesa É Essa?",
  description: "Um quiz encantado sobre princesas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Quicksand:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <div className="relative min-h-svh w-full bg-gradient-to-br from-princess-pink-light via-princess-pink to-princess-purple">
          {children}
          <footer className="absolute bottom-4 w-full text-center text-brand-text/60 text-sm">
            <p>✨ Quiz de Princesas — Feito com muito amor 💕</p>
          </footer>
        </div>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
