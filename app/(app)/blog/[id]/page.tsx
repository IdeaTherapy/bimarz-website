import { notFound } from "next/navigation";
import type { Post } from "@/payload-types";
import BlogPost from "./BlogPost";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function getPost(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/${id}?depth=1&draft=false`,
      { next: { revalidate: 10 } }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch post");
    }
    return res.json() as Promise<Post>;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export default async function BlogPage({ params }: Props) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.id);

  if (!post) {
    notFound();
  }

  return <BlogPost post={post} />;
}
