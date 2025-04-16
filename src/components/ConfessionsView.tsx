import { useState, useEffect } from "react";
import { Category } from "@/lib/types";
import { cn } from "@/lib/utils";
import { getStoredConfessions } from "@/lib/utils";

interface Confession {
  id: string;
  text: string;
  categories: string[];
  createdAt: Date;
}

interface ConfessionsViewProps {
  selectedCategory: Category | null;
}

export const ConfessionsView = ({ selectedCategory }: ConfessionsViewProps) => {
  const [confessions, setConfessions] = useState<Confession[]>([]);

  useEffect(() => {
    // Load confessions from localStorage
    const storedConfessions = getStoredConfessions();
    setConfessions(storedConfessions);
  }, []);

  // Filter confessions based on selected category
  const filteredConfessions = selectedCategory
    ? confessions.filter((confession) =>
        confession.categories.includes(selectedCategory.name)
      )
    : confessions;

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-script text-divine-blue mb-4">
        {selectedCategory
          ? `Confessions in ${selectedCategory.name}`
          : "All Confessions"}
      </h2>
      <div className="space-y-4">
        {filteredConfessions.map((confession) => (
          <div
            key={confession.id}
            className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-divine-light/50"
          >
            <p className="text-gray-800 mb-2">{confession.text}</p>
            <div className="flex flex-wrap gap-2">
              {confession.categories.map((category) => (
                <span
                  key={category}
                  className={cn(
                    "px-2 py-1 rounded-full text-xs font-handwritten",
                    "bg-divine-light/80 text-divine-blue"
                  )}
                >
                  {category}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {new Date(confession.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
        {filteredConfessions.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            No confessions found. Add a new confession to get started!
          </p>
        )}
      </div>
    </div>
  );
};
