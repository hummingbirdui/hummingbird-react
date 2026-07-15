import { Alert, AlertIcon, type AlertProps } from "@hummingbirdui/react";
import { AlertCircle, Ban, InfoIcon } from "lucide-react";
import React from "react";

const HbAlert = ({
  color,
  children,
}: {
  color?: AlertProps["color"];
  children?: React.ReactNode;
}) => {
  return (
    <Alert color={color} variant="subtle">
      <AlertIcon>
        {color === "warning" ? (
          <AlertCircle className="size-5" />
        ) : color === "info" ? (
          <InfoIcon className="size-5" />
        ) : color === "danger" ? (
          <Ban className="size-5" />
        ) : undefined}
      </AlertIcon>
      {children}
    </Alert>
  );
};

export default HbAlert;
