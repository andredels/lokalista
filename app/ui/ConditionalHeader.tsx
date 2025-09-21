"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";

export default function ConditionalHeader() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render header on landing page
  if (!mounted || pathname === "/") {
    return null;
  }

  return <Header />;
}
