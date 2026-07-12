import Blocks from "@/components/sections/landing/Blocks";
import CodeExample from "@/components/sections/landing/code-example";
import ColorThemes from "@/components/sections/landing/color-themes";
import CTA from "@/components/sections/landing/CTA";
import Faqs from "@/components/sections/landing/faqs";
import Features from "@/components/sections/landing/features";
import Hero from "@/components/sections/landing/Hero";
import MCP from "@/components/sections/landing/mcp";

const Landing = () => {
  return (
    <div className="px-6 sm:px-10">
      <div className="max-w-8xl mx-auto overflow-hidden">
        <Hero />
        <Features />
        <CodeExample />
        <ColorThemes />
        <MCP />
        <Blocks />
        <Faqs />
        <CTA />
      </div>
    </div>
  );
};

export default Landing;
