"use client";
import { Card } from "@/components/ui/card";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useViewportSize } from "../hooks/useViewportSize";

function BlogCard({ id }: { id: number }) {
  const router = useRouter();
  const viewportSize = useViewportSize();
  return (
    <Card
      className={`w-[400px] md:w-[400px] transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg cursor-pointer ${
        viewportSize === "sm" ? "w-[350px]" : ""
      }`}
      onClick={() => router.push(`/blog/${id}`)}
    >
      <CardHeader
        className={`p-0 mb-5 ${
          viewportSize === "sm" ? "h-[200px]" : "h-[300px]"
        } shadow`}
      >
        <Image
          src="/book-card-mock.png"
          alt="Blog Image"
          width={600}
          height={600}
          className="w-full h-full object-cover rounded-t-xl shadow"
        />
      </CardHeader>
      <CardContent>
        <div className="flex flex-row justify-between">
          <h2 className="text-2xl font-bold">عنوان گزارش</h2>
          <Badge
            variant="default"
            className="bg-[#00966D] rounded-full shadow-none min-w-[70px]"
          >
            <p className="mx-auto">دسته‌بندی گزارش</p>
          </Badge>
        </div>
        <div className="my-5 text-lg text-justify">
          <p>
            در آذرماه ۱۴۰۳ گروه داوطلبین ما در شهرهای خراسان جنوبی و روستاهای
            تابعه آن‌ها به فعالیت پرداختند. در این دوره از فعالیت گروه داوطلبین
            بی‌مرز تعداد ۲۵۰ کتاب نو تحویل مدارس منطقه شد و ۵ کتابخانه برای
            دانش‌آموزان منطقه تجهیز شد و ...
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row justify-end text-[#671D57] mb-[-10px] font-bold text-xl -mt-[20px]">
        <Link href="/blog/1">- بخوانید -</Link>
      </CardFooter>
    </Card>
  );
}

export default BlogCard;
