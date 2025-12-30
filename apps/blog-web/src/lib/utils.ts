import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function safeJsonParse(str:string, defaultValue:any = null) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return defaultValue;
  }
}