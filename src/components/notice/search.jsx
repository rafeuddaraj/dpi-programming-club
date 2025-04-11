"use client";

import useDebounce from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "../input";

export default function SearchAction({ placeholder, className }) {
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
    if (query) {
      redirect();
      setSearchTerm(query);
    }
  }, []);

  return (
    <>
      <div className={cn(`relative flex-1 w-1/4`, className)}>
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
    </>
  );
}
