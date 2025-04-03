"use client";
import { useResultCard } from "./result-card-provider";

export default function ResultCardRef({ children }) {
  const { resultCardRef } = useResultCard();
  return (
    <>
      <div ref={resultCardRef} className="result-container">
        {children}
      </div>
    </>
  );
}
