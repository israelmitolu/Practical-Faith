import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { MoodSelector } from "@/components/MoodSelector";
import { CategorySelector } from "@/components/CategorySelector";
import { ConfessionCard } from "@/components/ConfessionCard";
import { BackgroundPattern } from "@/components/BackgroundPattern";
import { 
  confessions, 
  getConfessionsByMood, 
  getConfessionsByCategory,
  getDailyConfession
} from "@/lib/data";
import { Category, Confession, Mood } from "@/lib/types";
import { Toaster } from "@/components/ui/sonner";

const Index = () => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [displayedConfessions, setDisplayedConfessions] = useState<Confession[]>([]);
  const [dailyConfession, setDailyConfession] = useState<Confession | null>(null);

  useEffect(() => {
    // Set the daily confession
    setDailyConfession(getDailyConfession());
    
    // Initialize with all confessions
    setDisplayedConfessions(confessions.slice(0, 6));
  }, []);

  useEffect(() => {
    if (selectedMood) {
      setSelectedCategory(null);
      const moodConfessions = getConfessionsByMood(selectedMood);
      setDisplayedConfessions(moodConfessions);
    } else if (selectedCategory) {
      const categoryConfessions = getConfessionsByCategory(selectedCategory);
      setDisplayedConfessions(categoryConfessions);
    }
  }, [selectedMood, selectedCategory]);

  const handleSelectMood = (mood: Mood) => {
    setSelectedMood(mood);
  };

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    setSelectedMood(null);
  };

  const handleResetFilters = () => {
    setSelectedMood(null);
    setSelectedCategory(null);
    setDisplayedConfessions(confessions.slice(0, 6));
  };

  return (
    <div className="min-h-screen bg-divine-light/30 pb-12">
      <BackgroundPattern />
      <Header />
      
      <main className="max-w-5xl mx-auto px-4">
        {/* Daily Confession */}
        {dailyConfession && (
          <div className="mb-10">
            <h2 className="text-2xl font-serif text-divine-blue mb-4 text-center">Today's Confessions</h2>
            <div className="max-w-2xl mx-auto">
              <ConfessionCard confession={dailyConfession} />
            </div>
          </div>
        )}
        
        {/* Mood Selector */}
        <MoodSelector onSelectMood={handleSelectMood} />
        
        {/* Category Selector */}
        <CategorySelector 
          onSelectCategory={handleSelectCategory} 
          selectedCategory={selectedCategory} 
        />
        
        {/* Filters indicator */}
        {(selectedMood || selectedCategory) && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-divine-blue">
              {selectedMood && `Showing confessions for when you feel ${selectedMood}`}
              {selectedCategory && `Showing ${selectedCategory} confessions`}
            </p>
            <button
              onClick={handleResetFilters}
              className="text-sm text-divine-blue underline hover:text-divine-blue/80"
            >
              Reset filters
            </button>
          </div>
        )}
        
        {/* Confessions Grid */}
        {displayedConfessions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
            {displayedConfessions.map((confession) => (
              <ConfessionCard key={confession.id} confession={confession} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-divine-blue">No confessions found. Please try another category or mood.</p>
          </div>
        )}
      </main>
      
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Index;
