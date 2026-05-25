"use client";

import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});
const ScrollProgress = dynamic(() => import("@/components/ScrollProgress"), {
  ssr: false,
});
const GiftReveal = dynamic(() => import("@/components/GiftReveal"), {
  ssr: false,
});
const AudioPlayer = dynamic(() => import("@/components/AudioPlayer"), {
  ssr: false,
});

export default function ClientOnlyOverlays() {
  return (
    <>
      <GiftReveal />
      <AudioPlayer />
      <CustomCursor />
      <ScrollProgress />
    </>
  );
}
