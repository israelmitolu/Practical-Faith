import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getStoredConfessions = (): Confession[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("confessions");
  return stored ? JSON.parse(stored) : [];
};

export const saveConfession = (confession: Confession) => {
  const confessions = getStoredConfessions();
  confessions.push(confession);
  localStorage.setItem("confessions", JSON.stringify(confessions));
};

export const deleteConfession = (confessionId: string) => {
  const confessions = getStoredConfessions();
  const updatedConfessions = confessions.filter((c) => c.id !== confessionId);
  localStorage.setItem("confessions", JSON.stringify(updatedConfessions));
};
