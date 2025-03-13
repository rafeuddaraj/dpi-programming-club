"use client"

import { Button } from "@/components/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function StatusFilter() {
    const router = useRouter()
    const pathname = usePathname()
    const search = useSearchParams()
    const searchParams = new URLSearchParams(search)
    useEffect(() => {
        const status = searchParams?.get("status")
        if (status) {
            router.replace(`${pathname}?${searchParams?.toString()}`)
        } else {
            searchParams.set("status", "up-coming")
            router.replace(`${pathname}?${searchParams?.toString()}`)
        }
    }, [])
    const handleFilter = (value) => {
        searchParams.set("status", value)
        router.replace(`${pathname}?${searchParams?.toString()}`)
    }
    const getActiveClass = (value = "") => {
        return searchParams?.get("status")?.toLocaleLowerCase() === value?.toLocaleLowerCase() ? "bg-accent text-accent-foreground" : ""
    }
    return (
        <>
            <Button className={getActiveClass("all")} onClick={() => handleFilter("all")} variant="outline" size="sm">
                All
            </Button>
            <Button className={getActiveClass("up-coming")} variant="outline" size="sm" onClick={() => handleFilter("up-coming")}>
                Up Coming
            </Button>
            <Button className={getActiveClass("complete")} variant="outline" size="sm" onClick={() => handleFilter("complete")}>
                Complete
            </Button>
        </>
    );
}