import { cn } from "@hummingbirdui/react/utils";
import type { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
}

const SectionWrapper = ({ children, className }: SectionWrapperProps) => {
  return (
    <div className={cn("max-w-8xl mx-auto overflow-hidden", className)}>
      {children}
    </div>
  );
};

export default SectionWrapper;
