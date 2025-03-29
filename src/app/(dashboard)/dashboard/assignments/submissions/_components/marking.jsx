"use client";
import {
  distributeAllAssignments,
  publishedAllMarkedAssignments,
  removeDistributedAssignments,
} from "@/app/actions/assignments";
import { sendEmail } from "@/app/actions/email-services";
import { Button } from "@/components/button";
import { generateAssignmentMarksEmail } from "@/components/email-templates/assignmnet-mark";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function generateEmailTemplateData(assignments = []) {
  let obj = {};
  const users = assignments?.map((data) => {
    obj = {
      workshopId: data?.assignment?.lessons?.module?.workshopId,
      lessonId: data.assignment?.lessonId,
      workshopName: data?.assignment?.lessons?.module?.name,
      assignmentName: data?.assignment?.name,
    };
    return {
      ...obj,
      userEmail: data?.user?.user?.email,
      userName: data?.user?.user?.name,
    };
  });
  return { ...obj, users };
}

export default function MarkingAction({ counts }) {
  const [markPublishLoading, setMarkPublishLoading] = useState(false);
  const [distributeLoading, setDistributeLoading] = useState(false);
  const [removeDistributeLoading, setRemoveDistributeLoading] = useState(false);
  const handleAllMarkPublished = async () => {
    setMarkPublishLoading(true);
    try {
      const resp = await publishedAllMarkedAssignments();
      if (resp?.error) {
        throw Error();
      }

      const emailsData = generateEmailTemplateData(counts?.markData);
      const bcc = emailsData?.users?.map((data) => data?.userEmail)?.join(", ");
      sendEmail(
        {
          to: process?.env?.NEXT_PUBLIC_EMAIL_USER,
          bcc,
          subject: "Assignment has been marked.",
        },
        generateAssignmentMarksEmail(
          emailsData?.workshopName,
          emailsData?.assignmentName,
          `${process.env.NEXT_PUBLIC_SITE_URL}/workshops/${emailsData?.workshopId}/player/${emailsData?.lessonId}`
        )
      )
        .then((res) => {
          toast.success("Successfully send email.");
        })
        .catch((err) => {
          //   console.log(err);
        });

      toast.success("All marked assignments have been published.");
    } catch (error) {
      console.log(error);

      toast.error("There was an problem! Please try again.");
    }
    setMarkPublishLoading(false);
  };

  const handleDistribute = async () => {
    setDistributeLoading(true);
    try {
      const resp = await distributeAllAssignments();
      if (resp?.error) {
        toast.error(resp?.message);
      } else {
        toast.success("All assignments have been distributed.");
      }
    } catch (err) {
      toast?.error(err?.message);
    }
    setDistributeLoading(false);
  };

  const handleRemoveDistribute = async () => {
    setRemoveDistributeLoading(true);
    try {
      const resp = await removeDistributedAssignments();
      if (resp?.error) {
        toast.error(resp?.message);
      } else {
        toast.success("All assignments have been undistributed.");
      }
    } catch (err) {
      toast.error(err?.message);
    }
    setRemoveDistributeLoading(false);
  };

  return (
    <>
      <Button
        disabled={markPublishLoading || counts?.markedCount === 0}
        onClick={handleAllMarkPublished}
      >
        {markPublishLoading && <Loader2 className="animate-spin" />}Published
        Mark <Badge>{counts?.markedCount}</Badge>
      </Button>
      <Button
        disabled={distributeLoading || counts?.unDistributedCount === 0}
        onClick={handleDistribute}
      >
        {distributeLoading && <Loader2 className="animate-spin" />}Distribute{" "}
        <Badge>{counts?.unDistributedCount}</Badge>
      </Button>
      <Button
        disabled={removeDistributeLoading}
        onClick={handleRemoveDistribute}
      >
        {removeDistributeLoading && <Loader2 className="animate-spin" />}Remove
        All Distribute
      </Button>
    </>
  );
}
