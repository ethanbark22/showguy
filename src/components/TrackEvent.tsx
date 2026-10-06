"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/** Fires one analytics event when the page is viewed. Renders nothing. */
export function TrackEvent({ name, props }: { name: string; props?: Record<string, string | number | boolean> }) {
  useEffect(() => {
    track(name, props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);
  return null;
}
