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
    <header className="py-6 mb-4">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col items-center justify-between space-y-2 md:flex-row md:space-y-0 md:space-x-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-divine-gradient">
              Daily Divine Declarations
            </h1>
            {name && (
              <p className="text-lg text-divine-blue mt-1 animate-fade-in">
                {getGreeting()}, <span className="font-medium">{name}</span>
              </p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <AvatarPicker />
            <Button
              variant="outline"
              onClick={() => setShowModal(true)}
              className="border-divine-blue/20 text-divine-blue hover:bg-divine-blue/10"
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
