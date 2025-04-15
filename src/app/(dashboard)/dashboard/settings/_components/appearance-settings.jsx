"use client";

import { Switch } from "@/components/ui/switch";

import { Monitor, Moon, Sun } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";

export default function AppearanceSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const { theme, setTheme } = useTheme();
  const [fontSize, setFontSize] = useState(16);
  const [colorScheme, setColorScheme] = useState("default");
  const [reducedMotion, setReducdMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  function saveSettings() {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Appearance settings updated",
        description: "Your appearance preferences have been saved.",
      });
      console.log({
        theme,
        fontSize,
        colorScheme,
        reducedMotion,
        highContrast,
      });
    }, 1000);
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize how the application looks and feels.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Theme</h3>
          <RadioGroup
            defaultValue={theme}
            onValueChange={setTheme}
            className="grid grid-cols-3 gap-4"
          >
            <div>
              <RadioGroupItem
                value="light"
                id="theme-light"
                className="sr-only"
              />
              <Label
                htmlFor="theme-light"
                className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground ${
                  theme === "light" ? "border-primary" : ""
                }`}
              >
                <Sun className="mb-3 h-6 w-6" />
                Light
              </Label>
            </div>

            <div>
              <RadioGroupItem
                value="dark"
                id="theme-dark"
                className="sr-only"
              />
              <Label
                htmlFor="theme-dark"
                className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground ${
                  theme === "dark" ? "border-primary" : ""
                }`}
              >
                <Moon className="mb-3 h-6 w-6" />
                Dark
              </Label>
            </div>

            <div>
              <RadioGroupItem
                value="system"
                id="theme-system"
                className="sr-only"
              />
              <Label
                htmlFor="theme-system"
                className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground ${
                  theme === "system" ? "border-primary" : ""
                }`}
              >
                <Monitor className="mb-3 h-6 w-6" />
                System
              </Label>
            </div>
          </RadioGroup>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Font Size</h3>
            <span className="text-sm text-muted-foreground">{fontSize}px</span>
          </div>
          <Slider
            defaultValue={[fontSize]}
            min={12}
            max={24}
            step={1}
            onValueChange={(value) => setFontSize(value[0])}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Small</span>
            <span>Default</span>
            <span>Large</span>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Color Scheme</h3>
          <Select defaultValue={colorScheme} onValueChange={setColorScheme}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a color scheme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
              <SelectItem value="warm">Warm</SelectItem>
              <SelectItem value="cool">Cool</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Accessibility</h3>
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <h4 className="font-medium">Reduced Motion</h4>
              <p className="text-sm text-muted-foreground">
                Reduce the amount of animations and transitions.
              </p>
            </div>
            <Switch checked={reducedMotion} onCheckedChange={setReducdMotion} />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <h4 className="font-medium">High Contrast</h4>
              <p className="text-sm text-muted-foreground">
                Increase the contrast between elements.
              </p>
            </div>
            <Switch checked={highContrast} onCheckedChange={setHighContrast} />
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={saveSettings} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Preferences"}
          </Button>
        </div>
      </CardContent>
    </>
  );
}
