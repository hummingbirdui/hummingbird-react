"use client";

import { Divider } from "@hummingbirdui/react";

export default function DividerVerticalLabel() {
  return (
    <div className="flex w-full justify-around">
      <Divider orientation="vertical" align="start">
        START
      </Divider>
      <Divider orientation="vertical">CENTER</Divider>
      <Divider orientation="vertical" align="end">
        END
      </Divider>
    </div>
  );
}
