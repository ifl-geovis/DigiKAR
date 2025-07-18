import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const move = <T>(array: T[], value: T, forward = true) => {
  const currentIndex = array.indexOf(value);
  if (currentIndex < 0) return array;

  const newIndex =
    forward && currentIndex == array.length - 1
      ? 0
      : forward
        ? currentIndex + 1
        : !forward && currentIndex == 0
          ? array.length - 1
          : currentIndex - 1;

  array.splice(newIndex, 0, array.splice(currentIndex, 1)[0]);
  return array;
};

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
