import SignButton from "./SignButton";

function Introduction() {
  return (
    <div className="flex flex-col items-start justify-center w-full max-w-2xl gap-10 px-4">
      <h1 className="text-4xl md:text-6xl font-bold text-right mb-2 mt-10">
        [شعار بی‌مرز]
      </h1>
      <div className="flex flex-col justify-center items-center">
        <p className="text-md md:text-lg text-gray-700 leading-8 text-justify">
          پروژه «بی‌مرز» با عشق به کتاب و آگاهی شکل گرفته تا لبخند را به چهره
          کسانی بیاورد که در گوشه‌وکنار این سرزمین، دسترسی کمتری به منابع آموزشی
          و فرهنگی دارند. در این مسیر، ما به تجهیز کتابخانه‌های مناطق محروم و
          ارسال کتاب به دل روستاها و شهرهای دورافتاده می‌پردازیم، تا هیچ مرزی
          مانع رسیدن دانش نشود. اگر دوست دارید شما هم سهمی در این حرکت زیبا
          داشته باشید، بسته‌های پرداختی متنوعی آماده کرده‌ایم که با هر بودجه‌ای
          می‌توانید در این کار خیر شریک شوید و دل‌های بیشتری را روشن کنید.
        </p>
      </div>
      <div className="hidden md:block">
        <SignButton />
      </div>
    </div>
  );
}

export default Introduction;
