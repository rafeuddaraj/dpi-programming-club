"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Pencil, MoreHorizontal, Search, Filter, Download } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { participantsData } from "@/data/participants"


export function ParticipantsList({ workshopId }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const participants = participantsData.filter(
    (participant) =>
      participant.workshopId === workshopId &&
      (searchTerm === "" ||
        participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        participant.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" ||
        (statusFilter === "completed" && participant.completionStatus === "COMPLETED") ||
        (statusFilter === "incomplete" && participant.completionStatus === "INCOMPLETE")),
  )

  if (participants.length === 0 && searchTerm === "" && statusFilter === "all") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Participants</CardTitle>
          <CardDescription>No participants have registered for this workshop yet.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <p className="text-muted-foreground mb-4">Participants will appear here once they register</p>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Participant Template
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search participants..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="incomplete">Incomplete</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Participants ({participants.length})</CardTitle>
          <CardDescription>Manage participants registered for this workshop</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-12 p-4 font-medium border-b">
              <div className="col-span-4">Participant</div>
              <div className="col-span-2">Joined</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Score</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {participants.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">No participants match your search criteria</div>
            ) : (
              participants.map((participant) => (
                <div key={participant.id} className="grid grid-cols-12 p-4 items-center border-b last:border-b-0">
                  <div className="col-span-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="/placeholder.svg?height=36&width=36" alt={participant.name} />
                        <AvatarFallback>{participant.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{participant.name}</div>
                        <div className="text-sm text-muted-foreground">{participant.email}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 text-sm text-muted-foreground">
                    {new Date(participant.joinedDate).toLocaleDateString()}
                  </div>
                  <div className="col-span-2">
                    <Badge variant={participant.completionStatus === "COMPLETED" ? "default" : "secondary"}>
                      {participant.completionStatus === "COMPLETED" ? "Completed" : "In Progress"}
                    </Badge>
                  </div>
                  <div className="col-span-2">
                    {participant.score !== null ? (
                      <span className="font-medium">{participant.score}%</span>
                    ) : (
                      <span className="text-muted-foreground">N/A</span>
                    )}
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download Certificate
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

