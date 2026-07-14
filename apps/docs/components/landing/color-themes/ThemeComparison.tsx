import Banner from "./components/Banner";
import Members from "./components/Members";
import EarningChart from "./components/EarningChart";
import SemanticColors from "./components/SemanticColors";
import MeetingExpenses from "./components/MeetingExpenses";

const ThemeComparison = () => {
  return (
    <div
      data-theming-container
      className="mx-auto relative rounded-4xl h-full overflow-hidden"
    >
      <div data-light-components className="card rounded-4xl h-full">
        <div className="card-body p-6 min-[592px]:p-8">
          <div className="row mb-4 g-4">
            <div className="min-[944px]:col-5 min-[944px]:order-1">
              <Banner />
            </div>
            <div className="min-[592px]:col-6 min-[944px]:col">
              <SemanticColors />
            </div>
            <div className="col-6 min-[944px]:col order-2 hidden min-[592px]:block">
              <EarningChart />
            </div>
          </div>
          <div className="row g-4 hidden min-[592px]:flex">
            <div className="col">
              <Members />
            </div>
            <div className="col">
              <MeetingExpenses />
            </div>
          </div>
        </div>
      </div>
      <div
        data-dark-components
        className="card dark absolute inset-0 rounded-4xl"
        style={{
          clipPath: "inset(0 0 0 50%)",
        }}
      >
        <div className="card-body p-6 min-[592px]:p-8">
          <div className="row mb-4 g-4">
            <div className="min-[944px]:col-5 min-[944px]:order-1">
              <Banner />
            </div>
            <div className="min-[592px]:col-6 min-[944px]:col">
              <SemanticColors />
            </div>
            <div className="col-6 min-[944px]:col order-2 hidden min-[592px]:block">
              <EarningChart />
            </div>
          </div>
          <div className="row g-4 hidden min-[592px]:flex">
            <div className="col">
              <Members />
            </div>
            <div className="col">
              <MeetingExpenses />
            </div>
          </div>
        </div>
      </div>
      <div
        data-resize-slider
        className="absolute top-0 left-1/2 h-full w-0.75 bg-primary cursor-col-resize flex items-center justify-center"
      >
        <button className="absolute btn btn-primary btn-icon rounded-full border border-white dark:border-primary-lighter cursor-ew-resize shadow-md">
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.94844 14.5293L3.07031 10.6591L6.94052 6.78906L7.81865 7.65906L5.46448 10.0261H16.5095L14.1553 7.65906L15.0334 6.78906L18.9036 10.6591L15.0334 14.5293L14.1472 13.6591L16.5095 11.2841H5.45656L7.81865 13.6591L6.94844 14.5293Z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ThemeComparison;
