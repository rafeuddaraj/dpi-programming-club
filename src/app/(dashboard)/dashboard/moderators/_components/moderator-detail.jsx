"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Eye,
  EyeOff,
  Key,
  Mail,
  RefreshCw,
  Save,
  Trash2,
  Upload,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// Mock data for demonstration - using the same structure as the list component
const MOCK_MODERATORS = [
  {
    id: "1",
    user: {
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
    },
    avatar: "/placeholder.svg?height=200&width=200",
    password: "securepass123",
    bio: "Senior content moderator with 5 years of experience in community management and content review.",
    assignmentSubmissions: [
      {
        id: "a1",
        title: "Review Content Guidelines",
        date: "2023-04-15",
        status: "PENDING",
      },
      {
        id: "a2",
        title: "Moderate Forum Posts",
        date: "2023-04-16",
        status: "PENDING",
      },
      {
        id: "a3",
        title: "Check Reported Comments",
        date: "2023-04-17",
        status: "PENDING",
      },
      {
        id: "a4",
        title: "Update Community Rules",
        date: "2023-04-18",
        status: "PENDING",
      },
      {
        id: "a5",
        title: "Verify User Accounts",
        date: "2023-04-19",
        status: "PENDING",
      },
      {
        id: "aa1",
        title: "User Onboarding Guide",
        date: "2023-03-10",
        approvedDate: "2023-03-15",
        status: "PUBLISHED",
      },
      {
        id: "aa2",
        title: "Community Guidelines Update",
        date: "2023-03-12",
        approvedDate: "2023-03-18",
        status: "PUBLISHED",
      },
      {
        id: "aa3",
        title: "Moderation Training Materials",
        date: "2023-03-15",
        approvedDate: "2023-03-20",
        status: "PUBLISHED",
      },
      {
        id: "aa4",
        title: "Weekly Report Template",
        date: "2023-03-18",
        approvedDate: "2023-03-22",
        status: "PUBLISHED",
      },
      {
        id: "aa5",
        title: "Feedback Collection System",
        date: "2023-03-20",
        approvedDate: "2023-03-25",
        status: "PUBLISHED",
      },
      {
        id: "aa6",
        title: "User Satisfaction Survey",
        date: "2023-03-22",
        approvedDate: "2023-03-28",
        status: "PUBLISHED",
      },
      {
        id: "aa7",
        title: "Content Filtering Rules",
        date: "2023-03-25",
        approvedDate: "2023-03-30",
        status: "PUBLISHED",
      },
      {
        id: "aa8",
        title: "Automated Moderation Setup",
        date: "2023-03-28",
        approvedDate: "2023-04-02",
        status: "PUBLISHED",
      },
      {
        id: "aa9",
        title: "Crisis Response Protocol",
        date: "2023-03-30",
        approvedDate: "2023-04-05",
        status: "PUBLISHED",
      },
      {
        id: "aa10",
        title: "Community Event Planning",
        date: "2023-04-01",
        approvedDate: "2023-04-08",
        status: "PUBLISHED",
      },
      {
        id: "aa11",
        title: "User Reward System",
        date: "2023-04-03",
        approvedDate: "2023-04-10",
        status: "PUBLISHED",
      },
      {
        id: "aa12",
        title: "Moderation Team Schedule",
        date: "2023-04-05",
        approvedDate: "2023-04-12",
        status: "PUBLISHED",
      },
    ],
    workshopParticipants: [
      {
        id: "w1",
        title: "Advanced Content Moderation Workshop",
        date: "2023-04-14",
        score: null,
      },
      {
        id: "w2",
        title: "Conflict Resolution Techniques",
        date: "2023-04-15",
        score: null,
      },
      {
        id: "w3",
        title: "Policy Enforcement Training",
        date: "2023-04-16",
        score: null,
      },
      {
        id: "wa1",
        title: "Community Management Basics",
        date: "2023-03-05",
        approvedDate: "2023-03-10",
        score: 95,
      },
      {
        id: "wa2",
        title: "User Support Fundamentals",
        date: "2023-03-08",
        approvedDate: "2023-03-15",
        score: 92,
      },
      {
        id: "wa3",
        title: "Content Review Best Practices",
        date: "2023-03-12",
        approvedDate: "2023-03-18",
        score: 88,
      },
      {
        id: "wa4",
        title: "Policy Implementation Workshop",
        date: "2023-03-15",
        approvedDate: "2023-03-20",
        score: 90,
      },
    ],
    EventParticipant: [
      {
        id: "e1",
        title: "Quarterly Moderator Meeting",
        date: "2023-04-20",
        score: null,
      },
      {
        id: "e2",
        title: "Platform Update Briefing",
        date: "2023-04-22",
        score: null,
      },
      {
        id: "ea1",
        title: "Annual Moderator Conference",
        date: "2023-03-15",
        approvedDate: "2023-03-20",
        score: 95,
      },
      {
        id: "ea2",
        title: "Community Guidelines Workshop",
        date: "2023-03-18",
        approvedDate: "2023-03-25",
        score: 90,
      },
    ],
    skillsReviewer: [
      {
        id: "s1",
        title: "Advanced Content Moderation",
        date: "2023-04-14",
        status: "PENDING",
      },
      {
        id: "s2",
        title: "Conflict Resolution",
        date: "2023-04-15",
        status: "PENDING",
      },
      {
        id: "s3",
        title: "Policy Enforcement",
        date: "2023-04-16",
        status: "PENDING",
      },
      {
        id: "s4",
        title: "User Behavior Analysis",
        date: "2023-04-17",
        status: "PENDING",
      },
      {
        id: "sa1",
        title: "Content Moderation",
        date: "2023-03-05",
        approvedDate: "2023-03-10",
        status: "APPROVED",
      },
      {
        id: "sa2",
        title: "User Support",
        date: "2023-03-08",
        approvedDate: "2023-03-15",
        status: "APPROVED",
      },
      {
        id: "sa3",
        title: "Community Management",
        date: "2023-03-12",
        approvedDate: "2023-03-18",
        status: "APPROVED",
      },
      {
        id: "sa4",
        title: "Policy Implementation",
        date: "2023-03-15",
        approvedDate: "2023-03-20",
        status: "APPROVED",
      },
      {
        id: "sa5",
        title: "Conflict Resolution",
        date: "2023-03-18",
        approvedDate: "2023-03-25",
        status: "APPROVED",
      },
      {
        id: "sa6",
        title: "Technical Troubleshooting",
        date: "2023-03-22",
        approvedDate: "2023-03-28",
        status: "APPROVED",
      },
      {
        id: "sa7",
        title: "Data Analysis",
        date: "2023-03-25",
        approvedDate: "2023-04-01",
        status: "APPROVED",
      },
      {
        id: "sa8",
        title: "Report Generation",
        date: "2023-03-28",
        approvedDate: "2023-04-05",
        status: "APPROVED",
      },
    ],
  },
  // Other moderators...
];

