import { useState } from "react";
import { BottomNavbar } from "@/components/BottomNavbar";
import { ConfessionsView } from "@/components/ConfessionsView";
import { Category } from "@/lib/types";

export const MainLayout = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-divine-light/20 to-white">
      <main className="pb-20">
        <ConfessionsView selectedCategory={selectedCategory} />
      </main>
      <BottomNavbar
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};
