import { Button } from "@hummingbirdui/react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-10">
      <Button asChild variant="subtle" color="primary">
        <Link href="/docs/getting-started">Get Started</Link>
      </Button>
    </div>
  );
}
