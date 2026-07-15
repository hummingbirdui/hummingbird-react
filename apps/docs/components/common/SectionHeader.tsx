import { cn } from "@hummingbirdui/react/utils";
import { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
  actionComponents?: ReactNode;
}

const SectionHeader = ({
  title,
  subtitle,
  actionComponents,
  className,
}: SectionHeaderProps) => {
  return (
    <div
      className={cn(
        "mx-auto mb-10 max-w-126 sm:max-w-146 text-center",
        className,
      )}
    >
      <h1 className="mb-4 text-3xl font-medium tracking-[-2.25px] md:text-4xl lg:text-5xl">
        {title}
      </h1>

      <p className="text-muted text-base leading-[1.2]">{subtitle}</p>

      {actionComponents && (
        <div className="mt-6 flex justify-center">{actionComponents}</div>
      )}
    </div>
  );
};

export default SectionHeader;
