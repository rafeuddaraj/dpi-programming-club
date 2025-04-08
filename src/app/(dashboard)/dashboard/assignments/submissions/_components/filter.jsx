"use client";

import { Input } from "@/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import useDebounce from "@/hooks/use-debounce";
import { Filter, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FilterAction({ placeholder, isModerator }) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  const pathname = usePathname();

  const redirect = () => {
    return router.replace(`${pathname}?${newSearchParams?.toString()}`);
  };

  const doSearch = (term) => {
    if (term) {
      newSearchParams.set("q", term);
      redirect();
    } else {
      newSearchParams.delete("q");
      redirect();
    }
  };
  const handleDebounce = useDebounce(doSearch);

  useEffect(() => {
    const query = newSearchParams.get("q");
    const type = newSearchParams.get("status");
    if (query) {
      redirect();
      setSearchTerm(query);
    }
    if (!type) handleType("all");
  }, []);

  const handleType = (type) => {
    newSearchParams.set("status", type);
    redirect();
  };

  return (
    <>
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          className="pl-8"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleDebounce(e.target.value);
          }}
        />
      </div>
      <div className="flex gap-2">
        <Select
          value={newSearchParams?.get("status")}
          onValueChange={handleType}
        >
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="marked">Marked</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            {!isModerator && (
              <SelectItem value="published">PUBLISHED</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
