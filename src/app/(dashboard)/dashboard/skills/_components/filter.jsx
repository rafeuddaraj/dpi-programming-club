"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { Filter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function FilterAction({ isAdmin }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  const pathname = usePathname();

  const redirect = () => {
    return router.replace(`${pathname}?${newSearchParams?.toString()}`);
  };

  useEffect(() => {
    const status = newSearchParams.get("status");
    if (!status) handleStatusType("all");
  }, []);

  const handleStatusType = (type) => {
    newSearchParams.set("status", type?.toLowerCase());
    redirect();
  };
  return (
    <>
      <div className="flex items-center space-x-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Select
          value={newSearchParams?.get("status")?.toUpperCase()}
          onValueChange={handleStatusType}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Statuses</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="REVIEWED">Reviewed</SelectItem>
            {isAdmin && (
              <>
                <SelectItem value="APPROVED">Approved</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
              </>
            )}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
