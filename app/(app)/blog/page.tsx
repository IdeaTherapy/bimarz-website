import { Post } from "@/payload-types";
import BlogList from "./BlogList";

interface PostsResponse {
  docs: Post[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

async function getPosts(
  page = 1,
  limit = 10,
  tags?: string[],
  dateFilter?: string
) {
  try {
    let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts?depth=1&page=${page}&limit=${limit}`;

    if (tags && tags.length > 0) {
      url += `&where[tags][in][]=${tags.join("&where[tags][in][]=")}`;
    }

    if (dateFilter) {
      const now = new Date();
      let fromDate = new Date();

      switch (dateFilter) {
        case "هفته اخیر":
          fromDate.setDate(now.getDate() - 7);
          break;
        case "ماه اخیر":
          fromDate.setMonth(now.getMonth() - 1);
          break;
        case "سال اخیر":
          fromDate.setFullYear(now.getFullYear() - 1);
          break;
        default:
          fromDate = new Date(0); // Beginning of time
      }

      url += `&where[createdAt][greater_than]=${fromDate.toISOString()}`;
    }

    const res = await fetch(url, { next: { revalidate: 10 } });

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    return res.json() as Promise<PostsResponse>;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return null;
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string; tags?: string; dateFilter?: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const tags = searchParams.tags ? searchParams.tags.split(",") : undefined;
  const dateFilter = searchParams.dateFilter;

  const postsData = await getPosts(page, 10, tags, dateFilter);

  if (!postsData) {
    return <div>Error loading posts</div>;
  }

  return <BlogList initialData={postsData} />;
}
