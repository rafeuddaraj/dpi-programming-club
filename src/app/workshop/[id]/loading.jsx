import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container grid gap-12 py-8 md:grid-cols-[1fr_300px]">
      <div className="space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-8 w-[300px]" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-6 w-[200px]" />
          <div className="grid gap-4 sm:grid-cols-2">
            {Array(6)
              .fill(null)
              .map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
          </div>
        </div>
      </div>
      <div>
        <Skeleton className="h-[300px] w-full" />
      </div>
    </div>
  )
}

