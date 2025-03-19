"use client"
import { Button } from "@/components/button";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function CreateNoticeButton() {
    const pathname = usePathname()
    const isDashboard = pathname.includes("/dashboard")
    return (
        <>
            {isDashboard && (
                <Link href="/dashboard/notice/create">
                    <Button>Create New Notice</Button>
                </Link>)}
        </>
    );
}