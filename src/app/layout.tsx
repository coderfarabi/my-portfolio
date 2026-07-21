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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "new MutationObserver(function(){document.querySelectorAll('[fdprocessedid]').forEach(function(e){e.removeAttribute('fdprocessedid')})}).observe(document.documentElement,{attributes:true,subtree:true,childList:true,attributeFilter:['fdprocessedid']})",
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <SiteHead />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
