import type { Metadata } from "next";
import "./globals.css";
import SiteHead from "@/components/SiteHead";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Software engineer & full-stack developer portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased">
        <SiteHead />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
