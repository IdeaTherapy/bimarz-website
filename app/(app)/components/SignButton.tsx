"use client";
import { useRouter } from "next/navigation";

function SignButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push("/#projects");
      }}
      className="bg-[var(--secondary-400)] text-white px-8 py-3 rounded-full text-lg hover:bg-[var(--secondary-600)] transition-colors flex items-center gap-2"
    >
      شریک بی‌مرز شوید
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
  );
}

export default SignButton;
