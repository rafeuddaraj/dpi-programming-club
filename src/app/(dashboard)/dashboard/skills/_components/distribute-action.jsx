"use client";
import {
  approvedSkillRequestByAdmin,
  distributeSkillRequest,
  removeSkillDistribution,
} from "@/app/actions/skills";
import { Button } from "@/components/button";
import { Badge } from "@/components/ui/badge";
import { CheckCheck, Loader2, SendHorizonal, Undo2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function DistributeAction({
  unassignedCount,
  distributedCount,
  reviewedCount,
}) {
  const [isDistributeLoading, setIsDistributeLoading] = useState(false);
  const [isDistributeRemoveLoading, setIsDistributeRemoveLoading] =
    useState(false);
  const [isPublishedLoading, setIsPublishedLoading] = useState(false);
  const handleDistributeAllModerators = async () => {
    setIsDistributeLoading(true);
    try {
      const resp = await distributeSkillRequest();
      if (resp?.error) {
        throw resp?.message;
      }
      toast.success("Moderators distributed successfully!");
    } catch (error) {
      //   console.log(error);

      toast.error(error?.message || "Failed to distribute moderators.");
    } finally {
      setIsDistributeLoading(false);
    }
  };
  const handleRemoveDistributeAllModerators = async () => {
    setIsDistributeRemoveLoading(true);
    try {
      const resp = await removeSkillDistribution();
      if (resp?.error) {
        throw resp?.message;
      }
      toast.success("Moderators removed successfully!");
    } catch (error) {
      console.log(error);

      toast.error(error?.message || "Failed to remove moderators.");
    } finally {
      setIsDistributeRemoveLoading(false);
    }
  };
  const handlePublished = async () => {
    setIsPublishedLoading(true);
    try {
      const resp = await approvedSkillRequestByAdmin();
      if (!resp?.error) {
        toast.success(resp?.message);
      }
    } catch {
      toast.error("There was an problem!");
    } finally {
      setIsPublishedLoading(false);
    }
  };
  return (
    <>
      <div className="flex gap-5">
        <div>
          <Button
            size="sm"
            variant="outline"
            onClick={handleDistributeAllModerators}
            disabled={isDistributeLoading || unassignedCount === 0}
            className="flex gap-4"
          >
            {isDistributeLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <SendHorizonal className="mr-1 h-4 w-4" />
            )}
            Distribute <Badge>{unassignedCount}</Badge>
          </Button>
        </div>
        <div>
          <Button
            size="sm"
            className="flex gap-4"
            variant="outline"
            onClick={handleRemoveDistributeAllModerators}
            disabled={isDistributeRemoveLoading || distributedCount === 0}
          >
            {isDistributeRemoveLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Undo2 className="mr-1 h-4 w-4" />
            )}
            Remove
            <Badge>{distributedCount}</Badge>
          </Button>
        </div>
        <div>
          <Button
            size="sm"
            className="flex gap-4"
            variant="outline"
            onClick={handlePublished}
            disabled={isPublishedLoading || reviewedCount === 0}
          >
            {isPublishedLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <CheckCheck />
            )}
            Published
            <Badge>{reviewedCount}</Badge>
          </Button>
        </div>
      </div>
    </>
  );
}
