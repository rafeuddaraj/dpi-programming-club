"use client";

import { createSkillRequest } from "@/app/actions/skills";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { Check, ChevronsUpDown, Loader2, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
const userSkillSchema = z.object({
  reason: z
    .string()
    .min(10, { message: "Reason must be at least 10 characters" }),
  experience: z
    .string()
    .min(20, { message: "Experience must be at least 20 characters" }),
});
export default function UserSkillSelector({ availableSkills }) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [skillForms, setSkillForms] = useState({});

  const form = useForm({
    resolver: zodResolver(userSkillSchema),
    defaultValues: {
      reason: "",
      experience: "",
    },
  });

  const toggleSkill = (skill) => {
    setSelectedSkills((current) => {
      const isSelected = current.some((s) => s.id === skill.id);

      if (isSelected) {
        // Remove skill
        const newSkills = current.filter((s) => s.id !== skill.id);

        // Remove form data
        const newForms = { ...skillForms };
        delete newForms[skill.id];
        setSkillForms(newForms);

        return newSkills;
      } else {
        // Add skill
        setSkillForms((prev) => ({
          ...prev,
          [skill.id]: { reason: "", experience: "" },
        }));

        return [...current, skill];
      }
    });
  };

  const removeSkill = (skillId) => {
    setSelectedSkills((current) =>
      current.filter((skill) => skill.id !== skillId)
    );

    // Remove form data
    const newForms = { ...skillForms };
    delete newForms[skillId];
    setSkillForms(newForms);
  };

  const updateSkillForm = (skillId, field, value) => {
    setSkillForms((prev) => ({
      ...prev,
      [skillId]: {
        ...prev[skillId],
        [field]: value,
      },
    }));
  };

  const validateAllSkills = () => {
    // Check if all skills have valid reason and experience
    for (const skill of selectedSkills) {
      const formData = skillForms[skill.id];
      if (!formData) return false;

      const result = userSkillSchema.safeParse(formData);
      if (!result.success) return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!validateAllSkills()) {
      return;
    }

    // Create skill requests with reasons and experiences
    const skillsWithDetails = selectedSkills.map((skill) => ({
      skillId: skill?.id,
      reason: skillForms[skill.id].reason,
      experience: skillForms[skill.id].experience,
      reviewerId: null,
    }));

    try {
      const resp = await createSkillRequest(skillsWithDetails);
      if (resp?.error) {
        throw resp?.message;
      }
      toast.success("Skill requests submitted successfully");
      setSubmitted(true);
      setIsLoading(false);
      setSelectedSkills([]);
      return;
    } catch (err) {
      toast.error(err?.message || "Error submitting skill requests");
    }
    setIsLoading(false);
  };

  const filteredSkills = availableSkills.filter((skill) =>
    skill.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {submitted && (
        <Alert className="bg-green-50 border-green-200 text-green-800">
          <AlertDescription>
            Your skill requests have been submitted successfully!
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="skill-select">Select Skills</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="skill-select"
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {selectedSkills.length > 0
                ? `${selectedSkills.length} skill${
                    selectedSkills.length > 1 ? "s" : ""
                  } selected`
                : "Select skills"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput
                placeholder="Search skills..."
                value={searchValue}
                onValueChange={setSearchValue}
              />
              <CommandList>
                <CommandEmpty>No skills found.</CommandEmpty>
                <CommandGroup className="max-h-64 overflow-auto">
                  {filteredSkills.map((skill) => {
                    const isSelected = selectedSkills.some(
                      (s) => s.id === skill.id
                    );
                    return (
                      <CommandItem
                        key={skill.id}
                        value={skill.name}
                        onSelect={() => toggleSkill(skill)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            isSelected ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <span>{skill.name}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {selectedSkills.length > 0 && (
        <div className="space-y-4">
          <div className="text-sm font-medium">Selected Skills:</div>
          {selectedSkills.map((skill) => (
            <Card key={skill.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <Badge variant="secondary" className="text-sm">
                    {skill.name}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => removeSkill(skill.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`reason-${skill.id}`}>
                      Why do you need this skill?
                    </Label>
                    <div id={`reason-${skill.id}`}>
                      <MDEditor
                        value={skillForms[skill.id]?.reason || ""}
                        onChange={(value) =>
                          updateSkillForm(skill.id, "reason", value)
                        }
                      />
                    </div>
                    {skillForms[skill.id]?.reason &&
                      userSkillSchema.shape.reason.safeParse(
                        skillForms[skill.id].reason
                      ).success === false && (
                        <p className="text-sm text-red-500">
                          Reason must be at least 10 characters
                        </p>
                      )}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor={`experience-${skill.id}`}>
                      Describe your experience with this skill
                    </Label>
                    <div id={`experience-${skill.id}`}>
                      <MDEditor
                        value={skillForms[skill.id]?.experience || ""}
                        onChange={(value) =>
                          updateSkillForm(skill.id, "experience", value)
                        }
                      />
                    </div>
                    {skillForms[skill.id]?.experience &&
                      userSkillSchema.shape.experience.safeParse(
                        skillForms[skill.id].experience
                      ).success === false && (
                        <p className="text-sm text-red-500">
                          Experience must be at least 20 characters
                        </p>
                      )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Button
        onClick={handleSubmit}
        disabled={
          selectedSkills.length === 0 || !validateAllSkills() || isLoading
        }
        className="w-full"
      >
        {isLoading && <Loader2 className="animate-spin" />} Submit Skills
        Request
      </Button>
    </div>
  );
}
