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
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function EditLessonPage({ params }) {
  const router = useRouter()

  // Find the lesson by ID
  let foundLesson = null
  let parentModule = null

  modulesData.forEach((module) => {
    const lesson = module.lessons.find((l) => l.id === params.id)
    if (lesson) {
      foundLesson = lesson
      parentModule = module
    }
  })

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "ONLINE",
    liveLink: "",
    recordedLink: "",
    location: "",
    isActive: true,
    moduleId: "",
  })

  // Load lesson data when component mounts
  useEffect(() => {
    if (foundLesson) {
      setFormData({
        name: foundLesson.name,
        description: foundLesson.description,
        type: foundLesson.type,
        liveLink: foundLesson.liveLink || "",
        recordedLink: foundLesson.recordedLink || "",
        location: foundLesson.location || "",
        isActive: foundLesson.isActive,
        moduleId: parentModule.id,
      })
    }
  }, [foundLesson, parentModule])

  if (!foundLesson || !parentModule) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Lesson not found</h1>
        <p className="mb-6">The lesson you are trying to edit does not exist.</p>
        <Button onClick={() => router.push("/dashboard/workshops")}>Back to Workshops</Button>
      </div>
    )
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Updated lesson data:", formData)
    // Here you would typically send the data to your API
    router.push(`/dashboard/workshops/${parentModule.workshopId}?tab=modules`)
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push(`/dashboard/workshops/${parentModule.workshopId}?tab=modules`)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Edit Lesson</h1>
      </div>

      <div className="text-muted-foreground">
        Editing lesson in module: <span className="font-medium text-foreground">{parentModule.name}</span>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Lesson Details</CardTitle>
            <CardDescription>Edit the details of your lesson.</CardDescription>
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
                value={formData.type}
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
              onClick={() => router.push(`/dashboard/workshops/${parentModule.workshopId}?tab=modules`)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

