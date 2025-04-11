import { Badge } from "@/components/ui/badge";

export default function PageHeader({
  title,
  description,
  memberCount,
  foundingYear,
}) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h1 className="text-4xl font-bold tracking-tight mb-4">{title}</h1>

      <div className="flex items-center justify-center gap-4 mb-6">
        {memberCount && (
          <Badge variant="outline" className="px-3 py-1 text-sm font-medium">
            {memberCount} Members
          </Badge>
        )}
        {foundingYear && (
          <Badge variant="outline" className="px-3 py-1 text-sm font-medium">
            Est. {foundingYear}
          </Badge>
        )}
      </div>

      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
