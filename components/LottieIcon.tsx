"use client";
import dynamic from "next/dynamic";

// Dynamically import Player to avoid SSR issues
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

export default function LottieIcon({json}:{json:string}) {
  return <Player autoplay loop src={json} style={{ height: 60, width: 60 }} />;
}
