import GradientBorderBox from "@/components/common/GradientBorderBox";

interface MCPCardProps {
  borderColor: string;
}

const MCPCard = ({ borderColor }: MCPCardProps) => {
  return (
    <GradientBorderBox color={borderColor} className="border-2! p-6">
      <h6 className="mb-2">1. Grab your MCP URL</h6>
      <p className="mb-6 text-sm">
        Copy from /dashboard/account — your personal Pro token is baked in.
      </p>
      <div className="h-37 bg-muted p-3 rounded-lg">
        console.log('Hello World!)
      </div>
    </GradientBorderBox>
  );
};

export default MCPCard;
