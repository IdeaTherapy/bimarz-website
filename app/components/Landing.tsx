import IntroAsset from "./IntroAsset";
import Introduction from "./Introduction";
function Landing() {
  return (
    <div className="md:flex md:flex-row items-center justify-center h-[calc(100vh-var(--navbar-height))] w-screen bg-gradient-to-bl from-[#ADDE65] to-[#63EDC8]">
      <Introduction />
      <IntroAsset />
    </div>
  );
}

export default Landing;
