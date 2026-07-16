import { Button } from "@hummingbirdui/react";

const CTA = () => {
  return (
    <div className="px-6 mb-18">
      <div className="px-4 pt-22.5 pb-15 rounded-3xl flex flex-col max-w-8xl mx-auto bg-[url('/images/backgrounds/cta-light.png')] dark:bg-[url('/images/backgrounds/cta-dark.png')] bg-cover bg-no-repeat">
        <h1 className="text-4xl sm:text-6xl text-center tracking-tighter sm:tracking-[-3px] font-medium mb-4">
          Ship your next project faster
        </h1>
        <p className="text-center text-muted max-w-140 mx-auto mb-8">
          Spend less time on boilerplate and more time on the features that
          matter. Start your next project with Hummingbird to finally have it
          all.
        </p>
        <Button className="mx-auto">Explore Hummingbird</Button>
      </div>
    </div>
  );
};

export default CTA;
