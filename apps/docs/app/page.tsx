import CodeExample from "@/components/landing/code-example";
import ColorThemes from "@/components/landing/color-themes";
import Components from "@/components/landing/components";
import CTA from "@/components/landing/CTA";
import Faqs from "@/components/landing/faqs";
import Features from "@/components/landing/features";
import Hero from "@/components/landing/Hero";
// import Blocks from "@/components/landing/blocks";
// import MCP from "@/components/landing/mcp";

const Landing = () => {
  return (
    <>
      <Hero />
      <Features />
      <CodeExample />
      <ColorThemes />
      {/* <MCP /> */}
      {/* <Blocks /> */}
      <Components />
      <Faqs />
      <CTA />
    </>
  );
};

export default Landing;
