import type { Block } from "@/data/landing/blocks";

interface BlockCardProps {
  data: Block;
}

const BlockCard = ({ data }: BlockCardProps) => {
  return (
    <a
      key={data.title}
      href={`/blocks${data.href}`}
      className="card card-action max-sm:max-w-70 mx-auto flex flex-col h-full w-full rounded-2xl bg-default overflow-hidden hover:border-primary"
    >
      <div className="grow flex items-center justify-center bg-subtle p-4 aspect-4/3">
        <img
          src={data?.image?.light}
          className="dark:hidden"
          alt={data.title}
        />
        <img
          src={data?.image?.dark}
          className="hidden dark:flex"
          alt={data.title}
        />
      </div>
      <div className="px-4 py-3">
        <h6 className="card-title mb-0.5 text-base font-semibold">
          {data.title}
        </h6>
        <p className="mb-0 text-xs text-muted">{data.count} blocks</p>
      </div>
    </a>
  );
};

export default BlockCard;
