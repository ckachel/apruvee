import { useEffect } from "react";
import { useLocation } from "wouter";
import { trackPageView } from "@/lib/analytics";

export function useAnalyticsPageViews(): void {
  const [location] = useLocation();

  useEffect(() => {
    const base = import.meta.env.BASE_URL.replace(/\/$/, "");
    const fullPath = `${base}${location || "/"}`;
    trackPageView(fullPath);
  }, [location]);
}
