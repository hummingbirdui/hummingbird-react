import { Alert } from "@hummingbirdui/react";
import { AlertCircle, Ban, InfoIcon } from "lucide-react";
import React from "react";

const HbAlert = ({
  color,
  children,
}: {
  color?: Alert.Props["color"];
  children?: React.ReactNode;
}) => {
  return (
    <Alert color={color} variant="subtle">
      <Alert.Icon>
        {color === "warning" ? (
          <AlertCircle className="size-5" />
        ) : color === "info" ? (
          <InfoIcon className="size-5" />
        ) : color === "danger" ? (
          <Ban className="size-5" />
        ) : undefined}
      </Alert.Icon>
      {children}
    </Alert>
  );
};

export default HbAlert;
