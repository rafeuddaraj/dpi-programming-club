"use client";

import { deleteManagementMember } from "@/app/actions/managements";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { isExpiredDate } from "@/lib/utils";
import { getInitials } from "@/utils/get-initial";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

export default function MemberList({ members, yearId, page, limit }) {
  const pathname = usePathname();
  const deleteMember = async (id) => {
    try {
      if (confirm("Are you sure you want to delete this member?")) {
        await toast.promise(deleteManagementMember(id, pathname), {
          loading: "Deleting...",
          error: "There was an problem!",
          success: "Delete done",
        });
      }
    } catch {
      //
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Index</TableHead>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Roll Number</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            {!isExpiredDate(members[0]?.election?.endingDate) && (
              <TableHead className="w-[100px]">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member, index) => (
            <TableRow key={member.id}>
              <TableCell className="text-center">
                {(page - 1) * limit + 1 + index}
              </TableCell>
              <TableCell>
                <Avatar>
                  <AvatarImage
                    src={member?.user?.avatar || "/avatar.svg"}
                    alt={member?.user?.user?.name || "User name"}
                  />
                  <AvatarFallback>
                    {getInitials(member?.user?.user?.name)}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">
                {member?.user?.user?.rollNo}
              </TableCell>
              <TableCell>{member?.user?.user?.name}</TableCell>
              <TableCell>{member?.user?.user?.email}</TableCell>
              <TableCell>
                <Badge variant="outline">{member?.role?.name}</Badge>
              </TableCell>
              {!isExpiredDate(member?.election?.endingDate) && (
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <Link
                        href={`/dashboard/managements/${yearId}/members/${member.id}/edit`}
                      >
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                      </Link>

                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => deleteMember(member.id)}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
