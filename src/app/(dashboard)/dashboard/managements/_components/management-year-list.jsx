"use client";

import { updatePin } from "@/app/actions/managements";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, isExpiredDate } from "@/lib/utils";
import { Edit, MoreHorizontal, Pin, Users } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

// Mock data - replace with actual data fetching in a real application
const initialElectionYears = [
  {
    id: "1",
    name: "Election Year 2023-2024",
    startDate: new Date("2023-04-01"),
    endDate: new Date("2024-03-31"),
    isPinned: true,
    memberCount: 24,
  },
  {
    id: "2",
    name: "Election Year 2022-2023",
    startDate: new Date("2022-04-01"),
    endDate: new Date("2023-03-31"),
    isPinned: false,
    memberCount: 18,
  },
  {
    id: "3",
    name: "Election Year 2021-2022",
    startDate: new Date("2021-04-01"),
    endDate: new Date("2022-03-31"),
    isPinned: false,
    memberCount: 15,
  },
];

export default function ManagementYearList({ data, page, limit }) {
  const togglePin = async (year) => {
    try {
      const pin = year?.pin;
      const id = year?.id;
      await toast.promise(updatePin(id, !pin), {
        loading: "Updating...",
        error: "There was an problem.",
        success: `${!pin ? "Pinned" : "Unpinned"} success.`,
      });
    } catch {
      // toast.error("There was an problem!");
    }
  };

  const deleteElectionYear = (id) => {
    if (confirm("Are you sure you want to delete this Election year?")) {
      setElectionYears(ElectionYears.filter((year) => year.id !== id));
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Index</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Members</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((year, index) => (
            <TableRow key={year.id}>
              <TableCell className="text-center">
                {(page - 1) * limit + 1 + index}
              </TableCell>
              <TableCell className="font-medium">
                {year.name}
                {year.pin && (
                  <Pin className="h-4 w-4 ml-2 inline text-yellow-500" />
                )}
              </TableCell>
              <TableCell>{formatDate(year.startingDate)}</TableCell>
              <TableCell>{formatDate(year.endingDate)}</TableCell>
              <TableCell>
                {new Date() >= year.startingDate &&
                new Date() <= year.endingDate ? (
                  <Badge className="bg-green-500">Active</Badge>
                ) : new Date() < year.startDate ? (
                  <Badge variant="outline">Upcoming</Badge>
                ) : (
                  <Badge variant="secondary">Closed</Badge>
                )}
              </TableCell>
              <TableCell>
                <Link href={`/dashboard/managements/${year.id}/members`}>
                  <Button variant="ghost" size="sm" className="h-8 gap-1">
                    <Users className="h-4 w-4" />
                    {year?.members?.length}
                  </Button>
                </Link>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {!isExpiredDate(year?.endingDate) && (
                      <DropdownMenuItem onClick={() => togglePin(year)}>
                        <Pin className="mr-2 h-4 w-4" />
                        {year.pin ? "Unpin" : "Pin"}
                      </DropdownMenuItem>
                    )}
                    <Link href={`/dashboard/managements/${year.id}/members`}>
                      <DropdownMenuItem>
                        <Users className="mr-2 h-4 w-4" />
                        Manage Members
                      </DropdownMenuItem>
                    </Link>
                    {!isExpiredDate(year?.endingDate) && (
                      <Link href={`/dashboard/managements/${year.id}/edit`}>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                      </Link>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
