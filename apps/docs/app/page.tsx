import Blocks from "@/components/landing/blocks";
import CodeExample from "@/components/landing/code-example";
import ColorThemes from "@/components/landing/color-themes";
import CTA from "@/components/landing/CTA";
import Faqs from "@/components/landing/faqs";
import Features from "@/components/landing/features";
import Hero from "@/components/landing/Hero";
import MCP from "@/components/landing/mcp";

const Landing = () => {
  return (
    <>
      <Hero />
      <Features />
      <CodeExample />
      <ColorThemes />
      <MCP />
      <Blocks />
      <Faqs />
      <CTA />
    </>
  );
};

export default Landing;
