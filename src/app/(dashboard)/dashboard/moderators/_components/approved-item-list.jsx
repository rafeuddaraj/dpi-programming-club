import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ApprovedItemsList({ title, items }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {items.length} approved {items.length === 1 ? "item" : "items"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No approved items
          </div>
        ) : (
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="p-3 bg-muted/50 rounded-md">
                  <p className="font-medium">{item.title}</p>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Created: {item.date}</span>
                    <span>Approved: {item.approvedDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
