import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PersonalizationModal } from "./PersonalizationModal";
import { AvatarPicker } from "./AvatarPicker";

export const Header = () => {
  const [name, setName] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      setName(savedName);
    } else {
      setShowModal(true);
    }
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <header className="py-6 mb-4 bg-white/40 backdrop-blur-md border-b border-divine-light/50 shadow-sm">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col items-center justify-between space-y-2 md:flex-row md:space-y-0 md:space-x-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-script text-divine-gradient">
              Biblical Confessions
            </h1>
            {name && (
              <p className="text-lg md:text-xl text-divine-blue mt-1 animate-fade-in font-elegant">
                {getGreeting()},{" "}
                <span className="font-calligraphy text-xl md:text-2xl">{name} ✨</span>
              </p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <AvatarPicker />
            <Button
              variant="outline"
              onClick={() => setShowModal(true)}
              className="border-divine-blue/20 bg-white/70 backdrop-blur-sm text-divine-blue hover:bg-divine-blue/10 font-handwritten shadow-sm"
            >
              {name ? "Change Name" : "Set Your Name"}
            </Button>
          </div>
        </div>
      </div>

      <PersonalizationModal
        open={showModal}
        onOpenChange={setShowModal}
        name={name}
        setName={setName}
      />
    </header>
  );
};
