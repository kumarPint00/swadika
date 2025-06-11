"use client";
import { Player } from "@lottiefiles/react-lottie-player";
export default function LottieIcon({json}:{json:string}) {
  return <Player autoplay loop src={json} style={{ height: 60, width: 60 }} />;
}
