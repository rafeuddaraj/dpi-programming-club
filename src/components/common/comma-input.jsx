"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useRef, useState } from "react";
import { useController } from "react-hook-form";

export default function CommaInput({
  name,
  control,
  label,
  placeholder,
  error,
  className,
}) {
  const [inputValue, setInputValue] = useState();
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Use React Hook Form's controller to manage the field
  const {
    field: { value = [], onChange },
    fieldState: { error: fieldError },
  } = useController({
    name,
    control,
    defaultValue: [],
  });

  // Focus the input when clicking anywhere in the container
  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  // Handle input changes
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Add skills when comma or enter is pressed
  const handleKeyDown = (e) => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      addSkill();
    } else if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
      // Remove the last skill when backspace is pressed and input is empty
      onChange(value.slice(0, -1));
    }
  };

  // Add skill from input value
  const addSkill = () => {
    const trimmedValue = inputValue.trim().replace(/,/g, "");
    if (trimmedValue && !value.includes(trimmedValue)) {
      onChange([...value, trimmedValue]);
      setInputValue("");
    } else {
      setInputValue("");
    }
  };

  // Handle pasting comma-separated values
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const pastedSkills = pastedText
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill && !value.includes(skill));

    if (pastedSkills.length > 0) {
      onChange([...value, ...pastedSkills]);
      setInputValue("");
    }
  };

  // Remove a skill
  const removeSkill = (skillToRemove) => {
    onChange(value.filter((skill) => skill !== skillToRemove));
  };

  // Get the error message
  const errorMessage = error || fieldError?.message || "";

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label
          htmlFor={`skill-input-${name}`}
          className="block text-sm font-medium mb-2"
        >
          {label}
        </label>
      )}
      <div
        ref={containerRef}
        onClick={handleContainerClick}
        className={cn(
          "flex flex-wrap gap-2 p-2 border rounded-md bg-background focus-within:ring-1 focus-within:ring-ring",
          errorMessage && "border-destructive focus-within:ring-destructive"
        )}
      >
        {value.map((skill) => (
          <Badge
            key={skill}
            variant="secondary"
            className="px-2 py-1 bg-secondary/30 hover:bg-secondary/40 transition-colors"
          >
            {skill}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeSkill(skill);
              }}
              className="ml-1 rounded-full hover:bg-secondary/60 focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {skill}</span>
            </button>
          </Badge>
        ))}
        <Input
          ref={inputRef}
          id={`skill-input-${name}`}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onBlur={addSkill}
          className="flex-1 min-w-[120px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-8"
          placeholder={value.length > 0 ? "" : placeholder}
        />
      </div>
      {errorMessage ? (
        <p className="text-xs text-destructive mt-1">{errorMessage}</p>
      ) : (
        <p className="text-xs text-muted-foreground mt-1">
          Press Enter or comma to add a skill
        </p>
      )}
    </div>
  );
}
