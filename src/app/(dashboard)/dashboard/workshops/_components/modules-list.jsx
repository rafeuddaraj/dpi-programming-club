import { getModuleByWorkshopId } from "@/app/actions/workshops";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";
import { DndModule } from "./dnd-module";

// Sortable Module Component

// Sortable Lesson Component

export async function ModulesList({ workshopId }) {
  const resp = await getModuleByWorkshopId(workshopId, true);
  if (resp?.error) {
    throw Error();
  }
  const modules = resp?.data;
  if (modules.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Modules</CardTitle>
          <CardDescription>
            No modules have been created for this workshop yet.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <p className="text-muted-foreground mb-4">
            Create your first module to get started
          </p>
          <Link
            href={`/dashboard/workshops/modules/create?workshopId=${workshopId}`}
          >
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Module
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Modules</h2>
        <Link
          href={`/dashboard/workshops/modules/create?workshopId=${workshopId}`}
        >
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Module
          </Button>
        </Link>
      </div>
      <DndModule modules={modules} workshopId={workshopId} />
    </div>
  );
}
