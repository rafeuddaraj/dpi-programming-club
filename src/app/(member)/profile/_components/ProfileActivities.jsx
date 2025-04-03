"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from "next/dynamic";
import { useState } from "react";
const Achievements = dynamic(() => import("./achievements"));
const Education = dynamic(() => import("./education"));
const Info = dynamic(() => import("./info"));

export default function ProfileActivities({
  user,
  activities,
  session,
  result,
}) {
  const [activeTab, setActiveTab] = useState("info");

  const { event, workshop } = activities || {};

  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="info">About</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
        </TabsList>
        <Info user={user} />
        <Achievements
          event={event}
          workshop={workshop}
          user={user}
          session={session}
        />
        <Education result={result} />
      </Tabs>
    </>
  );
}
