import { useState } from "react";
import { Confession } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Copy, Check, Share2, Sparkles, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { CelebrationModal } from "@/components/CelebrationModal";
import { deleteConfession } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ConfessionCardProps {
  confession: Confession;
  onDelete?: () => void;
}

export const ConfessionCard = ({
  confession,
  onDelete,
}: ConfessionCardProps) => {
  const [copied, setCopied] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const getShareText = () => {
    return `"${confession.text}" - ${confession.scripture}`;
  };

  const shareToWhatsApp = () => {
    const text = getShareText();
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    toast.success("Opening WhatsApp to share");
  };

  const shareToGeneric = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Daily Divine Declaration",
          text: getShareText(),
        })
        .then(() => {
          toast.success("Shared successfully!");
        })
        .catch((error) => {
          console.error("Error sharing:", error);
          toast.error("Couldn't share. Please try the other options.");
        });
    } else {
      toast.error(
        "Web Share API not supported. Please use copy or WhatsApp options."
      );
    }
  };

  const copyToClipboard = () => {
    const text = getShareText();
    navigator.clipboard.writeText(text).then(
      () => {
        setCopied(true);
        toast.success("Copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
      },
      () => {
        toast.error("Failed to copy. Please try again.");
      }
    );
  };

  const randomTilt = Math.floor(Math.random() * 3) - 1;

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this confession?")) {
      deleteConfession(confession.id);
      onDelete?.();
      toast.success("Confession deleted");
    }
  };

  return (
    <>
      <Card
        className="border-divine-blue/20 shadow-md hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-md relative overflow-hidden animate-fade-in group"
        style={{ transform: `rotate(${randomTilt}deg)` }}
        onMouseEnter={() => setShowDelete(true)}
        onMouseLeave={() => setShowDelete(false)}
      >
        <div className="absolute top-0 right-0 w-20 h-20 bg-divine-gold/10 rounded-bl-full z-0" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-divine-accent/5 rounded-tr-full z-0" />

        {/* Delete button */}
        {showDelete && !confession.scripture && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-100"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        )}

        <CardContent className="pt-6 pb-4 px-6 relative z-10">
          <p className="font-elegant text-xl text-divine-blue leading-relaxed mb-3">
            "{confession.text}"
          </p>
          {confession.scripture && (
            <p className="text-divine-blue/70 text-sm font-display text-base">
              {confession.scripture}
            </p>
          )}
        </CardContent>

        <CardFooter className="px-6 py-4 bg-divine-blue/10 backdrop-blur-sm flex justify-between items-center border-t border-divine-light/50">
          {confession.isToday && (
            <Button
              variant="outline"
              size="sm"
              className="border-divine-blue/20 bg-white/50 backdrop-blur-sm text-divine-blue hover:bg-divine-blue/10 h-9 px-3 font-elegant"
              onClick={() => setShowCelebration(true)}
            >
              <Sparkles size={16} />
              <span className="ml-1.5">I've confessed this</span>
            </Button>
          )}

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="border-divine-blue/20 bg-white/50 backdrop-blur-sm text-divine-blue hover:bg-divine-blue/10 h-9 px-3 font-elegant"
              onClick={copyToClipboard}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span className="ml-1.5">{copied ? "Copied" : "Copy"}</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-divine-blue/20 bg-white/50 backdrop-blur-sm text-divine-blue hover:bg-divine-blue/10 h-9 px-3 font-elegant"
                >
                  <Share2 size={16} />
                  <span className="ml-1.5">Share</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="font-elegant bg-white/90 backdrop-blur-md"
              >
                <DropdownMenuItem onClick={shareToWhatsApp}>
                  Share to WhatsApp
                </DropdownMenuItem>
                <DropdownMenuItem onClick={shareToGeneric}>
                  Share...
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardFooter>
      </Card>

      {confession.isToday && (
        <CelebrationModal
          isOpen={showCelebration}
          onClose={() => setShowCelebration(false)}
          isToday={true}
        />
      )}
    </>
  );
};
