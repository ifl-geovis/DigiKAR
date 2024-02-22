import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const move = (array: string[], value: string, forward = true) => {
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
