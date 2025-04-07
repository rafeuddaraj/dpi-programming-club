"use client";

import { Input } from "@/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import useDebounce from "@/hooks/use-debounce";
import { Filter, Search } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DistributeAction from "./distribute-action";

export default function SearchFilter({
  placeholder,
  isPaid,
  componentType,
  stats,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const session = useSession();

  const role = session?.data?.role;
  const isAdmin = role === "admin";

  const redirect = () => {
    return router.replace(`${pathname}?${newSearchParams?.toString()}`);
  };

  const doSearch = (term) => {
    if (term) {
      newSearchParams.set("q", term);
      redirect();
    } else {
      newSearchParams.delete("q");
      redirect();
    }
  };
  const handleDebounce = useDebounce(doSearch);

  useEffect(() => {
    const query = newSearchParams.get("q");
    const status = newSearchParams.get("status");
    const paymentType = newSearchParams.get("paymentType");
    if (query) {
      redirect();
      setSearchTerm(query);
    }
    if (!paymentType) handleType("all");
    if (!status) handleStatusType("all");
  }, []);

  const handleType = (type) => {
    newSearchParams.set("paymentType", type);
    redirect();
  };
  const handleStatusType = (type) => {
    newSearchParams.set("status", type);
    redirect();
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={placeholder}
            className="pl-8"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleDebounce(e.target.value);
            }}
          />
        </div>
        <div className="flex gap-2">
          {isPaid && (
            <Select
              value={newSearchParams?.get("paymentType")}
              onValueChange={handleType}
            >
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by payment status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
              </SelectContent>
            </Select>
          )}
          <Select
            value={newSearchParams?.get("status")}
            onValueChange={handleStatusType}
          >
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="marked">Marked</SelectItem>
              {isAdmin && (
                <>
                  <SelectItem value="recheck">Recheck</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
      {isAdmin && (
        <>
          <DistributeAction componentType={componentType} stats={stats} />
        </>
      )}
    </>
  );
}
