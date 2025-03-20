"use client"
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../button";


export default function BackButtonWithoutText() {
    const router = useRouter()
    return (
        <>
            <Button onClick={() => router.back()} variant="outline" size="icon" asChild>
                <div>
                    <ArrowLeft className="h-4 w-4" />
                </div>
            </Button>
        </>
    );
}