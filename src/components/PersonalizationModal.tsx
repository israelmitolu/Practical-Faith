
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface PersonalizationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  setName: (name: string) => void;
}

export const PersonalizationModal = ({
  open,
  onOpenChange,
  name,
  setName
}: PersonalizationModalProps) => {
  const [inputValue, setInputValue] = useState(name);

  useEffect(() => {
    setInputValue(name);
  }, [name]);

  const handleSave = () => {
    if (inputValue.trim()) {
      setName(inputValue.trim());
      localStorage.setItem("userName", inputValue.trim());
      onOpenChange(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif text-divine-blue">Personalize Your Experience</DialogTitle>
          <DialogDescription>
            Enter your name to personalize your daily declarations.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Label htmlFor="name" className="mb-2 block text-divine-blue">
            Your Name
          </Label>
          <Input
            id="name"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your name"
            className="focus-visible:ring-divine-blue"
            autoFocus
          />
        </div>
        <DialogFooter>
          <Button 
            onClick={handleSave}
            className="bg-divine-blue hover:bg-divine-blue/90"
            disabled={!inputValue.trim()}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
