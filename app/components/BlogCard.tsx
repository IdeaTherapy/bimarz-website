import { Card } from "@/components/ui/card";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import Image from "next/image";
import Link from "next/link";
function BlogCard() {
  return (
    <Card className="w-[600px]">
      <CardHeader className="flex flex-row justify-center">
        <Image src="/next.svg" alt="Blog Image" width={600} height={600} />
        {/* <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription> */}
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
        <div className="my-10">محتوا</div>
      </CardContent>
      <CardFooter className="flex flex-row justify-end text-[#671D57] mb-[-10px]">
        <Link href="/blog/1">- بخوانید -</Link>
      </CardFooter>
    </Card>
  );
}

export default BlogCard;
