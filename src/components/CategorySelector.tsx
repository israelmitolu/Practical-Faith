
import { useState } from "react";
import { Category } from "@/lib/types";
import { categoryLabels } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface CategorySelectorProps {
  onSelectCategory: (category: Category) => void;
  selectedCategory: Category | null;
}

export const CategorySelector = ({
  onSelectCategory,
  selectedCategory,
}: CategorySelectorProps) => {
  const categories = Object.keys(categoryLabels) as Category[];

  return (
    <div className="mb-8 animate-fade-in">
      <h2 className="text-lg font-medium text-divine-blue mb-3 text-center sm:text-left">
        Explore by Category
      </h2>
      <ScrollArea className="whitespace-nowrap pb-4">
        <div className="flex space-x-2 w-max min-w-full px-1">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={
                selectedCategory === category
                  ? "bg-divine-blue hover:bg-divine-blue/90"
                  : "border-divine-blue/20 text-divine-blue hover:bg-divine-blue/10"
              }
              onClick={() => onSelectCategory(category)}
            >
              {categoryLabels[category]}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
