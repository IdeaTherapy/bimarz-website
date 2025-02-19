import SignButton from "./SignButton";

function Introduction() {
  return (
    <div className="flex flex-col items-start justify-center w-full max-w-2xl gap-10 px-4">
      <h1 className="text-2xl md:text-4xl font-bold text-right mb-2 mt-24 md:mt-10">
        برای گسترش عادلانه جریان آگاهی
      </h1>
      <div className="flex flex-col justify-center items-center ml-5">
        <p className="text-md md:text-lg text-gray-700 leading-8 text-justify">
          باشگاه کتابخوانی ازتا همچنان تلاش می‌کند کتابخوانی را در گوشه و کنار
          این مرز و بوم زنده و پایا نگاه دارد. در این میان بسیاری هستند که
          علیرغم ذوق و اشتیاق به کتابخوانی، دسترسی به کتاب‌های خوب ندارند.
          کودکان، نوجوانان و حتی بزرگسالانی که حتی یک جلد کتاب می‌تواند تاثیری
          شگرف در زندگی آن‌ها بگذارد و منتظر لحظه‌ای هستند که در بیکران قصه‌ها
          غرق شوند.
        </p>
      </div>
      <div className="hidden md:block">
        <SignButton />
      </div>
    </div>
  );
}

export default Introduction;
