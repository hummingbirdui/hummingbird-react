import { Button } from "@hummingbirdui/react";

const CTA = () => {
  return (
    <div
      className="pt-22.5 pb-15 rounded-3xl flex flex-col mb-18"
      style={{
        background: `linear-gradient(219.48deg, rgba(248, 239, 255, 0.6) 29.18%, rgba(235, 245, 255, 0.6) 71.81%)`,
      }}
    >
      <h1 className="text-center tracking-tighter font-medium mb-4">
        Ship your next project faster
      </h1>
      <p className="text-center text-muted max-w-140 mx-auto mb-8">
        Spend less time on boilerplate and more time on the features that
        matter. Start your next project with Hummingbird to finally have it all.
      </p>
      <Button className="mx-auto">Explore Hummingbird</Button>
    </div>
  );
};

export default CTA;
