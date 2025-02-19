"use client";
import SignButton from "./SignButton";

function IntroAsset() {
  return (
    <div className="flex flex-col items-center justify-center md:w-1/2 my-10 md:my-0">
      {/* <Image
        src="/intro-asset.jpg"
        alt="Intro Asset"
        width={viewportSize === "sm" ? 300 : 600}
        height={viewportSize === "sm" ? 200 : 400}
        className="shadow-lg rounded-xl"
      /> */}
      <video
        className="w-full max-w-[300px] shadow-lg rounded-xl mb-10"
        controls
        playsInline
      >
        <source src="/intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="block md:hidden my-10">
        <SignButton />
      </div>
    </div>
  );
}

export default IntroAsset;
