"use client";

import { useEffect } from "react";

const TRACK_URL = "https://chatbot-739f48fb.fastapicloud.dev/track";

export default function TrackVisit() {
  useEffect(() => {
    fetch(TRACK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
      }),
      keepalive: true,
    }).catch(() => {});
  }, []);

  return null;
}
