"use client";

import { Button } from "@hummingbirdui/react";
import { Plus } from "lucide-react";

export default function ButtonShapes() {
  return (
    <div className="text-center space-x-2">
      <Button shape="square">
        <Plus />
      </Button>
      <Button shape="circle">
        <Plus />
      </Button>
    </div>
  );
}
