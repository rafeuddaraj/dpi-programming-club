"use client";

export function ParticipantScoreDisplay({ score }) {
  if (score === null) {
    return <span className="text-muted-foreground">Not graded</span>;
  }

  return (
    <span
      className={`font-bold ${
        score >= 80
          ? "text-green-500"
          : score >= 60
          ? "text-yellow-500"
          : "text-red-500"
      }`}
    >
      {score}%
    </span>
  );
}
