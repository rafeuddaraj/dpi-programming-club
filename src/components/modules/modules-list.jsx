"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { modulesData } from "@/data/modules"
import { Eye, GripVertical, MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"


export function ModulesList({ workshopId }) {
  const [modules, setModules] = useState(modulesData.filter((module) => module.workshopId === workshopId))

  const handleDeleteModule = (moduleId) => {
    setModules(modules.filter((module) => module.id !== moduleId))
  }

  if (modules.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Modules</CardTitle>
          <CardDescription>No modules have been created for this workshop yet.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <p className="text-muted-foreground mb-4">Create your first module to get started</p>
          <Link href={`/dashboard/workshops/modules/create?workshopId=${workshopId}`}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Module
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Modules</h2>
        <Link href={`/dashboard/workshops/modules/create?workshopId=${workshopId}`}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Module
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {modules.map((module, index) => (
          <Card key={module.id} className="relative">
            <div className="absolute left-2 top-1/2 -translate-y-1/2 cursor-move opacity-50 hover:opacity-100">
              <GripVertical className="h-5 w-5" />
            </div>
            <CardHeader className="pl-10">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">
                    {index + 1}. {module.name}
                  </CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={module.isActive ? "default" : "destructive"}>
                    {module.isActive ? "Active" : "Inactive"}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <Link href={`/dashboard/workshops/modules/${module.id}`}>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                      </Link>
                      <Link href={`/dashboard/workshops/modules/edit/${module.id}`}>
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteModule(module.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pl-10">
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  {module.lessons.length} {module.lessons.length === 1 ? "lesson" : "lessons"}
                </div>
                <Link href={`/dashboard/workshops/lessons/create?moduleId=${module.id}`}>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-3 w-3" />
                    Add Lesson
                  </Button>
                </Link>
              </div>

              {module.lessons.length > 0 && (
                <div className="mt-4 border rounded-md">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lesson.id}
                      className={`flex items-center justify-between p-3 ${lessonIndex !== module.lessons.length - 1 ? "border-b" : ""
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full border text-xs">
                          {lessonIndex + 1}
                        </div>
                        <div>
                          <p className="font-medium">{lesson.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {lesson.type === "ONLINE" ? "Online" : "Offline"} Lesson
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={lesson.isActive ? "outline" : "destructive"} className="text-xs">
                          {lesson.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <Link href={`/dashboard/workshops/lessons/edit/${lesson.id}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Pencil className="h-3 w-3" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

