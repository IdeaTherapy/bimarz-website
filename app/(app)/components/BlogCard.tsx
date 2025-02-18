"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/payload-types";
import { useRouter } from "next/navigation";
interface LexicalTextNode {
  type: "text";
  text: string;
  detail: number;
  format: number;
  mode: "normal";
  style: string;
  version: number;
}

interface LexicalParagraphNode {
  type: "paragraph";
  children: LexicalTextNode[];
  direction: "ltr" | "rtl" | null;
  format: string;
  indent: number;
  version: number;
}

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  const router = useRouter();
  // Get the first paragraph of content for the excerpt
  const excerpt =
    (post.content.root.children as unknown as LexicalParagraphNode[]).find(
      (child) => child.type === "paragraph"
    )?.children?.[0]?.text || "...";

  return (
    <Card
      className="w-[400px] overflow-hidden cursor-pointer"
      onClick={() => router.push(`/blog/${post.id}`)}
    >
      <div className="relative h-[300px] w-full mb-5">
        {typeof post.featuredImage !== "string" && (
          <Image
            src={`${process.env.NEXT_PUBLIC_SERVER_URL}${post.featuredImage.url}`}
            alt={post.featuredImage.alt || post.title}
            fill
            className="object-cover"
          />
        )}
      </div>

      <CardContent>
        <div className="flex flex-row justify-between">
          <h2 className="text-2xl font-bold">{post.title}</h2>
          {post.tags?.[0] && typeof post.tags[0] !== "string" && (
            <Badge
              variant="default"
              className="bg-[#00966D] rounded-full shadow-none min-w-[70px]"
            >
              <p className="mx-auto">{post.tags[0].name}</p>
            </Badge>
          )}
        </div>
        <div className="my-5 text-lg text-justify">
          <p>
            {excerpt.length > 200 ? `${excerpt.slice(0, 200)}...` : excerpt}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row justify-end text-[#671D57] mb-[-10px] font-bold text-xl -mt-[20px]">
        <Link href={`/blog/${post.id}`}>- بخوانید -</Link>
      </CardFooter>
    </Card>
  );
}
