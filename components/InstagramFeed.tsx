"use client";
import { useEffect } from "react";

export default function InstagramFeed() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const s=document.createElement("script");
      s.src="https://cdn2.woxo.tech/a.js"; s.async=true;
      document.body.appendChild(s);
    }
  }, []);
  return (
    <div
      className="woxo-instagram-feed"
      data-widget-id="YOUR_WOXO_WIDGET_ID"
      style={{ width: "100%", overflow: "hidden" }}
    />
  );
}
