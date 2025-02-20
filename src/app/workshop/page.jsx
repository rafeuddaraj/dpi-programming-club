"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Crown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const workshops = {
  upcoming: [
    {
      title: "Mastering DSA for Developers: Start Your DSA Journey",
      description:
        "This workshop helps application developers explore DSA through real-world problems, connecting data structures to business challenges and fostering a deep understanding of algorithmic thinking.",
      duration: "11 Days",
      dates: "Apr 11 - May 4, 2025",
      price: "BDT 12,000",
      discount: "Up to 50% discount available",
    },
    {
      title:
        "Authorization Master Class - Roles, Permissions & Multi Tier Subscriptions",
      description:
        "Master advanced authorization techniques like RBAC, Policy-Based Access Control, plus Subscription Models and Hierarchical Permissions. Build robust security systems.",
      duration: "3 Days",
      dates: "Feb 21 - Feb 23, 2025",
      price: "BDT 5,000",
      discount: "Up to 50% discount available",
    },
  ],
  myWorkshops: [],
  recorded: [],
};

export default function WorkshopPage() {
  return (
    <div className="container mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/40">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="myWorkshops">My Workshops</TabsTrigger>
            <TabsTrigger value="recorded" className="flex items-center gap-2">
              Recorded
              <Crown className="h-4 w-4 text-yellow-500" />
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="upcoming"
            className="grid grid-cols-1 md:grid-cols-2 items-center gap-5"
          >
            {workshops.upcoming.map((workshop, index) => (
              <WorkshopCard key={index} workshop={workshop} />
            ))}
          </TabsContent>

          <TabsContent value="myWorkshops">
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No workshops enrolled yet.
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recorded">
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                Subscribe to access recorded workshops.
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}

function WorkshopCard({ workshop }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg h-full">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <Tooltip>
              <TooltipTrigger>
                <CardTitle className="text-left text-xl font-bold line-clamp-2 m-0 p-0">
                  {workshop.title}
                </CardTitle>
              </TooltipTrigger>
              <TooltipContent
                className={"bg-background border text-muted-foreground"}
              >
                {workshop.title}
              </TooltipContent>
            </Tooltip>
            <CardDescription className="text-sm text-muted-foreground line-clamp-2">
              {workshop.description}
            </CardDescription>
          </div>
          <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
            {workshop.duration}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="inline-block">{workshop.dates}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="space-y-1">
          <div className="text-xl font-bold">{workshop.price}</div>
          <div className="text-sm text-green-500">{workshop.discount}</div>
        </div>
        <Button variant="default">Learn More</Button>
      </CardFooter>
    </Card>
  );
}
