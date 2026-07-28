"use client";

import { ButtonHTMLAttributes, useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  code: string;
}

const CopyButton = ({ code, className = "", ...props }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      aria-label={copied ? "Copied" : "Copy code"}
      onClick={handleCopy}
      className={`cursor-pointer p-0.5 ${className}`}
      {...props}
    >
      <Copy className={`size-4 ${copied ? "hidden!" : ""}`} />
      <Check className={`size-4 ${copied ? "text-success" : "hidden"}`} />
    </button>
  );
};

export default CopyButton;
