"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDate } from "@/lib/utils"
import { Eye } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function SubmissionsTable({ submissions }) {
    const [searchTerm, setSearchTerm] = useState("")

    const filteredSubmissions = submissions.filter((submission) => {
        const searchString = searchTerm.toLowerCase()
        return (
            submission.assignment.name.toLowerCase().includes(searchString) ||
            submission.user?.name?.toLowerCase().includes(searchString) ||
            false ||
            submission.userId.toLowerCase().includes(searchString)
        )
    })

    if (!submissions.length) {
        return (
            <div className="text-center py-8">
                <p className="text-muted-foreground">No submissions found.</p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center">
                <Input
                    placeholder="Search submissions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Assignment</TableHead>
                            <TableHead>Student</TableHead>
                            <TableHead>Submission Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Marks</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredSubmissions.map((submission) => (
                            <TableRow key={submission.id}>
                                <TableCell className="font-medium">
                                    <Link href={`/assignments/${submission.assignmentId}`} className="hover:underline">
                                        {submission.assignment.name}
                                    </Link>
                                </TableCell>
                                <TableCell>{submission.user?.name || `User ${submission.userId.substring(0, 8)}`}</TableCell>
                                <TableCell>{formatDate(submission.submissionDate)}</TableCell>
                                <TableCell>
                                    <Badge variant={submission.marks !== null ? "default" : "outline"}>
                                        {submission.marks !== null ? "Marked" : "Pending"}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {submission.marks !== null ? `${submission.marks}/${submission.assignment.totalMarks}` : "-"}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Link href={`/submissions/${submission.id}`}>
                                        <Button variant="ghost" size="sm">
                                            <Eye className="h-4 w-4 mr-2" />
                                            View
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

