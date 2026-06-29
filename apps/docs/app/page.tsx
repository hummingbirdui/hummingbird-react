import Link from "next/link";

export default function Home() {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">Welcome to Hummingbird UI</h1>
      <p className="mt-4 text-lg">
        This is the documentation site for Hummingbird UI, a React component
        library built with Tailwind CSS.
      </p>
      <div className="mt-6">
        <Link
          href="/docs/getting-started/installation"
          className="text-blue-500 hover:underline"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
