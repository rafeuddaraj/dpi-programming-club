import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertCircle, CalendarX2, Search, Trophy, Users } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";

export function EmptyState({
  type = "noData",
  title,
  description,
  icon: Icon,
  actionLabel,
  actionHref,
  className,
  userProfile,
  session,
}) {
  const isCurrentUser = session?.user?.id === userProfile?.id;

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
      description:
        "There was an error loading your achievements. Please try again.",
    },
  };

  const content = defaultContent[type];
  const IconComponent = Icon || content.icon;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 rounded-lg border border-dashed",
        "bg-muted/30 dark:bg-muted/10",
        className
      )}
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/50">
        <IconComponent className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title || content.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-xs">
        {description || content.description}
      </p>
      {actionLabel && actionHref && (
        <Button variant="outline" className="mt-4">
          <Link href={actionHref}> {actionLabel}</Link>
        </Button>
      )}
    </div>
  );
}

export function CommonEmptyState({ title, description, icon, className }) {
  return (
    <Card className={`w-full mx-auto ${className}`}>
      <CardHeader className="pb-2 text-center">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center py-6">{icon}</CardContent>
    </Card>
  );
}

export function NoWorkshops({ className }) {
  return (
    <CommonEmptyState
      title="No Upcoming Workshops Available"
      description="There are no workshops scheduled at this time."
      icon={<Users className="h-12 w-12 text-muted-foreground/60" />}
      className={className}
    />
  );
}

export function NoEvents({ className }) {
  return (
    <CommonEmptyState
      title="No Upcoming Events Available"
      description="No upcoming events available right now."
      icon={<CalendarX2 className="h-12 w-12 text-muted-foreground/60" />}
      className={className}
    />
  );
}
