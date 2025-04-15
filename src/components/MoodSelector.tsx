
import { useState } from "react";
import { moodOptions } from "@/lib/data";
import { Mood } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

interface MoodSelectorProps {
  onSelectMood: (mood: Mood) => void;
}

export const MoodSelector = ({ onSelectMood }: MoodSelectorProps) => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    onSelectMood(mood);
  };

  return (
    <Card className="border-divine-blue/20 shadow-md overflow-hidden bg-divine-gradient mb-8 animate-fade-in">
      <CardHeader className="bg-divine-blue/5 pb-4">
        <CardTitle className="text-xl text-divine-blue text-center">How do you feel today?</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-9">
          {moodOptions.map((mood) => (
            <Button
              key={mood.value}
              variant="outline"
              className={`flex flex-col h-auto py-3 px-2 border-divine-blue/20 hover:bg-divine-blue/10 transition-all ${
                selectedMood === mood.value
                  ? "bg-divine-blue/10 border-divine-blue/40 ring-1 ring-divine-blue/40"
                  : ""
              }`}
              onClick={() => handleMoodSelect(mood.value)}
            >
              <span className="text-2xl mb-1">{mood.emoji}</span>
              <span className="text-xs font-medium">{mood.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
