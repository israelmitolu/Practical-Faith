import { useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ConfettiExplosion from "react-confetti-explosion";

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  isToday?: boolean;
}

export const CelebrationModal = ({
  isOpen,
  onClose,
  isToday = false,
}: CelebrationModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] !bg-white/95 backdrop-blur-md border-divine-blue/20">
        <div className="flex flex-col items-center justify-center p-6">
          {isOpen && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100]">
              <ConfettiExplosion
                force={0.8}
                duration={3000}
                particleCount={250}
                width={1600}
                colors={["#FFD700", "#FFA500", "#FF69B4", "#87CEEB"]}
              />
            </div>
          )}
          <img
            src="/Happy Chris Pratt GIF by Parks and Recreation.gif"
            alt="Excited Celebration"
            className="w-full max-w-[400px] rounded-lg shadow-lg"
          />
          <h3 className="text-2xl font-elegant text-divine-blue mt-6 text-center">
            {isToday
              ? "Gloryyy! You've confessed the truth of God's word today! 🙌"
              : "Hallelujah! You've confessed this truth! 🙌"}
          </h3>
        </div>
      </DialogContent>
    </Dialog>
  );
};
