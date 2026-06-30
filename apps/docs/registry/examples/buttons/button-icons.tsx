"use client";

import { Button } from "@hummingbirdui/react";
import { Heart, ThumbsUp } from "lucide-react";

export default function ButtonShapes() {
  return (
    <div className="text-center space-x-2">
      <Button variant="icon">
        <ThumbsUp />
      </Button>
      <Button variant="icon" color="danger">
        <Heart />
      </Button>
    </div>
  );
}
