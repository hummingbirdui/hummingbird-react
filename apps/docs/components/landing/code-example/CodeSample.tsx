import { highlight } from "fumadocs-core/highlight";
import CopyButton from "@/components/common/CopyButton";

const code = `<Card className="w-59 p-2 rounded-2xl">
  <Card.Image position="top" src="/images/hamstar.webp" alt="A Hamstar" />
  <Card.Body className="px-0">
    <Card.Title className="text-base!">
      10 Fascinating Animal Facts
    </Card.Title>
    <Card.Text className="text-xs text-muted mb-0">
      Discover surprising traits and behaviors from creatures big
      and small.
    </Card.Text>
  </Card.Body>
  <Card.Footer className="p-0 flex items-center justify-between">
    <a className="text-xs text-muted no-underline" href="#">
      12 min read
    </a>
    <BookmarkButton />
  </Card.Footer>
</Card>`;

const CodeSample = async () => {
  const highlighted = await highlight(code, {
    lang: "tsx",
    themes: { light: "github-light", dark: "github-dark" },
  });

  return (
    <div className="p-6 flex-1 min-h-100! lg:max-h-full overflow-hidden bg-muted rounded-2xl">
      <div className="flex items-center border-b border-default pb-1">
        <h6 className="font-bold text-sm mb-0">Code Sample</h6>
        <CopyButton code={code} className="ml-auto" />
      </div>
      <div className="hb-code max-h-full overflow-auto px-0! [&_pre]:my-0">
        {highlighted}
      </div>
    </div>
  );
};

export default CodeSample;
