"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFilter } from "@/hooks/use-filter";
import { useEffect, useState } from "react";

export default function ClientTabs({ children }) {
  const [activeTab, setActiveTab] = useState("current");
  const { onUpdate, searchParams } = useFilter();
  const handleActiveTab = (value) => {
    setActiveTab(value);
    onUpdate("type", value);
  };

  useEffect(() => {
    if (searchParams.get("type")) {
      setActiveTab(searchParams?.get("type"));
    }
  }, [searchParams.get("type")]);
  return (
    <>
      <Tabs value={activeTab} className="w-full mb-16">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger
            value="current"
            onClick={() => handleActiveTab("current")}
          >
            Current Management
          </TabsTrigger>
          <TabsTrigger
            value="previous"
            onClick={() => handleActiveTab("previous")}
          >
            Previous Elections
          </TabsTrigger>
        </TabsList>
        {children}
      </Tabs>
    </>
  );
}
