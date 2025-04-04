import { cn } from "@/lib/utils";
import { Award, PartyPopper, Star, Trophy, XCircle } from "lucide-react";

export default function ParticipantBadge({ name, marks, className, evnt }) {
  const getLevelType = (level) => {
    if (level >= 100) return "winner";
    if (level >= 80) return "excellent";
    if (level >= 60) return "great";
    if (level >= 40) return "good";
    return "failed";
  };

  const levelType = getLevelType(marks);

  const iconMap = {
    winner: Trophy,
    excellent: Award,
    great: Star,
    good: PartyPopper,
    failed: XCircle,
  };

  const colorMap = {
    winner: "text-yellow-400",
    excellent: "text-amber-400",
    great: "text-blue-400",
    good: "text-green-400",
    failed: "text-red-400",
  };

  const Icon = iconMap[levelType];

  return (
    <div className={cn("flex items-center gap-3 py-2", className)}>
      <Icon className={cn("h-6 w-6", colorMap[levelType])} />
      <span className="text-base font-medium">{name}</span>
    </div>
  );
}
