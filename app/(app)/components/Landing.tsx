import IntroAsset from "./IntroAsset";
import Introduction from "./Introduction";

function Landing() {
  return (
    <div className="md:flex md:flex-row items-center bg-gradient-to-bl justify-center h-[calc(100vh-var(--navbar-height))] w-screen from-[var(--primary-100)] to-[var(--primary-700)]">
      <Introduction />
      <IntroAsset />
    </div>
  );
}

export default Landing;
