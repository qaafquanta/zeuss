"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyTextButtonProps {
  text: string;
}

export default function CopyTextButton({ text }: CopyTextButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div className="relative inline-flex items-center gap-2">
      <button
        onClick={handleCopy}
        className="text-sm flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 active:scale-95 transition-all"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-green-500 text-sm" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 text-sm" />
            <span>Copy</span>
          </>
        )}
      </button>

      {/* Tooltip animasi */}
      {copied && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-sm text-white bg-gray-800 rounded-md animate-fade-in">
          Text copied!
        </div>
      )}
    </div>
  );
}
