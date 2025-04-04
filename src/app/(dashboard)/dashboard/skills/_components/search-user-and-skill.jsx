"use client";

import { Input } from "@/components/input";
import { Search } from "lucide-react";

export default function SearchUserAndSkill() {
  return (
    <>
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search by user or skill..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-8"
      />
    </>
  );
}
