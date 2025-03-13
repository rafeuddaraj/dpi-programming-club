'use client'

import useDebounce from "@/hooks/use-debounce";
import { Filter, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "../input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";

export default function FilterAction({ placeholder }) {
    const [searchTerm, setSearchTerm] = useState("")
    const router = useRouter()
    const searchParams = useSearchParams()
    const newSearchParams = new URLSearchParams(searchParams)
    const pathname = usePathname()

    const redirect = () => {
        return router.replace(`${pathname}?${newSearchParams?.toString()}`)
    }

    const doSearch = (term) => {
        if (term) {
            newSearchParams.set("q", term)
            redirect()
        } else {
            newSearchParams.delete("q")
            redirect()
        }
    }
    const handleDebounce = useDebounce(doSearch)

    useEffect(() => {
        const query = newSearchParams.get("q")
        const status = newSearchParams.get("status")
        const type = newSearchParams.get("type")
        if (query) {
            redirect()
            setSearchTerm(query)
        }
        if (!type) handleType("all")
        if (!status) handleStatusType("all")

    }, [])

    const handleType = (type) => {
        newSearchParams.set("type", type)
        redirect()
    }
    const handleStatusType = (type) => {
        newSearchParams.set("status", type)
        redirect()
    }


    return (
        <>
            <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder={placeholder}
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value)
                        handleDebounce(e.target.value)
                    }}
                />
            </div>
            <div className="flex gap-2">
                <Select value={newSearchParams?.get("type")} onValueChange={handleType}>
                    <SelectTrigger className="w-[180px]">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="offline">Offline</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={newSearchParams?.get("status")} onValueChange={handleStatusType}>
                    <SelectTrigger className="w-[180px]">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </>
    );
}