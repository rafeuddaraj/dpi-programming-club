"use client";
import {
  distributeSkillRequest,
  removeSkillDistribution,
} from "@/app/actions/skills";
import { Button } from "@/components/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Recycle, Shuffle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function DistributeAction({
  unassignedCount,
  distributedCount,
}) {
  const [isDistributeLoading, setIsDistributeLoading] = useState(false);
  const [isDistributeRemoveLoading, setIsDistributeRemoveLoading] =
    useState(false);
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
      toast.error(error?.message || "Failed to remove moderators.");
    } finally {
      setIsDistributeRemoveLoading(false);
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
            disabled={isDistributeLoading}
            className="flex gap-4"
          >
            {isDistributeLoading && <Loader2 className="animate-spin" />}
            <Shuffle />
            Distribute All Moderators <Badge>{unassignedCount}</Badge>
          </Button>
        </div>
        <div>
          <Button
            size="sm"
            className="flex gap-4"
            variant="outline"
            onClick={handleRemoveDistributeAllModerators}
            disabled={isDistributeRemoveLoading}
          >
            {isDistributeRemoveLoading && <Loader2 className="animate-spin" />}
            <Recycle />
            Remove Distribute
            <Badge>{distributedCount}</Badge>
          </Button>
        </div>
      </div>
    </>
  );
}
