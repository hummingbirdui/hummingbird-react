import CopyButton from "@/components/common/CopyButton";

const CodeSample = () => {
  return (
    <>
      <div className="p-6 flex-1 min-h-100! lg:max-h-full overflow-hidden bg-muted rounded-2xl">
        <div className="flex items-center border-b border-default pb-1">
          <h6 className="font-bold text-sm mb-0">Code Sample</h6>
          <CopyButton code="console.log('Hello World!')" className="ml-auto" />
        </div>
      </div>
      {/* code blocks */}
    </>
  );
};

export default CodeSample;
