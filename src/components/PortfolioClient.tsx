"use client";

import { type ReactNode } from "react";
import { DataProvider, type PortfolioData } from "@/context/DataContext";
import SiteHead from "@/components/SiteHead";
import CustomCursor from "@/components/CustomCursor";

export default function PortfolioClient({
  initialData,
  children,
}: {
  initialData: PortfolioData;
  children: ReactNode;
}) {
  return (
    <DataProvider initialData={initialData}>
      <SiteHead />
      <CustomCursor />
      {children}
    </DataProvider>
  );
}
