"use client"

import { Card, CardContent } from "@/components/card";
import { Input } from "@/components/input";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/select";
import { Button } from "@/components/ui/button";
import useDebounce from "@/hooks/use-debounce";
import { Search, SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FilterAction() {
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
        if (query) {
            redirect()
            setSearchTerm(query)
        }

    }, [])

    const [showFilters, setShowFilters] = useState(false)

    return (
        <>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search students..."
                        className="pl-8 w-full sm:w-[300px]"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                            handleDebounce(e.target.value)
                        }}
                    />
                </div>
                <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="w-full sm:w-auto">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filters
                </Button>
            </div>

            {showFilters && (
                <Card className="mb-4">
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Department</label>
                                {/* <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Filter by department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {departments.map((dept) => (
                                            <SelectItem key={dept} value={dept}>
                                                {dept === "all" ? "All Departments" : dept}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select> */}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Shift</label>
                                <Select value={"shiftFilter"} onValueChange={() => { }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Filter by shift" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {/* {shifts.map((shift) => (
                                            <SelectItem key={shift} value={shift}>
                                                {shift === "all" ? "All Shifts" : shift}
                                            </SelectItem>
                                        ))} */}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </>
    );
}