import { Skeleton } from "@/components/ui/skeleton";


export default function loading() {
    return (
        <>
            <>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </>
        </>
    );
}