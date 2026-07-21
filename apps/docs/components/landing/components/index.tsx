import SectionHeader from "@/components/common/SectionHeader";
import ComponentsCard from "@/components/common/ComponentCard";
import { components } from "@/data/components";
import { Button } from "@hummingbirdui/react";
import Link from "next/link";

const Components = () => {
  return (
    <div className="px-6 py-18">
      <SectionHeader
        title="Production-ready UIs, out of the box"
        subtitle="Hummingbird provides production-ready components. Filter by category or use-case to find what you need."
        className="max-w-107!"
      />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto my-10">
        {components.slice(0, 8).map((component) => (
          <ComponentsCard key={component.title} component={component} />
        ))}
      </div>
      <div className="flex justify-center">
        <Button variant="subtle" asChild>
          <Link href="/docs/components/overview/">
            View all Components
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.37692 14.5415C7.2658 14.4026 7.20678 14.2498 7.19983 14.0832C7.19289 13.9165 7.25192 13.7707 7.37692 13.6457L11.0436 9.97901L7.35608 6.29151C7.24497 6.1804 7.19289 6.03109 7.19983 5.84359C7.20678 5.65609 7.2658 5.50679 7.37692 5.39568C7.5158 5.25679 7.66511 5.19082 7.82483 5.19776C7.98455 5.20471 8.12691 5.27068 8.25191 5.39568L12.3977 9.54151C12.4672 9.61096 12.5158 9.6804 12.5436 9.74984C12.5714 9.81929 12.5852 9.89568 12.5852 9.97901C12.5852 10.0623 12.5714 10.1387 12.5436 10.2082C12.5158 10.2776 12.4672 10.3471 12.3977 10.4165L8.27275 14.5415C8.14775 14.6665 8.00191 14.7255 7.83525 14.7186C7.66858 14.7117 7.5158 14.6526 7.37692 14.5415Z"
                fill="#0074E6"
              />
            </svg>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Components;
