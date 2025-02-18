import IntroAsset from "./IntroAsset";
import Introduction from "./Introduction";

function Landing() {
  return (
    <div className="relative h-[calc(100vh-var(--navbar-height))] w-screen overflow-hidden">
      {/* Background waves */}
      <div className="absolute inset-0">
        <div className="wave-container">
          <div className="wave wave1"></div>
          <div className="wave wave2"></div>
          <div className="wave wave3"></div>
          <div className="wave wave4"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative h-full z-10">
        <div className="container mx-auto h-full max-w-7xl">
          <div className="md:flex md:flex-row items-center justify-between h-full px-6">
            <Introduction />
            <IntroAsset />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
