import GradientBorderBox from "@/components/common/GradientBorderBox";
import {
  Card,
  CardBody,
  CardFooter,
  CardImage,
  CardText,
  CardTitle,
} from "@hummingbirdui/react";

const CodePreview = () => {
  return (
    <GradientBorderBox
      color="warning"
      className="mx-auto w-full md:max-w-106 rounded-2xl"
    >
      <div className="py-9 size-full flex items-center justify-center bg-[url('/images/backgrounds/code-example-light.png')] dark:bg-[url('/images/backgrounds/code-example-dark.png')] bg-cover bg-center bg-no-repeat">
        <Card className="w-59 p-2 rounded-2xl">
          <CardImage
            position="top"
            src="/images/hamstar.webp"
            alt="A Hamstar"
          />
          <CardBody className="px-0">
            <CardTitle className="text-base!">
              10 Fascinating Animal Facts
            </CardTitle>
            <CardText className="text-xs text-muted mb-0">
              Discover surprising traits and behaviors from creatures big and
              small.
            </CardText>
          </CardBody>
          <CardFooter className="p-0 flex items-center justify-between">
            <a className="text-xs text-muted no-underline" href="#">
              12 min read
            </a>
            <button>
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.625 19.7938L14.75 18.05L18.875 19.7938V9.03125H10.625V19.7938ZM10.2875 21.1625C10.1 21.25 9.92188 21.2375 9.75313 21.125C9.58438 21.0125 9.5 20.8563 9.5 20.6562V9.03125C9.5 8.73125 9.6125 8.46875 9.8375 8.24375C10.0625 8.01875 10.325 7.90625 10.625 7.90625H18.875C19.175 7.90625 19.4375 8.01875 19.6625 8.24375C19.8875 8.46875 20 8.73125 20 9.03125V20.6562C20 20.8563 19.9156 21.0125 19.7469 21.125C19.5781 21.2375 19.4 21.25 19.2125 21.1625L14.75 19.25L10.2875 21.1625ZM10.625 9.03125H18.875H14.75H10.625Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </CardFooter>
        </Card>
      </div>
    </GradientBorderBox>
  );
};

export default CodePreview;
