"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { modulesData } from "@/data/modules"
import { ArrowLeft } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export default function CreateLessonPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const moduleId = searchParams.get("moduleId")

  const module = moduleId ? modulesData.find((m) => m.id === moduleId) : null

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "ONLINE",
    liveLink: "",
    recordedLink: "",
    location: "",
    isActive: true,
    moduleId: moduleId || "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Lesson data:", formData)
    // Here you would typically send the data to your API

    if (moduleId) {
      const workshopId = module?.workshopId
      router.push(`/dashboard/workshops/${workshopId}?tab=modules`)
    } else {
      router.push("/dashboard/workshops")
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            moduleId && module ? router.push(`/dashboard/workshops/${module.workshopId}?tab=modules`) : router.push("/dashboard/workshops")
          }
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Create Lesson</h1>
      </div>

      {module && (
        <div className="text-muted-foreground">
          Adding lesson to module: <span className="font-medium text-foreground">{module.name}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Lesson Details</CardTitle>
            <CardDescription>Create a new lesson for your module.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Lesson Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter lesson name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter lesson description"
                className="min-h-[100px]"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Lesson Type</Label>
              <RadioGroup
                defaultValue={formData.type}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ONLINE" id="online" />
                  <Label htmlFor="online">Online</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="OFFLINE" id="offline" />
                  <Label htmlFor="offline">Offline</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.type === "ONLINE" ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="liveLink">Live Link (Optional)</Label>
                  <Input
                    id="liveLink"
                    name="liveLink"
                    placeholder="Enter live session link"
                    type="url"
                    value={formData.liveLink}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recordedLink">Recorded Link (Optional)</Label>
                  <Input
                    id="recordedLink"
                    name="recordedLink"
                    placeholder="Enter recorded session link"
                    type="url"
                    value={formData.recordedLink}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="Enter physical location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required={formData.type === "OFFLINE"}
                />
              </div>
            )}

            {!moduleId && (
              <div className="space-y-2">
                <Label htmlFor="moduleId">Module ID</Label>
                <Input
                  id="moduleId"
                  name="moduleId"
                  placeholder="Enter module ID"
                  value={formData.moduleId}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isActive: checked }))}
              />
              <Label htmlFor="isActive">Lesson is active</Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={() =>
                moduleId && module
                  ? router.push(`/dashboard/workshops/${module.workshopId}?tab=modules`)
                  : router.push("/dashboard/workshops")
              }
            >
              Cancel
            </Button>
            <Button type="submit">Create Lesson</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

