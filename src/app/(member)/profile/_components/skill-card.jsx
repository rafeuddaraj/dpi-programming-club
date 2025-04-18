import { CardFooter } from "@/components/card";
import FeedbackPreview from "@/components/common/feedback-preview";
import Masonry from "@/components/common/masonary";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDate } from "@/lib/utils";
import {
  Award,
  CalendarCheckIcon,
  Hammer,
  MessageSquareText,
} from "lucide-react";

export default function SkillsDisplay({ skills }) {
  const breakpointColumnsObj = {
    default: 2,
    1100: 2,
    700: 1,
  };
  return (
    <div className="w-full">
      {skills?.length ? (
        <ScrollArea className="h-[90vh] p-5">
          <Masonry breakpointCols={breakpointColumnsObj} className="flex gap-5">
            {skills.map((skill) => (
              <Card
                key={skill.id}
                className="overflow-hidden border-l-4 hover:shadow-lg transition-all border-l-blue-500 dark:border-l-blue-400 shadow-sm rounded-md mb-5"
              >
                <CardContent className="p-0">
                  {/* Header Section */}
                  <div className="bg-stone-100 dark:bg-slate-700 p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full">
                        <Hammer className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-bold">
                        {skill?.skill?.name}
                      </h3>
                    </div>
                  </div>

                  {/* Experience Section */}
                  <div className="p-5 space-y-4">
                    <div className="relative">
                      <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-stone-200 dark:bg-slate-600"></div>
                      <ScrollArea className="h-[30vh]">
                        <div className="pl-6 text-stone-700 whitespace-normal">
                          <FeedbackPreview markdownText={skill?.experience} />
                        </div>
                      </ScrollArea>
                    </div>
                    {/* Reviewer Feedback Section */}
                    {skill?.feedback && (
                      <div className="mt-4 bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <MessageSquareText className="h-4 w-4 text-blue-500" />
                          <span>Authority Feedback</span>
                        </div>
                        <ScrollArea className="h-[30vh]">
                          <FeedbackPreview markdownText={skill?.feedback} />
                        </ScrollArea>
                      </div>
                    )}
                  </div>
                  <CardFooter className="select-none">
                    {/* Approved Skill Indicator */}
                    <div className="flex pt-2 justify-between items-center w-full">
                      <div className="flex items-center gap-1 text-xs text-stone-500">
                        <CalendarCheckIcon className="h-4 w-4" />
                        <span>Approved on {formatDate(skill?.updatedAt)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-stone-500">
                        <Award className="h-4 w-4" />
                        <span>Approved Skill</span>
                      </div>
                    </div>
                  </CardFooter>
                </CardContent>
              </Card>
            ))}
          </Masonry>
        </ScrollArea>
      ) : (
        <p className="text-center text-muted-foreground py-4">
          No approved skills yet
        </p>
      )}
    </div>
  );
}
