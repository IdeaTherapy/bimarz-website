"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import moment from "jalali-moment";
import type { Post } from "@/payload-types";
import { formatPersianNumber } from "../../utils/numbers";

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

interface LexicalUploadNode {
  type: "upload";
  value: Post["featuredImage"];
  version: number;
  fields: null;
  relationTo: "media";
}

type LexicalNode = LexicalParagraphNode | LexicalUploadNode;

interface BlogPostProps {
  post: Post;
}

export default function BlogPost({ post }: BlogPostProps) {
  const persianDate = formatPersianNumber(
    moment(post.createdAt).locale("fa").format("DD MMMM YYYY")
  );

  // Type assertion for Lexical content
  const content = post.content.root.children as unknown as LexicalNode[];

  return (
    <article className="min-h-screen bg-white pb-20">
      {/* Hero Section */}
      <div className="relative h-[500px] w-full">
        {typeof post.featuredImage !== "string" && (
          <Image
            src={`${process.env.NEXT_PUBLIC_SERVER_URL}${post.featuredImage.url}`}
            alt={post.featuredImage.alt || post.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-4 -mt-20 relative">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-row justify-between items-center mb-4">
              <div className="flex gap-2">
                <h1 className="text-4xl font-bold text-right mb-4 pt-4">
                  {post.title}
                </h1>
              </div>
              <time className="text-[var(--heading)] text-lg">
                {persianDate}
              </time>
            </div>
          </div>

          {/* Main Content */}
          <div className="prose prose-lg max-w-none text-right">
            {content.map((block, index) => {
              if (block.type === "paragraph") {
                return (
                  <p
                    key={index}
                    className="text-xl leading-relaxed text-justify mb-6"
                  >
                    {block.children?.[0]?.text || ""}
                  </p>
                );
              }
              if (
                block.type === "upload" &&
                block.value &&
                typeof block.value !== "string"
              ) {
                return (
                  <div key={index} className="my-8 relative h-[400px] w-full">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_SERVER_URL}${block.value.url}`}
                      alt={block.value.alt || "Content image"}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>

          {/* Share Section */}
          <div className="mt-12 pt-6 border-t border-gray-200">
            <div className="flex flex-row justify-between items-center">
              <div className="flex gap-4">
                {post.tags?.map((tag) => {
                  if (typeof tag === "string") return null;
                  return (
                    <Badge
                      key={tag.id}
                      variant="default"
                      className="bg-[var(--tag-badge)] text-[var(--heading)] hover:bg-[var(--tag-badge)]"
                    >
                      #{tag.name}
                    </Badge>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
