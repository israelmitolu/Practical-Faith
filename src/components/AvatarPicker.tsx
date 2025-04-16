import { useState, useEffect } from "react";
import { createAvatar } from "@dicebear/core";
import { micah } from "@dicebear/collection";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Constants
const AVATAR_COUNT = 20;
const AVATAR_STORAGE_KEY = "user_avatar_seed";

const AVATAR_CONFIG = {
  hair: ["pixie", "mrClean", "full", "fonze", "dannyPhantom"],
  hairColor: [
    "000000",
    "77311d",
    "ac6651",
    "f4d150",
    "f9c9b6",
    "ffeba4",
    "ffffff",
    "fc909f",
  ],
  mouth: ["laughing", "pucker", "smile", "smirk"],
};

type AvatarSeed = string;

interface AvatarData {
  svg: string;
  seed: AvatarSeed;
}

export const AvatarPicker = () => {
  const [selectedSeed, setSelectedSeed] = useState<AvatarSeed>("");
  const [avatarSvg, setAvatarSvg] = useState<string>("");
  const [previewAvatars, setPreviewAvatars] = useState<AvatarData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const generateAvatar = async (seed: AvatarSeed): Promise<void> => {
    try {
      const avatar = createAvatar(micah, {
        seed,
        ...AVATAR_CONFIG,
      });
      const svg = await avatar.toString();
      setAvatarSvg(svg);
      setError(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to generate avatar";
      setError(errorMessage);
      console.error("Error generating avatar:", errorMessage);
    }
  };

  const generatePreviewAvatars = async (): Promise<void> => {
    try {
      const avatars = await Promise.all(
        Array.from({ length: AVATAR_COUNT }, async () => {
          const randomSeed = Math.random().toString(36).substring(7);
          const avatar = createAvatar(micah, {
            seed: randomSeed,
            ...AVATAR_CONFIG,
          });
          const svg = await avatar.toString();
          return { svg, seed: randomSeed };
        })
      );
      setPreviewAvatars(avatars);
      setError(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to generate preview avatars";
      setError(errorMessage);
      console.error("Error generating preview avatars:", errorMessage);
    }
  };

  const handleAvatarSelect = async (seed: AvatarSeed): Promise<void> => {
    try {
      setSelectedSeed(seed);
      localStorage.setItem(AVATAR_STORAGE_KEY, seed);
      await generateAvatar(seed);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to select avatar";
      setError(errorMessage);
      console.error("Error selecting avatar:", errorMessage);
    }
  };

  useEffect(() => {
    const initializeAvatars = async () => {
      setIsLoading(true);
      try {
        const savedSeed = localStorage.getItem(AVATAR_STORAGE_KEY);
        const seed = savedSeed || Math.random().toString(36).substring(7);

        if (!savedSeed) {
          localStorage.setItem(AVATAR_STORAGE_KEY, seed);
        }

        setSelectedSeed(seed);
        await Promise.all([generateAvatar(seed), generatePreviewAvatars()]);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to initialize avatars";
        setError(errorMessage);
        console.error("Error initializing avatars:", errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAvatars();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-0 h-auto">
          <div
            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
            dangerouslySetInnerHTML={{ __html: avatarSvg }}
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choose Your Avatar</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <div
            className="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center mb-4"
            dangerouslySetInnerHTML={{ __html: avatarSvg }}
          />

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          {isLoading ? (
            <div className="w-full h-48 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-divine-blue"></div>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4 w-full">
              {previewAvatars.map(({ svg, seed }, index) => (
                <div
                  key={`${seed}-${index}`}
                  className={`w-16 h-16 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors ${
                    seed === selectedSeed ? "ring-2 ring-divine-blue" : ""
                  }`}
                  onClick={() => handleAvatarSelect(seed)}
                  dangerouslySetInnerHTML={{ __html: svg }}
                />
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
