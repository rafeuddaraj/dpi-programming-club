"use client"

import { useFilter } from "@/hooks/use-filter";
import { Button } from "../ui/button";


export default function Pagination({ pagination }) {

    const { onUpdate } = useFilter()


    return (
        <>
            <div className="data-table-pagination">
                <div className="text-sm text-muted-foreground">
                    Showing <strong>{pagination?.currentPage}</strong> to <strong>{pagination?.totalPages}</strong> of{" "}
                    <strong>{pagination?.totalCount}</strong> results
                </div>
                <div className="flex items-center space-x-2">
                    <Button onClick={() => {
                        onUpdate("page", parseInt(pagination?.currentPage - 1))
                    }} variant="outline" size="sm" disabled={pagination?.currentPage <= 1}>
                        Previous
                    </Button>
                    <Button onClick={() => {
                        onUpdate("page", parseInt(pagination?.currentPage) + 1)
                    }} variant="outline" size="sm" disabled={pagination?.currentPage === pagination?.totalPages}>
                        Next
                    </Button>
                </div>
            </div>
        </>
    );
}