import { Button } from "@hummingbirdui/react";

const MeetingExpenses = () => {
  return (
    <div className="card border-subtle rounded-2xl h-full">
      <div className="card-body flex flex-col">
        <div className="flex items-center justify-between border-subtle mb-6">
          <h6 className="card-title text-base mb-0">Meeting Expenses</h6>
          <Button variant="text" size="sm" shape="square" color="neutral">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-1 2q-.425 0-.712-.288T3 20v-2.425q0-.4.15-.763t.425-.637L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.437.65T21 6.4q0 .4-.138.763t-.437.662l-12.6 12.6q-.275.275-.638.425t-.762.15zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"
                strokeWidth="0.4"
                stroke="currentColor"
              />
            </svg>
          </Button>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <p className="mb-0 text-base font-medium">Spent:</p>
          <p className="mb-0 text-base font-medium text-default">$7.05K</p>
        </div>
        <div
          className="progress h-2 rounded-xs mb-5"
          role="progressbar"
          aria-label="meeting spend"
        >
          <div className="progress-bar w-2/10"></div>
        </div>
        <div className="bg-muted rounded-lg py-2 px-3 flex items-center gap-4 lg:gap-8">
          <div className="flex-1">
            <p className="mb-1">Credit Limit</p>
            <h6 className="text-default">$14.5K</h6>
          </div>
          <div className="vr border-default h-8 my-auto"></div>
          <div className="flex-1">
            <p className="mb-1">Available</p>
            <h6 className="text-default">$7.45K</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingExpenses;
