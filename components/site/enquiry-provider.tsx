"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { PackageId } from "@/app/content";

type EnquiryContextValue = {
  selectedPackage: PackageId;
  selectPackage: (value: PackageId) => void;
};

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [selectedPackage, selectPackage] = useState<PackageId>("advanced");
  const value = useMemo(() => ({ selectedPackage, selectPackage }), [selectedPackage]);
  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

export function useEnquirySelection() {
  const value = useContext(EnquiryContext);
  if (!value) throw new Error("useEnquirySelection must be used inside EnquiryProvider");
  return value;
}
