import IntroAsset from "./IntroAsset";
import Introduction from "./Introduction";

function Landing() {
  return (
    <div className="md:flex md:flex-row items-center justify-center h-[calc(100vh-var(--navbar-height))] w-screen">
      <Introduction />
      <IntroAsset />
    </div>
  );
}

export default Landing;
