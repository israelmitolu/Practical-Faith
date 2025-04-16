import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { MoodSelector } from "@/components/MoodSelector";
import { ConfessionCard } from "@/components/ConfessionCard";
import { BackgroundPattern } from "@/components/BackgroundPattern";
import { BottomNavbar } from "@/components/BottomNavbar";
import {
  confessions,
  getConfessionsByMood,
  getConfessionsByCategory,
  getDailyConfession,
} from "@/lib/data";
import { Category, Confession, Mood } from "@/lib/types";
import { Toaster } from "@/components/ui/sonner";
import { getStoredConfessions } from "@/lib/utils";

const Index = () => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [displayedConfessions, setDisplayedConfessions] = useState<
    Confession[]
  >([]);
  const [dailyConfession, setDailyConfession] = useState<Confession | null>(
    null
  );
  const [userConfessions, setUserConfessions] = useState<Confession[]>([]);

  useEffect(() => {
    // Set the daily confession
    setDailyConfession(getDailyConfession());

    // Load user's stored confessions
    const storedConfessions = getStoredConfessions();
    setUserConfessions(storedConfessions);

    // Initialize with all confessions
    setDisplayedConfessions(confessions.slice(0, 6));
  }, []);

  useEffect(() => {
    if (selectedMood) {
      setSelectedCategory(null);
      const moodConfessions = getConfessionsByMood(selectedMood);
      setDisplayedConfessions(moodConfessions);
    } else if (selectedCategory) {
      if (selectedCategory === "my-confessions") {
        // Show only user-added confessions
        setDisplayedConfessions(userConfessions);
      } else {
        const categoryConfessions = getConfessionsByCategory(selectedCategory);
        setDisplayedConfessions(categoryConfessions);
      }
    } else {
      // Show both predefined and user confessions when no filter is selected
      setDisplayedConfessions([...confessions.slice(0, 6), ...userConfessions]);
    }
  }, [selectedMood, selectedCategory, userConfessions]);

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

  const handleConfessionAdded = () => {
    // Reload stored confessions
    const storedConfessions = getStoredConfessions();
    setUserConfessions(storedConfessions);
  };

  return (
    <div className="min-h-screen bg-divine-light/30 pb-24">
      <BackgroundPattern />
      <Header />

      <main className="max-w-5xl mx-auto px-4">
        {/* Daily Confession */}
        {dailyConfession && (
          <div className="mb-10">
            <h2 className="text-2xl font-script text-divine-blue mb-4 text-center">
              Today's Confessions
            </h2>
            <div className="max-w-2xl mx-auto">
              <ConfessionCard confession={dailyConfession} />
            </div>
          </div>
        )}

        {/* Mood Selector */}
        <MoodSelector onSelectMood={handleSelectMood} />

        {/* Filters indicator */}
        {(selectedMood || selectedCategory) && (
          <div className="flex items-center justify-between mb-6 mt-6 bg-white/70 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-divine-light/50">
            <p className="text-divine-blue font-handwritten text-lg">
              {selectedMood &&
                `Showing confessions for when you feel ${selectedMood}`}
              {selectedCategory !== "my-confessions" &&
                `Showing ${selectedCategory} confessions`}
              {selectedCategory === "my-confessions" &&
                `Showing your confessions`}
            </p>
            <button
              onClick={handleResetFilters}
              className="text-sm text-divine-blue underline hover:text-divine-blue/80 font-elegant"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Confessions Grid */}
        {displayedConfessions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
            {displayedConfessions.map((confession) => (
              <ConfessionCard
                key={confession.id}
                confession={confession}
                onDelete={handleConfessionAdded}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-sm">
            <p className="text-divine-blue font-elegant text-xl">
              No confessions found. Please try another category or mood.
            </p>
          </div>
        )}
      </main>

      <BottomNavbar
        onSelectCategory={handleSelectCategory}
        selectedCategory={selectedCategory}
        onConfessionAdded={handleConfessionAdded}
      />
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Index;