export default function ModeratorDetail({ id }) {
  const [moderator, setModerator] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState("");

  // Items state
  const [pendingAssignments, setPendingAssignments] = useState([]);
  const [pendingWorkshops, setPendingWorkshops] = useState([]);
  const [pendingEvents, setPendingEvents] = useState([]);
  const [pendingSkills, setPendingSkills] = useState([]);

  const [approvedAssignments, setApprovedAssignments] = useState([]);
  const [approvedWorkshops, setApprovedWorkshops] = useState([]);
  const [approvedEvents, setApprovedEvents] = useState([]);
  const [approvedSkills, setApprovedSkills] = useState([]);

  useEffect(() => {
    const fetchModerator = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, this would fetch from an API
        // For now, we'll use mock data
        const response = await new Promise((resolve) =>
          setTimeout(() => {
            const mod = MOCK_MODERATORS.find((m) => m.id === id);
            resolve({
              status: mod ? 200 : 404,
              error: mod ? null : "Moderator not found",
              data: mod,
            });
          }, 800)
        );

        if (!response.error && response.status === 200) {
          const mod = response.data;
          setModerator(mod);

          // Set form state
          setName(mod.user?.name || "");
          setEmail(mod.user?.email || "");
          setPassword(mod.password || "");
          setBio(mod.bio || "");
          setAvatar(mod.avatar || "");

          // Set items state
          setPendingAssignments(
            mod.assignmentSubmissions?.filter(
              (item) => item.status === "PENDING"
            ) || []
          );
          setPendingWorkshops(
            mod.workshopParticipants?.filter((item) => item.score === null) ||
              []
          );
          setPendingEvents(
            mod.EventParticipant?.filter((item) => item.score === null) || []
          );
          setPendingSkills(
            mod.skillsReviewer?.filter((item) => item.status === "PENDING") ||
              []
          );

          setApprovedAssignments(
            mod.assignmentSubmissions?.filter(
              (item) => item.status === "PUBLISHED"
            ) || []
          );
          setApprovedWorkshops(
            mod.workshopParticipants?.filter((item) => item.score !== null) ||
              []
          );
          setApprovedEvents(
            mod.EventParticipant?.filter((item) => item.score !== null) || []
          );
          setApprovedSkills(
            mod.skillsReviewer?.filter((item) => item.status === "APPROVED") ||
              []
          );
        }
      } catch (error) {
        console.error("Failed to fetch moderator:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchModerator();
    }
  }, [id]);

  const handleRemoveItem = (itemType, itemId) => {
    switch (itemType) {
      case "assignment":
        setPendingAssignments(
          pendingAssignments.filter((item) => item.id !== itemId)
        );
        break;
      case "workshop":
        setPendingWorkshops(
          pendingWorkshops.filter((item) => item.id !== itemId)
        );
        break;
      case "event":
        setPendingEvents(pendingEvents.filter((item) => item.id !== itemId));
        break;
      case "skill":
        setPendingSkills(pendingSkills.filter((item) => item.id !== itemId));
        break;
    }
  };

  const handleClearAllItems = (itemType) => {
    switch (itemType) {
      case "assignment":
        setPendingAssignments([]);
        break;
      case "workshop":
        setPendingWorkshops([]);
        break;
      case "event":
        setPendingEvents([]);
        break;
      case "skill":
        setPendingSkills([]);
        break;
      case "all":
        setPendingAssignments([]);
        setPendingWorkshops([]);
        setPendingEvents([]);
        setPendingSkills([]);
        break;
    }
  };

  const handleResetModerator = () => {
    if (!moderator) return;

    // Reset form state
    setName(moderator.user?.name || "");
    setEmail(moderator.user?.email || "");
    setPassword(moderator.password || "");
    setBio(moderator.bio || "");
    setAvatar(moderator.avatar || "");

    // Reset items state
    setPendingAssignments(
      moderator.assignmentSubmissions?.filter(
        (item) => item.status === "PENDING"
      ) || []
    );
    setPendingWorkshops(
      moderator.workshopParticipants?.filter((item) => item.score === null) ||
        []
    );
    setPendingEvents(
      moderator.EventParticipant?.filter((item) => item.score === null) || []
    );
    setPendingSkills(
      moderator.skillsReviewer?.filter((item) => item.status === "PENDING") ||
        []
    );

    setApprovedAssignments(
      moderator.assignmentSubmissions?.filter(
        (item) => item.status === "PUBLISHED"
      ) || []
    );
    setApprovedWorkshops(
      moderator.workshopParticipants?.filter((item) => item.score !== null) ||
        []
    );
    setApprovedEvents(
      moderator.EventParticipant?.filter((item) => item.score !== null) || []
    );
    setApprovedSkills(
      moderator.skillsReviewer?.filter((item) => item.status === "APPROVED") ||
        []
    );
  };

  const handleSaveChanges = () => {
    // In a real app, this would save to a database
    alert("Changes saved successfully!");
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-12 w-12 rounded-full bg-muted animate-pulse"></div>
          <div className="space-y-2 flex-1">
            <div className="h-6 bg-muted rounded animate-pulse w-1/3"></div>
            <div className="h-4 bg-muted rounded animate-pulse w-1/4"></div>
          </div>
        </div>

        <div className="h-10 bg-muted rounded animate-pulse w-full"></div>

        <div className="space-y-4">
          <div className="h-64 bg-muted rounded-lg animate-pulse w-full"></div>
          <div className="h-64 bg-muted rounded-lg animate-pulse w-full"></div>
        </div>
      </div>
    );
  }

  if (!moderator) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center space-y-4">
          <User className="h-16 w-16 mx-auto text-muted-foreground" />
          <h2 className="text-2xl font-bold">Moderator Not Found</h2>
          <p className="text-muted-foreground">
            The moderator you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/dashboard/moderators">
            <Button className="mt-4">Return to Moderator List</Button>
          </Link>
        </div>
      </div>
    );
  }

  const totalPendingCount =
    pendingAssignments.length +
    pendingWorkshops.length +
    pendingEvents.length +
    pendingSkills.length;
  const totalApprovedCount =
    approvedAssignments.length +
    approvedWorkshops.length +
    approvedEvents.length +
    approvedSkills.length;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/dashboard/moderators">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to List
          </Button>
        </Link>
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg border border-primary/20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-20 w-20 border-2 border-primary/30">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback className="bg-primary/10 text-primary text-xl">
                  {name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-background rounded-full p-0.5 border border-border">
                <Badge className="h-7 w-7 rounded-full p-0 flex items-center justify-center text-xs font-bold">
                  {totalPendingCount}
                </Badge>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{name}</h1>
              <p className="text-muted-foreground">{email}</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline" className="bg-primary/5">
                  {totalPendingCount} Pending
                </Badge>
                <Badge variant="outline" className="bg-primary/5">
                  {totalApprovedCount} Approved
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="gap-1">
                  <RefreshCw className="h-4 w-4" />
                  Reset
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Reset Moderator Information?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This will reset all moderator information to its original
                    state. Any unsaved changes will be lost.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleResetModerator}>
                    Reset
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button onClick={handleSaveChanges} className="gap-1">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="pending" className="gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Pending Items</span>
            <Badge variant="secondary" className="ml-1">
              {totalPendingCount}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="approved" className="gap-2">
            <CheckCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Approved Items</span>
            <Badge variant="secondary" className="ml-1">
              {totalApprovedCount}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update the moderator's profile details and credentials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-32 w-32 border-2 border-muted">
                    <AvatarImage src={avatar} alt={name} />
                    <AvatarFallback className="text-2xl">
                      {name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Image
                  </Button>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-muted/40 focus:bg-background transition-colors"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-muted/40 focus:bg-background transition-colors"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label
                      htmlFor="password"
                      className="flex items-center gap-2"
                    >
                      <Key className="h-4 w-4 text-muted-foreground" />
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-muted/40 focus:bg-background transition-colors pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showPassword ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="min-h-[100px] bg-muted/40 focus:bg-background transition-colors"
                      placeholder="Enter moderator bio or description"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 flex justify-end">
              <Button onClick={handleSaveChanges} className="gap-1">
                <Save className="h-4 w-4" />
                Save Profile
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="mt-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-500" />
              Pending Items
            </h2>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear All Pending
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear All Pending Items?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will remove all pending assignments, workshops, events,
                    and skills. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleClearAllItems("all")}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Clear All
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <PendingItemsList
            title="Assignments"
            items={pendingAssignments}
            onRemoveItem={(id) => handleRemoveItem("assignment", id)}
            onClearAll={() => handleClearAllItems("assignment")}
            icon={<ClipboardIcon className="h-4 w-4 text-primary" />}
          />

          <PendingItemsList
            title="Workshops"
            items={pendingWorkshops}
            onRemoveItem={(id) => handleRemoveItem("workshop", id)}
            onClearAll={() => handleClearAllItems("workshop")}
            icon={<BookOpenIcon className="h-4 w-4 text-primary" />}
          />

          <PendingItemsList
            title="Events"
            items={pendingEvents}
            onRemoveItem={(id) => handleRemoveItem("event", id)}
            onClearAll={() => handleClearAllItems("event")}
            icon={<CalendarIcon className="h-4 w-4 text-primary" />}
          />

          <PendingItemsList
            title="Skills"
            items={pendingSkills}
            onRemoveItem={(id) => handleRemoveItem("skill", id)}
            onClearAll={() => handleClearAllItems("skill")}
            icon={<AwardIcon className="h-4 w-4 text-primary" />}
          />
        </TabsContent>

        <TabsContent value="approved" className="mt-6 space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-5 w-5 text-emerald-500" />
            <h2 className="text-lg font-medium">Approved Items</h2>
          </div>

          <ApprovedItemsList
            title="Assignments"
            items={approvedAssignments}
            icon={<ClipboardIcon className="h-4 w-4 text-emerald-500" />}
          />

          <ApprovedItemsList
            title="Workshops"
            items={approvedWorkshops}
            icon={<BookOpenIcon className="h-4 w-4 text-emerald-500" />}
          />

          <ApprovedItemsList
            title="Events"
            items={approvedEvents}
            icon={<CalendarIcon className="h-4 w-4 text-emerald-500" />}
          />

          <ApprovedItemsList
            title="Skills"
            items={approvedSkills}
            icon={<AwardIcon className="h-4 w-4 text-emerald-500" />}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function PendingItemsList({ title, items, onRemoveItem, onClearAll, icon }) {
  if (items.length === 0) {
    return (
      <Card className="bg-muted/30">
        <CardContent className="pt-6 text-center py-8">
          <div className="flex flex-col items-center justify-center text-muted-foreground">
            {icon}
            <p className="mt-2">No pending {title.toLowerCase()}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="text-base">{title}</CardTitle>
          <Badge variant="secondary">{items.length}</Badge>
        </div>
      </CardHeader>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-red-500 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
            Clear All
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove all pending {title.toLowerCase()}. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onClearAll}>
              Clear All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <CardContent>
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 bg-muted/50 rounded-md hover:bg-muted/70 transition-colors"
            >
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">
                  Added on {item.date}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveItem(item.id)}
                aria-label={`Remove ${item.title}`}
                className="text-muted-foreground hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ApprovedItemsList({ title, items, icon }) {
  if (items.length === 0) {
    return (
      <Card className="bg-muted/30">
        <CardContent className="pt-6 text-center py-8">
          <div className="flex flex-col items-center justify-center text-muted-foreground">
            {icon}
            <p className="mt-2">No approved {title.toLowerCase()}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="text-base">{title}</CardTitle>
          <Badge variant="secondary">{items.length}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2">
          {items.map((item) => (
            <div key={item.id} className="p-3 bg-muted/30 rounded-md">
              <p className="font-medium">{item.title}</p>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Created: {item.date}</span>
                <span>Approved: {item.approvedDate}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Icon components
function ClipboardIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path
        d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0
</cut_off_point>

0 1-2-2V6a2 2 0 0 1 2-2h2"
      ></path>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
    </svg>
  );
}

function BookOpenIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
  );
}

function CalendarIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );
}

function AwardIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="8" r="7"></circle>
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
    </svg>
  );
}
