"use client";
import Image from "next/image";
import { useViewportSize } from "../hooks/useViewportSize";
import SignButton from "./SignButton";

function IntroAsset() {
  const viewportSize = useViewportSize();

  return (
    <div className="flex flex-col items-center justify-center md:w-1/2 my-10 md:my-0">
      <Image
        src="/intro-asset.jpg"
        alt="Intro Asset"
        width={viewportSize === "sm" ? 300 : 600}
        height={viewportSize === "sm" ? 200 : 400}
        className="shadow-lg rounded-xl"
      />
      <div className="block md:hidden my-10">
        <SignButton />
      </div>
    </div>
  );
}

export default IntroAsset;
