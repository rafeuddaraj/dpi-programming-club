"use client"

import { Button } from "@/components/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton({ children }) {
    const router = useRouter()
    return (
        <>
            <Button onClick={() => router.back()} variant="outline" className="flex items-center gap-2 pl-0 mb-4">
                <ArrowLeft className="h-4 w-4" />
                <span>{children}</span>
            </Button>
        </>
    );
}