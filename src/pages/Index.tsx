import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { MoodSelector } from "@/components/MoodSelector";
import { ConfessionCard } from "@/components/ConfessionCard";
import { BackgroundPattern } from "@/components/BackgroundPattern";
import { BottomNavbar } from "@/components/BottomNavbar";
import { Preloader } from "@/components/Preloader";
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
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);

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
      setDisplayedConfessions([...userConfessions, ...confessions.slice(0, 6)]);
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
    <>
      <Preloader onComplete={() => setIsPreloaderComplete(true)} />

      <AnimatePresence>
        {isPreloaderComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-divine-light/30 pb-24"
          >
            <BackgroundPattern />
            <Header />

            <main className="max-w-5xl mx-auto px-4">
              {/* Daily Confession */}
              <AnimatePresence>
                {dailyConfession && (
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10"
                  >
                    <motion.h2
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-2xl font-script text-divine-blue mb-4 text-center"
                    >
                      Today's Confessions
                    </motion.h2>
                    <div className="max-w-2xl mx-auto">
                      <ConfessionCard confession={dailyConfession} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mood Selector */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <MoodSelector onSelectMood={handleSelectMood} />
              </motion.div>

              {/* Filters indicator */}
              <AnimatePresence>
                {(selectedMood || selectedCategory) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between mb-6 mt-6 bg-white/70 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-divine-light/50"
                  >
                    <p className="text-divine-blue font-handwritten text-lg">
                      {selectedMood &&
                        `Showing confessions for when you feel ${selectedMood}`}
                      {selectedCategory &&
                        selectedCategory !== "my-confessions" &&
                        `Showing ${selectedCategory} confessions`}
                      {selectedCategory === "my-confessions" &&
                        `Showing your confessions`}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleResetFilters}
                      className="text-sm text-divine-blue underline hover:text-divine-blue/80 font-elegant"
                    >
                      Reset filters
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Confessions Grid */}
              <AnimatePresence mode="wait">
                {displayedConfessions.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6"
                  >
                    {displayedConfessions.map((confession, index) => (
                      <motion.div
                        key={confession.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <ConfessionCard
                          confession={confession}
                          onDelete={handleConfessionAdded}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-8 bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-sm"
                  >
                    <p className="text-divine-blue font-elegant text-xl">
                      No confessions found. Please try another category or mood.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </main>

            <BottomNavbar
              onSelectCategory={handleSelectCategory}
              selectedCategory={selectedCategory}
              onConfessionAdded={handleConfessionAdded}
            />
            <Toaster position="bottom-center" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
