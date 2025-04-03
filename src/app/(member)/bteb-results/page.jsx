import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function BetbResultCheckerPage() {
  return (
    <div className="w-full max-w-md mx-auto text-center space-y-8 animate-fade-in py-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold  sm:text-4xl md:text-5xl">
          BTEB Result Checker
        </h1>
        <p className="text-slate-500 dark:text-slate-400 md:text-lg">
          Check your Bangladesh Technical Education Board examination results
          quickly and easily.
        </p>
      </div>
      <div className="flex justify-center">
        <Link href="/bteb-results/check-result">
          <Button size="lg" className="group">
            Check Your Result
            <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
