"use client";

import { getAllUserWithoutManagement } from "@/app/actions/users";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Masonry from "react-masonry-css";
import { CommonEmptyState } from "../common/empty-states";
import MemberCard from "./member-card";

// Breakpoint columns for the masonry layout
const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};

export default function MemberList({ query }) {
  const [memberLists, setMemberLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);
  const timerRef = useRef();

  useEffect(() => {
    setPage(1);
    setMemberLists([]);
    setHasMore(true);
  }, [query]);

  const loadMoreMembers = async () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      if (loading) return;

      setLoading(true);
      // Simulate API call delay

      try {
        const resp = await getAllUserWithoutManagement(query, page, 30);
        const data = resp?.data?.data;
        const pagination = data?.pagination;
        const members = data?.data || [];

        setMemberLists((prev) => [...prev, ...members]);
        setPage((prev) => prev + 1);
        setLoading(false);
        setHasMore(pagination?.currentPage <= pagination?.totalPages);
      } catch {
        //
      }
    }, 200);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          loadMoreMembers();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [memberLists, loading]);

  return (
    <div className="space-y-6">
      {memberLists?.length ? (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-4"
          columnClassName="pl-4 bg-clip-padding"
        >
          {memberLists.map((member) => (
            <div key={member.id} className="mb-4">
              <MemberCard member={member} />
            </div>
          ))}
        </Masonry>
      ) : !loading ? (
        <CommonEmptyState
          title="No Users Found"
          description="There are no users available at this moment."
          icon={<Users className="h-12 w-12 text-muted-foreground/60" />}
        />
      ) : null}

      {hasMore ? (
        <div ref={loaderRef} className="flex justify-center py-4">
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-16 w-16 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-4 w-[100px]" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          {!query && (
            <div className="w-full max-w-2xl mx-auto mt-6 mb-10">
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex flex-col items-center justify-center text-center space-y-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">All Members Loaded</h3>
                  <p className="text-muted-foreground max-w-md">
                    You've reached the end of the member list. There are no more
                    members to display.
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
