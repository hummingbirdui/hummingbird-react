import Image from "next/image";
import Link from "next/link";
import error404 from "@/public/images/404.svg";
import error404Dark from "@/public/images/404-dark.svg";

export default function NotFound() {
  return (
    <div className="mx-auto px-6 py-10 w-full max-w-150">
      <Image
        src={error404}
        className="mx-auto mb-4 dark:hidden"
        alt="Error404"
      />
      <Image
        src={error404Dark}
        className="mx-auto mb-4 hidden dark:block"
        alt="Error404"
      />
      <h1 className="mb-4 text-5xl text-center font-medium tracking-[-2.75px]">
        Whoops! Something went wrong
      </h1>
      <p className="mb-8 text-muted text-base text-center">
        The page you’re trying to reach isn’t available right now. It may have
        been removed, renamed, or is temporarily down.
      </p>
      <div className="flex items-center justify-center gap-2">
        <Link href="/" className="btn btn-primary px-10">
          Back to home
        </Link>
      </div>
    </div>
  );
}
