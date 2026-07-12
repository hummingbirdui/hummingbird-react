import SectionHeader from "@/components/sections/common/SectionHeader";
import { Button } from "@hummingbirdui/react";
import MCPCard from "./MCPCard";

const MCP = () => {
  return (
    <div className="py-20.5">
      <SectionHeader
        title="One MCP. Every AI agent. Ship faster."
        subtitle="Hummingbird offers layered control. Use our global variables for broad changes or a utility class for precise tweaks. It's designed to be easily extended."
        actionComponents={
          <Button variant="subtle" className="mx-auto">
            Set up in 60sec
          </Button>
        }
        className="max-w-170!"
      />
      <div className="flex items-center gap-6 max-w-7xl mx-auto">
        <MCPCard borderColor="primary" />
        <MCPCard borderColor="secondary" />
        <MCPCard borderColor="info" />
      </div>
    </div>
  );
};

export default MCP;
