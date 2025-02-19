import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleCopyClick = async () => {
    try {
      await window.navigator.clipboard.writeText(script);
      setCopyButtonText('Copied to clipboard!');
    } catch (err) {
      console.error(
          "Unable to copy to clipboard.",
          err
      );
      setCopyButtonText('Retry Copying!!')
    }
  };