import NoticeList from "@/components/notice/notice-list";
import SearchAction from "@/components/notice/search";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import CreateNoticeButton from "./_components/create-notice-button";

export default async function NoticePage({ searchParams: searchParam }) {
  const searchParams = await searchParam;
  const page = parseInt(searchParams.page) || 1;
  const limit = parseInt(searchParams.limit) || 10;
  const query = searchParams.q || "";
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Notice Board</h1>
        <CreateNoticeButton />
      </div>
      <Suspense
        fallback={
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 border rounded-lg">
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        }
      >
        <div className="mb-5">
          <SearchAction />
        </div>
        <NoticeList page={page} limit={limit} query={query} />
      </Suspense>
    </div>
  );
}
