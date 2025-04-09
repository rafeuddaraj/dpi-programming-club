"use client";

import { deleteNotice } from "@/app/actions/notices";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { Download, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Pagination from "../common/Pagination";

export default function NoticeTable({ notices, pagination }) {
  const pathname = usePathname();

  const isDashboard = pathname.includes("/dashboard");

  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      const resp = await deleteNotice(id);
      if (resp.error) {
        throw Error();
      }
      toast.success("Notice deleted successfully");
    } catch (error) {
      toast.error("Failed to delete notice");
    } finally {
      setDeletingId(null);
    }
  };

  if (notices.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-muted/50">
        <h3 className="text-xl font-medium mb-2">No notices available</h3>
        {isDashboard && (
          <p className="text-muted-foreground">
            Create a new notice to get started.
          </p>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto select-none">
          <Table>
            <TableHeader>
              <TableRow>
                {!isDashboard && (
                  <TableHead className="text-center">Index</TableHead>
                )}
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">
                  Published
                </TableHead>
                {isDashboard ? (
                  <TableHead className="text-right">Actions</TableHead>
                ) : (
                  <TableHead>Download</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {notices.map((notice, index) => (
                <TableRow key={notice.id}>
                  {!isDashboard && (
                    <TableCell className="text-center">{index + 1}</TableCell>
                  )}
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{notice.name}</span>
                      <span className="text-xs text-muted-foreground md:hidden">
                        {formatDate(notice.createdAt, { time: true })}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {formatDate(notice.createdAt, { time: true })}
                  </TableCell>
                  {isDashboard ? (
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/dashboard/notice/${notice.id}`}>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </Link>

                        {notice.document && (
                          <a
                            href={notice.document}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                          </a>
                        )}

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="icon"
                              className="h-8 w-8"
                              disabled={deletingId === notice.id}
                            >
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete the notice.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(notice.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  ) : (
                    <TableCell>
                      {notice.document && (
                        <a
                          href={notice.document}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                        </a>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {isDashboard ? (
        <Pagination pagination={pagination} />
      ) : (
        <div className="flex items-end justify-end">
          {" "}
          <Pagination pagination={pagination} />
        </div>
      )}
    </>
  );
}
