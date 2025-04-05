"use client";
import { Filter, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../button";
import { Input } from "../ui/input";

export default function FilterAction({ placeholder }) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  const [searchTerm, setSearchTerm] = useState("");
  const pathname = usePathname();
  useEffect(() => {
    setSearchTerm(newSearchParams?.get("q"));
  }, []);
  return (
    <>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="search"
          placeholder={placeholder || "Search events..."}
          className="w-[250px] pl-8"
        />
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          if (searchTerm) {
            newSearchParams.set("q", searchTerm);
          } else {
            newSearchParams.delete("q");
          }
          replace(`${pathname}?${newSearchParams.toString()}`);
        }}
      >
        <Filter className="mr-2 h-4 w-4" />
        Filter
      </Button>
    </>
  );
}
