function SignButton() {
  return (
    <button className="bg-[#671D57] text-white px-8 py-3 rounded-full text-lg hover:bg-[#320d2a] transition-colors flex items-center gap-2">
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
