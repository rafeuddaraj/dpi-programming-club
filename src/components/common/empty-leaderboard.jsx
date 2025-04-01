import { Card, CardContent } from "@/components/ui/card";
import { Award, Trophy, Users } from "lucide-react";

export function LeaderboardEmpty() {
  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col items-center justify-center py-12 md:py-16 px-4 text-center bg-gradient-to-b from-background to-muted/20">
          {/* Top decorative elements */}
          <div className="flex justify-center items-center gap-2 md:gap-4 mb-6 md:mb-8">
            <div className="relative">
              <div className="absolute inset-0 animate-ping opacity-20">
                <Trophy className="h-8 w-8 md:h-10 md:w-10 text-muted-foreground" />
              </div>
              <Trophy className="h-8 w-8 md:h-10 md:w-10 text-muted-foreground" />
            </div>
            <Award className="h-10 w-10 md:h-14 md:w-14 text-muted-foreground" />
            <div className="relative">
              <div className="absolute inset-0 animate-ping opacity-20">
                <Trophy className="h-8 w-8 md:h-10 md:w-10 text-muted-foreground" />
              </div>
              <Trophy className="h-8 w-8 md:h-10 md:w-10 text-muted-foreground" />
            </div>
          </div>

          {/* Main empty state illustration */}
          <div className="relative mb-6 md:mb-8">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-muted flex items-center justify-center">
              <Users className="h-12 w-12 md:h-16 md:w-16 text-muted-foreground" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background border-2 border-muted flex items-center justify-center">
              <Trophy className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground" />
            </div>
          </div>

          {/* Message */}
          <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">
            No Leaderboard Data
          </h3>
          <p className="text-muted-foreground max-w-md">
            The leaderboard has not been created yet!
          </p>

          {/* Decorative podium */}
          <div className="flex items-end mt-8 md:mt-10 gap-1 md:gap-2">
            <div className="w-12 md:w-16 h-16 md:h-20 bg-muted/50 rounded-t-md"></div>
            <div className="w-12 md:w-16 h-20 md:h-24 bg-muted/70 rounded-t-md"></div>
            <div className="w-12 md:w-16 h-12 md:h-16 bg-muted/50 rounded-t-md"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
