import { useState } from "react";
import { Confession } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Copy, Check, Share2, Heart } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { PrayerAnimation } from "./PrayerAnimation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ConfessionCardProps {
  confession: Confession;
}

export const ConfessionCard = ({ confession }: ConfessionCardProps) => {
  const [copied, setCopied] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

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
      navigator.share({
        title: "Daily Divine Declaration",
        text: getShareText()
      }).then(() => {
        toast.success("Shared successfully!");
      }).catch((error) => {
        console.error("Error sharing:", error);
        toast.error("Couldn't share. Please try the other options.");
      });
    } else {
      toast.error("Web Share API not supported. Please use copy or WhatsApp options.");
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

  const handlePrayerComplete = () => {
    setShowAnimation(true);
    toast.success("Amen! You've declared this truth over your life!");
    setTimeout(() => setShowAnimation(false), 3000);
  };

  const randomTilt = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1 degrees

  return (
    <>
      <Card className="border-divine-blue/20 shadow-md hover:shadow-lg transition-all duration-300 bg-divine-gradient relative overflow-hidden animate-fade-in" 
        style={{ transform: `rotate(${randomTilt}deg)` }}>
        <div className="absolute top-0 right-0 w-20 h-20 bg-divine-gold/10 rounded-bl-full z-0" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-divine-accent/5 rounded-tr-full z-0" />
        
        <CardContent className="pt-6 pb-4 px-6 relative z-10">
          <p className="font-serif text-lg text-divine-blue leading-relaxed mb-3">
            "{confession.text}"
          </p>
          <p className="text-divine-blue/70 text-sm font-medium">
            {confession.scripture}
          </p>
        </CardContent>
        
        <CardFooter className="px-6 py-4 bg-divine-blue/5 flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            className="border-divine-blue/20 text-divine-blue hover:bg-divine-blue/10 h-9 px-3"
            onClick={handlePrayerComplete}
          >
            <Heart size={16} className="mr-1.5" />
            I've Prayed This
          </Button>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="border-divine-blue/20 text-divine-blue hover:bg-divine-blue/10 h-9 px-3"
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
                  className="border-divine-blue/20 text-divine-blue hover:bg-divine-blue/10 h-9 px-3"
                >
                  <Share2 size={16} />
                  <span className="ml-1.5">Share</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
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
      {showAnimation && <PrayerAnimation />}
    </>
  );
};
