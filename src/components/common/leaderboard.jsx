import { auth } from "@/app/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Crown, Medal, Trophy } from "lucide-react";

export async function Leaderboard({ data }) {
  const currentUserId = data?.currentUser?.userId;

  // Function to get rank icon based on rank
  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 md:h-6 md:w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 md:h-6 md:w-6 text-gray-400" />;
      case 3:
        return <Trophy className="h-5 w-5 md:h-6 md:w-6 text-amber-700" />;
      default:
        return <span className="font-bold">{rank}</span>;
    }
  };

  // Function to get initials from name
  const getInitials = (name) => {
    return name
      ?.split(" ")
      ?.map((part) => part[0])
      ?.join("")
      ?.toUpperCase()
      ?.substring(0, 2);
  };

  const session = await auth();
  const user = session?.user || null;

  return (
    <div className="space-y-6">
      {/* Current User Card */}
      <Card className="w-full bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Your Position</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-14 w-14 md:h-16 md:w-16 border-2 border-green-400">
                <AvatarImage
                  src={data?.currentUser?.avatar || user?.avatar}
                  alt={data?.currentUser?.user?.name || user?.name}
                />
                <AvatarFallback className="text-base md:text-lg">
                  {getInitials(data?.currentUser?.user?.name || user?.name)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full w-6 h-6 md:w-7 md:h-7 flex items-center justify-center text-xs font-bold border border-green-400">
                {data?.currentUser?.rank || "N/A"}
              </div>
            </div>

            <div className="flex-1">
              <h3 className="font-bold text-base md:text-lg">
                {data?.currentUser?.user?.name || user?.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-xs md:text-sm mt-1">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Roll:</span>
                  <span className="font-medium">
                    {data?.currentUser?.user?.rollNo || user?.rollNo}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Session:</span>
                  <span className="font-medium">
                    {data?.currentUser?.user?.session || user?.session}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Semester:</span>
                  <span className="font-medium">
                    {data?.currentUser?.user?.semester || user?.semester}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">
                    Total Assignments Marks:
                  </span>
                  <span className="font-bold text-primary">
                    {data?.currentUser?.marks || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard Table */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Leaderboard Rankings</span>
            <span className="text-xs md:text-sm font-normal text-muted-foreground">
              {data.participants} participants
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          {/* Desktop View */}
          <div className="hidden sm:block rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16 text-center">Rank</TableHead>
                  <TableHead>Participant</TableHead>
                  <TableHead>Roll No</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Session
                  </TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead className="text-right">
                    Total Assignments Marks
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.leaderboard.map((entry) => (
                  <TableRow
                    key={entry.userId}
                    className={
                      entry.userId === currentUserId
                        ? "bg-primary/10 font-medium"
                        : ""
                    }
                  >
                    <TableCell className="text-center">
                      {getRankIcon(entry.rank)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 border-2 border-green-400">
                          <AvatarImage
                            src={entry.avatar || undefined}
                            alt={entry.user.name}
                          />
                          <AvatarFallback>
                            {getInitials(entry.user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{entry.user.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{entry.user.rollNo}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {entry.user.session}
                    </TableCell>
                    <TableCell>{entry.user.semester}</TableCell>
                    <TableCell className="text-center font-medium">
                      {entry.marks}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile View */}
          <div className="sm:hidden">
            <div className="divide-y">
              {data.leaderboard.map((entry) => (
                <div
                  key={entry.userId}
                  className={`p-4 flex items-center gap-3 ${
                    entry.userId === currentUserId ? "bg-primary/10" : ""
                  }`}
                >
                  <div className="flex-shrink-0 w-8 flex justify-center">
                    {getRankIcon(entry.rank)}
                  </div>

                  <Avatar className="h-10 w-10 border flex-shrink-0">
                    <AvatarImage
                      src={entry.avatar || undefined}
                      alt={entry.user.name}
                    />
                    <AvatarFallback>
                      {getInitials(entry.user.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">
                      {entry.user.name}
                    </div>
                    <div className="text-xs text-muted-foreground flex flex-wrap gap-x-2">
                      <span>Roll: {entry.user.rollNo}</span>
                      <span>Sem: {entry.user.semester}</span>
                    </div>
                  </div>

                  <div className="flex-shrink-0 font-bold text-right">
                    {entry.marks}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top 3 Winners Card - Mobile Only */}
      <Card className="w-full sm:hidden">
        <CardHeader>
          <CardTitle className="text-center text-base">
            Top Performers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-end gap-4 py-2">
            {/* 2nd Place */}
            {data.leaderboard.find((entry) => entry.rank === 2) && (
              <div className="flex flex-col items-center">
                <Avatar className="h-14 w-14 border-2 border-gray-400">
                  <AvatarImage
                    src={
                      data.leaderboard.find((entry) => entry.rank === 2)
                        ?.avatar || undefined
                    }
                    alt="Second Place"
                  />
                  <AvatarFallback>
                    {getInitials(
                      data.leaderboard.find((entry) => entry.rank === 2)?.user
                        .name || ""
                    )}
                  </AvatarFallback>
                </Avatar>
                <Medal className="text-gray-400 h-5 w-5 -mt-2" />
                <span className="text-xs font-medium mt-1 text-center max-w-20 truncate">
                  {
                    data.leaderboard.find((entry) => entry.rank === 2)?.user
                      .name
                  }
                </span>
                <Badge variant="outline" className="mt-1 text-xs">
                  {data.leaderboard.find((entry) => entry.rank === 2)?.marks}{" "}
                  marks
                </Badge>
              </div>
            )}
            {/* 1st Place */}
            {data.leaderboard.find((entry) => entry.rank === 1) && (
              <div className="flex flex-col items-center -mt-4">
                <Avatar className="h-16 w-16 border-2 border-yellow-500">
                  <AvatarImage
                    src={
                      data.leaderboard.find((entry) => entry.rank === 1)
                        ?.avatar || undefined
                    }
                    alt="First Place"
                  />
                  <AvatarFallback className="text-lg">
                    {getInitials(
                      data.leaderboard.find((entry) => entry.rank === 1)?.user
                        .name || ""
                    )}
                  </AvatarFallback>
                </Avatar>
                <Crown className="text-yellow-500 h-6 w-6 mt-2" />
                <span className="text-xs font-bold mt-1 text-center max-w-20 truncate">
                  {
                    data.leaderboard.find((entry) => entry.rank === 1)?.user
                      .name
                  }
                </span>
                <Badge className="mt-1 bg-yellow-500/20 text-yellow-700 border-yellow-500 text-xs">
                  {data.leaderboard.find((entry) => entry.rank === 1)?.marks}{" "}
                  marks
                </Badge>
              </div>
            )}
            {/* 3rd Place */}
            {data.leaderboard.find((entry) => entry.rank === 3) && (
              <div className="flex flex-col items-center">
                <Avatar className="h-14 w-14 border-2 border-amber-700">
                  <AvatarImage
                    src={
                      data.leaderboard.find((entry) => entry.rank === 3)
                        ?.avatar || undefined
                    }
                    alt="Third Place"
                  />
                  <AvatarFallback>
                    {getInitials(
                      data.leaderboard.find((entry) => entry.rank === 3)?.user
                        .name || ""
                    )}
                  </AvatarFallback>
                </Avatar>
                <Trophy className="text-amber-700 h-5 w-5 -mt-2" />
                <span className="text-xs font-medium mt-1 text-center max-w-20 truncate">
                  {
                    data.leaderboard.find((entry) => entry.rank === 3)?.user
                      .name
                  }
                </span>
                <Badge variant="outline" className="mt-1 text-xs">
                  {data.leaderboard.find((entry) => entry.rank === 3)?.marks}{" "}
                  marks
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
