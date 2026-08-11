import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers/providers";
import { AppShell } from "@/components/layout/app-shell";
import { Inter, Outfit, Geist_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Apex CRM - Commercial Next.js Admin Theme",
  description: "High-converting CRM & Customer Portal Admin Dashboard Template built with Next.js, Tailwind CSS, and shadcn design tokens.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(inter.variable, outfit.variable, geistMono.variable)}>
      <body className="antialiased">
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
