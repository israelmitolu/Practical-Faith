import { useState } from "react";
import { Home, PlusCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Category } from "@/lib/types";
import { CategoriesDrawer } from "@/components/CategoriesDrawer";
import { saveConfession } from "@/lib/utils";

type NewConfessionFormData = {
  text: string;
  categories: string[];
};

interface BottomNavbarProps {
  onSelectCategory: (category: Category) => void;
  selectedCategory: Category | null;
  onConfessionAdded?: () => void;
}

export const BottomNavbar = ({
  onSelectCategory,
  selectedCategory,
  onConfessionAdded,
}: BottomNavbarProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<NewConfessionFormData>({
    text: "",
    categories: [],
  });

  const handleAddConfession = () => {
    setShowAddForm(true);
  };

  const handleHomeClick = () => {
    // Reset any selected category
    onSelectCategory(null);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setFormData({ text: "", categories: [] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create a new confession object
    const newConfession = {
      id: Date.now().toString(), // Simple unique ID
      text: formData.text,
      categories: formData.categories,
      createdAt: new Date(),
    };

    // Save to localStorage
    saveConfession(newConfession);

    // Notify parent component
    onConfessionAdded?.();

    // Close the form
    handleCloseForm();
  };

  const handleCategoryToggle = (category: string) => {
    setFormData((prev) => {
      if (prev.categories.includes(category)) {
        return {
          ...prev,
          categories: prev.categories.filter((c) => c !== category),
        };
      } else {
        return {
          ...prev,
          categories: [...prev.categories, category],
        };
      }
    });
  };

  const availableCategories = [
    "Hope",
    "Faith",
    "Love",
    "Peace",
    "Joy",
    "Strength",
    "Wisdom",
    "Healing",
    "Purpose",
  ];

  return (
    <>
      {/* Bottom Navigation - Frosted Glass Effect */}
      <div className="fixed bottom-0 left-0 right-0 backdrop-blur-md bg-white/60 shadow-lg py-3 px-4 border-t border-divine-light/50 z-40">
        <div className="max-w-md mx-auto flex justify-around items-center">
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 h-auto py-2"
            onClick={handleHomeClick}
          >
            <Home className="h-6 w-6 text-divine-blue" />
            <span className="text-xs font-calligraphy text-base text-divine-blue">
              Home
            </span>
          </Button>

          <CategoriesDrawer
            onSelectCategory={onSelectCategory}
            selectedCategory={selectedCategory}
          />

          <Button
            onClick={handleAddConfession}
            className="bg-divine-blue/90 hover:bg-divine-blue backdrop-blur-sm text-white rounded-full flex flex-col items-center gap-1 h-auto py-2 px-4 shadow-md"
          >
            <PlusCircle className="h-6 w-6" />
            <span className="text-xs font-calligraphy text-base">Add</span>
          </Button>
        </div>
      </div>

      {/* Add Confession Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-xl w-full max-w-md p-6 max-h-[80vh] overflow-y-auto border border-divine-light/50">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-script text-divine-blue">
                Add Your Confession
              </h2>
              <Button size="icon" variant="ghost" onClick={handleCloseForm}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="confession"
                  className="block font-elegant text-divine-blue mb-2"
                >
                  Your Confession
                </label>
                <textarea
                  id="confession"
                  rows={5}
                  className="w-full border border-divine-light rounded-md p-3 focus:ring-1 focus:ring-divine-blue focus:border-divine-blue bg-white/80 backdrop-blur-sm"
                  placeholder="Write your confession here..."
                  value={formData.text}
                  onChange={(e) =>
                    setFormData({ ...formData, text: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block font-elegant text-divine-blue mb-2">
                  Categories (select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableCategories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => handleCategoryToggle(category)}
                      className={cn(
                        "px-3 py-1 rounded-full text-sm font-handwritten transition-colors",
                        formData.categories.includes(category)
                          ? "bg-divine-blue/90 backdrop-blur-sm text-white shadow-md"
                          : "bg-divine-light/80 backdrop-blur-sm text-divine-blue hover:bg-divine-light shadow-sm"
                      )}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-divine-blue/90 backdrop-blur-sm hover:bg-divine-blue font-script text-lg shadow-md"
                >
                  Save Confession
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
