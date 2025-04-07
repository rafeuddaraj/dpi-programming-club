"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { ParticipantScoreDisplay } from "./participant-score-display";

// Define Zod schema for form validation
const participantSchema = z.object({
  participant: z.object({
    user: z.object({
      name: z.string(),
    }),
  }),
  workshop: z
    .object({
      name: z.string()?.optional(),
    })
    ?.optional(),
  event: z
    .object({
      name: z.string()?.optional(),
    })
    ?.optional(),
  score: z.number().min(0).max(100).nullable(),
  certificate: z.string().optional(),
  feedback: z.string().optional(),
  complete: z.boolean().default(false),
});

export function ParticipantDetailsModal({
  participant,
  isOpen,
  onClose,
  onSave,
  componentType,
}) {
  // Initialize form with react-hook-form and zod validation
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, defaultValues },
  } = useForm({
    resolver: zodResolver(participantSchema),
    defaultValues: participant || {
      participant: { user: { name: "" } },
      workshop: { name: "" },
      event: { name: "" },
      score: null,
      certificate: "",
      feedback: "",
      complete: false,
    },
  });

  // Reset form when participant changes
  useEffect(() => {
    if (participant) {
      reset(participant);
    }
  }, [participant, reset]);

  // Watch score value for display
  const scoreValue = watch("score");

  // Form submission handler
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await onSave(data);
    } catch {
      //
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {participant ? "Review Participant Details" : "Add New Participant"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={participant?.participant?.user?.name || ""}
                className="col-span-3"
                disabled
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="workshop" className="text-right">
                {componentType}
              </Label>
              <Input
                id="workshop"
                value={participant[componentType?.toLowerCase()]?.name || ""}
                className="col-span-3"
                disabled
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="score" className="text-right">
                Score (0-100)
              </Label>
              <div className="col-span-3 space-y-4">
                <div className="flex items-center gap-4">
                  <Controller
                    name="score"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="score"
                        type="number"
                        min="0"
                        max="100"
                        value={field.value !== null ? field.value : ""}
                        onChange={(e) => {
                          const value =
                            e.target.value === ""
                              ? null
                              : Math.min(
                                  100,
                                  Math.max(
                                    0,
                                    Number.parseInt(e.target.value, 10)
                                  )
                                );
                          field.onChange(value);
                        }}
                        className="w-20"
                      />
                    )}
                  />
                  <div className="flex-1">
                    {scoreValue !== null && (
                      <ParticipantScoreDisplay score={scoreValue} />
                    )}
                  </div>
                </div>
                <Controller
                  name="score"
                  control={control}
                  render={({ field }) => (
                    <Slider
                      value={field.value !== null ? [field.value] : [0]}
                      max={100}
                      step={1}
                      onValueChange={(value) => field.onChange(value[0])}
                      className="w-full"
                    />
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="certificate" className="text-right">
                Certificate URL
              </Label>
              <Input
                id="certificate"
                {...register("certificate")}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="feedback" className="text-right">
                Feedback
              </Label>
              <Textarea
                id="feedback"
                {...register("feedback")}
                className="col-span-3"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="complete" className="text-right">
                Complete
              </Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Controller
                  name="complete"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="complete"
                      checked={field.value || false}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="complete">Mark as complete</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
