"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { Filter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function NewFilterAction() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  const pathname = usePathname();

  const redirect = () => {
    return router.replace(`${pathname}?${newSearchParams?.toString()}`);
  };

  useEffect(() => {
    const role = newSearchParams.get("role");
    const status = newSearchParams.get("status");
    if (!role) handleStatusType("role", "all");
    if (!status) handleStatusType("status", "all");
  }, []);

  const handleStatusType = (name, type) => {
    newSearchParams.set(name, type?.toLowerCase());
    redirect();
  };
  return (
    <>
      <div className="flex items-center space-x-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Select
          value={newSearchParams?.get("role")}
          onValueChange={(value) => handleStatusType("role", value)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Members</SelectItem>
            <SelectItem value="moderator">Moderator</SelectItem>
            <SelectItem value="member">Members</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Select
          value={newSearchParams?.get("status")}
          onValueChange={(value) =>
            handleStatusType("status", value.toLowerCase())
          }
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="restricted">Restricted</SelectItem>
            <SelectItem value="banned">Banned</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="ex">Ex</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
