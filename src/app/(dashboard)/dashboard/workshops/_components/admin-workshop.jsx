import { getWorkshops } from "@/app/actions/workshops";
import FilterAction from "@/components/common/filter";
import Pagination from "@/components/common/Pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import DeleteButton from "./delete-button";

export default async function AdminWorkshopPage({ searchParams: searchParam }) {
  const searchParams = await searchParam;

  const query = searchParams?.q;
  const activeStatus = searchParams?.status;
  const filterType = searchParams?.type;
  const page = parseInt(searchParams?.page) || 1;
  const limit = parseInt(searchParams?.limit) || 10;
  const resp = await getWorkshops(query, activeStatus, filterType, page, limit);

  if (resp?.error) {
    throw new Error();
  }

  const workshopsData = resp?.data?.data;
  const pagination = resp?.data?.pagination;

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Workshops</h1>
        <Link href="/dashboard/workshops/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Workshop
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <FilterAction placeholder={"Search workshops..."} />
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="grid w-[200px] grid-cols-2">
          <TabsTrigger value="grid">Grid</TabsTrigger>
          <TabsTrigger value="list">List</TabsTrigger>
        </TabsList>
        <TabsContent value="grid" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshopsData?.length ? (
              workshopsData?.map((workshop) => (
                <Card key={workshop.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">
                          {workshop.name}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {new Date(workshop.startingDate).toLocaleDateString()}{" "}
                          - {new Date(workshop.endingDate).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Link href={`/dashboard/workshops/${workshop.id}`}>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Preview
                            </DropdownMenuItem>
                          </Link>
                          <Link
                            href={`/dashboard/workshops/edit/${workshop.id}`}
                          >
                            <DropdownMenuItem>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                          </Link>
                          <DeleteButton workshopId={workshop?.id} />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src="/placeholder.svg?height=32&width=32"
                          alt={workshop.instructor}
                        />
                        <AvatarFallback>
                          {workshop.instructor.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{workshop.instructor}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {workshop.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-3">
                    <div className="flex gap-2">
                      <Badge
                        variant={
                          workshop.type === "ONLINE" ? "secondary" : "outline"
                        }
                      >
                        {workshop.type}
                      </Badge>
                      <Badge
                        variant={workshop.isActive ? "default" : "destructive"}
                      >
                        {workshop.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {workshop.type === "OFFLINE" &&
                        `${workshop.totalSeats} seats`}
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <>Not found</>
            )}
          </div>
        </TabsContent>
        <TabsContent value="list" className="mt-6">
          <div className="rounded-md border">
            {workshopsData?.length ? (
              <>
                <div className="grid grid-cols-12 p-4 font-medium border-b">
                  <div className="col-span-4">Workshop</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2">Dates</div>
                  <div className="col-span-2 text-right">Actions</div>
                </div>
                {workshopsData.map((workshop) => (
                  <div
                    key={workshop.id}
                    className="grid grid-cols-12 p-4 items-center border-b last:border-b-0"
                  >
                    <div className="col-span-4">
                      <div className="font-medium">{workshop.name}</div>
                      <div className="text-sm text-muted-foreground">
                        by {workshop.instructor}
                      </div>
                    </div>
                    <div className="col-span-2">
                      <Badge
                        variant={
                          workshop.type === "ONLINE" ? "secondary" : "outline"
                        }
                      >
                        {workshop.type}
                      </Badge>
                    </div>
                    <div className="col-span-2">
                      <Badge
                        variant={workshop.isActive ? "default" : "destructive"}
                      >
                        {workshop.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="col-span-2 text-sm">
                      {new Date(workshop.startingDate).toLocaleDateString()} -
                      <br />
                      {new Date(workshop.endingDate).toLocaleDateString()}
                    </div>
                    <div className="col-span-2 flex justify-end gap-2">
                      <Link href={`/dashboard/workshops/${workshop.id}`}>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/dashboard/workshops/edit/${workshop.id}`}>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>Not found.</>
            )}
          </div>
        </TabsContent>
      </Tabs>
      <Pagination pagination={pagination} />
    </div>
  );
}
