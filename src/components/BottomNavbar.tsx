import { useState } from "react";
import { Home, Bookmark, PlusCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CategorySelector } from "@/components/CategorySelector";
import { Category } from "@/lib/types";

type NewConfessionFormData = {
  text: string;
  categories: string[];
};

interface BottomNavbarProps {
  onSelectCategory: (category: Category) => void;
  selectedCategory: Category | null;
}

export const BottomNavbar = ({
  onSelectCategory,
  selectedCategory,
}: BottomNavbarProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [formData, setFormData] = useState<NewConfessionFormData>({
    text: "",
    categories: [],
  });

  const handleAddConfession = () => {
    setShowAddForm(true);
    setShowCategories(false);
  };

  const handleShowCategories = () => {
    setShowCategories(true);
    setShowAddForm(false);
  };

  const handleHomeClick = () => {
    setShowCategories(false);
    setShowAddForm(false);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setFormData({ text: "", categories: [] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would add logic to save the confession
    console.log("Saving confession:", formData);

    // In a real app, you would call an API to save the data
    // For demo purposes, we'll just close the form
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
            <Home
              className={`h-6 w-6 ${
                !showCategories ? "text-divine-blue" : "text-divine-blue/60"
              }`}
            />
            <span
              className={`text-xs font-calligraphy text-base ${
                !showCategories ? "text-divine-blue" : "text-divine-blue/60"
              }`}
            >
              Home
            </span>
          </Button>

          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 h-auto py-2"
            onClick={handleShowCategories}
          >
            <Bookmark
              className={`h-6 w-6 ${
                showCategories ? "text-divine-blue" : "text-divine-blue/60"
              }`}
            />
            <span
              className={`text-xs font-calligraphy text-base ${
                showCategories ? "text-divine-blue" : "text-divine-blue/60"
              }`}
            >
              Categories
            </span>
          </Button>

          <Button
            onClick={handleAddConfession}
            className="bg-divine-blue/90 hover:bg-divine-blue backdrop-blur-sm text-white rounded-full flex flex-col items-center gap-1 h-auto py-2 px-4 shadow-md"
          >
            <PlusCircle className="h-6 w-6" />
            <span className="text-xs font-calligraphy text-base">Add</span>
          </Button>
        </div>
      </div>

      {/* Categories Panel */}
      {showCategories && (
        <div className="fixed bottom-[80px] left-0 right-0 bg-white/90 backdrop-blur-md p-6 border-t border-divine-light/50 shadow-lg z-30 max-h-[70vh] overflow-y-auto transition-all duration-300 ease-in-out">
          <h2 className="text-2xl font-script text-divine-blue mb-4 text-center">
            Explore by Category
          </h2>
          <CategorySelector
            onSelectCategory={onSelectCategory}
            selectedCategory={selectedCategory}
          />
        </div>
      )}

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
