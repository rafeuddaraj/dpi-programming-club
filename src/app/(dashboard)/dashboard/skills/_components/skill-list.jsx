import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditButton from "./EditButton";

export default function SkillList({ skills, page, limit }) {
  return (
    <ScrollArea className="h-[400px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Index</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Members</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {skills.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No skills found
              </TableCell>
            </TableRow>
          ) : (
            skills.map((skill, index) => (
              <TableRow key={skill.id}>
                <TableCell>{(page - 1) * limit + 1 + index}</TableCell>
                <TableCell className="font-medium">{skill.name}</TableCell>
                <TableCell>{skill.description}</TableCell>
                <TableCell>{skill.users?.length || "N/A"}</TableCell>
                <TableCell>
                  <EditButton id={skill?.id} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
