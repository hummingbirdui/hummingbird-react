import CopyIcon from "@/components/icons/CopyIcon";
import CheckIcon from "@/components/icons/CheckIcon";
import { ButtonHTMLAttributes } from "react";
import { Button } from "@hummingbirdui/react";

interface CopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  code: string;
}

const CopyButton = ({
  code,
  className = "",
  ...props
}: CopyButtonProps) => {
  return (
    <button
      data-copy-btn
      data-code={code}
      className={`cursor-pointer p-0.5 ${className}`}
      {...props}
    >
      <CopyIcon data-copy-icon />
      <CheckIcon
        data-check-icon
        className="hidden text-success"
      />
    </button>
  );
};

export default CopyButton;