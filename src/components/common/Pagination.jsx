"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFilter } from "@/hooks/use-filter";
import { ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

export default function Pagination({ pagination }) {
  const { onUpdate } = useFilter();

  // Available page size options
  const limitOptions = [10, 20, 30, 50, 100];
  const searchParams = useSearchParams();
  const currentSelectedLimit = searchParams.get("limit");
  return (
    <>
      <div className="data-table-pagination flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-sm text-muted-foreground my-2">
          Showing <strong>{pagination?.currentPage}</strong> to{" "}
          <strong>{pagination?.totalPages}</strong> of{" "}
          <strong>{pagination?.totalCount}</strong> results
        </div>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                {currentSelectedLimit || pagination?.limit || 10} per page
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {limitOptions.map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => onUpdate("limit", option)}
                  className={
                    Number(currentSelectedLimit) === option ||
                    (!currentSelectedLimit && pagination?.limit === option)
                      ? "bg-muted"
                      : ""
                  }
                >
                  {option} per page
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            onClick={() =>
              onUpdate("page", Number.parseInt(pagination?.currentPage) - 1)
            }
            variant="outline"
            size="sm"
            disabled={pagination?.currentPage <= 1}
          >
            Previous
          </Button>
          <Button
            onClick={() =>
              onUpdate("page", Number.parseInt(pagination?.currentPage) + 1)
            }
            variant="outline"
            size="sm"
            disabled={pagination?.currentPage === pagination?.totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
