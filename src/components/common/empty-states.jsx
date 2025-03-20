import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AlertCircle, Search, Trophy } from "lucide-react"
import Link from "next/link"


export function EmptyState({
    type = "noData",
    title,
    description,
    icon: Icon,
    actionLabel,
    actionHref,
    className,
    userProfile,
    session
}) {


    const isCurrentUser = session?.user?.id === userProfile?.id


    const defaultContent = {
        noData: {
            icon: Trophy,
            title: "No achievements yet",
            description: isCurrentUser
                ? "Complete tasks to earn achievements and track your progress."
                : "This person hasn't completed any tasks yet.",
        },
        noResults: {
            icon: Search,
            title: "No achievements found",
            description: "Try adjusting your filters or search criteria.",
        },
        error: {
            icon: AlertCircle,
            title: "Failed to load achievements",
            description: "There was an error loading your achievements. Please try again.",
        },
    }

    const content = defaultContent[type]
    const IconComponent = Icon || content.icon

    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center text-center p-8 rounded-lg border border-dashed",
                "bg-muted/30 dark:bg-muted/10",
                className,
            )}
        >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/50">
                <IconComponent className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{title || content.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs">{description || content.description}</p>
            {actionLabel && actionHref && (
                <Button variant="outline" className="mt-4">
                    <Link href={actionHref}> {actionLabel}</Link>
                </Button>
            )}
        </div>
    )
}

