"use client"

import { Input } from "@/components/input";
import useDebounce from "@/hooks/use-debounce";
import { useFilter } from "@/hooks/use-filter";
import { Search } from "lucide-react";

export default function WorkshopSearch() {
    const { onUpdate } = useFilter()
    const doSearch = (term) => {
        onUpdate("q", term)
    }
    const handleDebounce = useDebounce(doSearch)
    return (
        <>
            <div className="relative w-full max-w-[180px]">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search modules..."
                    className="pl-8 h-9 text-sm"
                    onChange={(e) => handleDebounce(e.target.value)}
                />
            </div>
        </>
    );
}