"use client"

import { Tabs } from "@/components/ui/tabs";
import useRedirect from "@/hooks/use-redirect";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function WorkshopTabs({ children }) {

    const searchParams = useSearchParams()
    const newUrlSearchParams = new URLSearchParams(searchParams)
    const redirect = useRedirect(newUrlSearchParams)

    const handleType = (type) => {
        newUrlSearchParams.set("type", type)
        redirect()
    }
    useEffect(() => {
        const type = newUrlSearchParams.get("type")
        console.log(type);

        if (!type) {
            newUrlSearchParams.set("type", "overview")
            redirect()
        }
    }, [])
    return (
        <>
            <Tabs value={searchParams?.get("type")} onValueChange={handleType} className="space-y-4">
                {children}
            </Tabs>
        </>
    );
}