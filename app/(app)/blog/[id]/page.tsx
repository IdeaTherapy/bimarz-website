import Image from "next/image";
import { Badge } from "@/components/ui/badge";

function BlogPage() {
  return (
    <article className="min-h-screen bg-gradient-to-bl from-[#ADDE65] to-[#63EDC8] pb-20">
      {/* Hero Section */}
      <div className="relative h-[500px] w-full">
        <Image
          src="/book-card-mock.png"
          alt="Blog Cover"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-4 -mt-20 relative">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-row justify-between items-center mb-4">
              <Badge
                variant="default"
                className="bg-[#00966D] rounded-full shadow-none px-4 py-1"
              >
                <p className="mx-auto text-lg">دسته‌بندی گزارش</p>
              </Badge>
              <time className="text-gray-500 text-lg">۱۵ آذر ۱۴۰۳</time>
            </div>
            <h1 className="text-4xl font-bold text-right mb-4">
              گزارش فعالیت‌های بی‌مرز
            </h1>
          </div>

          {/* Main Content */}
          <div className="prose prose-lg max-w-none text-right">
            <p className="text-xl leading-relaxed text-justify mb-6">
              در آذرماه ۱۴۰۳ گروه داوطلبین ما در شهرهای خراسان جنوبی و روستاهای
              تابعه آن‌ها به فعالیت پرداختند. در این دوره از فعالیت گروه
              داوطلبین بی‌مرز تعداد ۲۵۰ کتاب نو تحویل مدارس منطقه شد و ۵
              کتابخانه برای دانش‌آموزان منطقه تجهیز شد.
            </p>

            <h2 className="text-2xl font-bold mb-4">اهداف پروژه</h2>
            <ul className="list-disc pr-6 mb-6">
              <li>ارتقای سطح دسترسی به منابع آموزشی</li>
              <li>تجهیز کتابخانه‌های مدارس روستایی</li>
              <li>برگزاری کارگاه‌های آموزشی</li>
            </ul>

            <div className="my-8 relative h-[400px] w-full">
              <Image
                src="/book-card-mock.png"
                alt="تصویر گزارش"
                fill
                className="object-cover rounded-xl"
              />
            </div>

            <h2 className="text-2xl font-bold mb-4">دستاوردها</h2>
            <p className="text-xl leading-relaxed text-justify mb-6">
              با همکاری تیم داوطلبین و حمایت‌های مردمی، توانستیم به اهداف تعیین
              شده دست پیدا کنیم. مهم‌ترین دستاوردهای این دوره شامل افزایش ۳۰
              درصدی دسترسی دانش‌آموزان به منابع آموزشی و ایجاد فضای مناسب مطالعه
              برای بیش از ۵۰۰ دانش‌آموز بوده است.
            </p>
          </div>

          {/* Share Section */}
          <div className="mt-12 pt-6 border-t border-gray-200">
            <div className="flex flex-row justify-between items-center">
              <div className="flex gap-4">
                <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer">
                  #آموزش
                </Badge>
                <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer">
                  #توسعه_پایدار
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default BlogPage;
