import { Progress } from "@/components/ui/progress"

export function PasswordStrengthMeter({
  strength
}) {
  const getColor = (strength) => {
    if (strength < 30) return "bg-red-500"
    if (strength < 60) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    (<div className="mt-2">
      <Progress value={strength} className={`h-2 ${getColor(strength)}`} />
      <p className="text-sm text-muted-foreground mt-1">
        Password strength: {strength < 30 ? "Weak" : strength < 60 ? "Medium" : "Strong"}
      </p>
    </div>)
  );
}

