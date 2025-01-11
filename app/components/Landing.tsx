import IntroAsset from "./IntroAsset";
import Introduction from "./Introduction";
function Landing() {
  return (
    <div className="md:flex md:flex-row items-center justify-center h-[calc(100vh-var(--navbar-height))] w-screen bg-gradient-to-bl from-[#5AEFD4] to-[#F0AF5B]">
      <Introduction />
      <IntroAsset />
    </div>
  );
}

export default Landing;
