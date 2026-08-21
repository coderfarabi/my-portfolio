import type { Metadata } from "next";
import { Antonio, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const antonio = Antonio({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

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
    <html lang="en" className={`dark ${antonio.variable} ${inter.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "new MutationObserver(function(){document.querySelectorAll('[fdprocessedid]').forEach(function(e){e.removeAttribute('fdprocessedid')})}).observe(document.documentElement,{attributes:true,subtree:true,childList:true,attributeFilter:['fdprocessedid']})",
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
