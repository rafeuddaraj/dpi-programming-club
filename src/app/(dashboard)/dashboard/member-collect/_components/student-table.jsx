import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import GetDepartmentList from "@/utils/DepartmentList";
import { Check, X } from "lucide-react";
import ActionButton from "./actionButton";
import FilterAction from "./filterAction";

export function StudentTable({ students, onEdit, onDelete }) {
  return (
    <div className="space-y-4">
      <FilterAction />

      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer">Full Name</TableHead>
                <TableHead className="cursor-pointer whitespace-nowrap">
                  Roll Number
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Registration Number
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Session & Shift
                </TableHead>
                <TableHead className="hidden lg:table-cell">Email</TableHead>
                <TableHead className="cursor-pointer hidden sm:table-cell">
                  Department
                </TableHead>
                <TableHead className="cursor-pointer hidden sm:table-cell">
                  Status
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No students found
                  </TableCell>
                </TableRow>
              ) : (
                students.map((student) => (
                  <TableRow key={student.id} className="group">
                    <TableCell className="font-medium">
                      {student.name}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {student.rollNo}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {student.registrationNo}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {student.session} - ({student?.semester}) - (
                      {student.shift})
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {student.email}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {GetDepartmentList(student.department)}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {student?.user ? (
                        <Check className="text-green-400" />
                      ) : (
                        <X className="text-red-500" />
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <ActionButton student={student} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
