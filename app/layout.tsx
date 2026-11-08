import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers/providers";
import { NavigationLoader } from "@/components/layout/navigation-loader";

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
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Geist:ital,wght@0,100..900;1,100..900&family=Manrope:wght@200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <NavigationLoader />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
