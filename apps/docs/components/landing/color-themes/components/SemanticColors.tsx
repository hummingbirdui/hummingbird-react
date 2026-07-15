const SemanticColors = () => {
  return (
    <div className="card border-subtle rounded-2xl">
      <div className="card-body">
        <h4 className="card-title text-base mb-4.5">Semantic colors</h4>
        <div className="row justify-between gy-4">
          <div className="col-4">
            <div className="flex flex-col items-center gap-1.5 w-max">
              <div className="size-10 bg-primary rounded-full"></div>
              <p className="text-xs text-muted mb-0">Primary</p>
            </div>
          </div>
          <div className="col-4 flex justify-center">
            <div className="flex flex-col items-center gap-1.5 w-max">
              <div className="size-10 bg-secondary rounded-full mb-1.5"></div>
              <p className="text-xs text-muted mb-0">Secondary</p>
            </div>
          </div>
          <div className="col-4 flex justify-end">
            <div className="flex flex-col items-center gap-1.5 w-max">
              <div className="size-10 bg-info rounded-full mb-1.5"></div>
              <p className="text-xs text-muted mb-0">Info</p>
            </div>
          </div>
          <div className="col-4">
            <div className="flex flex-col items-center gap-1.5 w-max">
              <div className="size-10 bg-success rounded-full mb-1.5"></div>
              <p className="text-xs text-muted mb-0">Success</p>
            </div>
          </div>
          <div className="col-4 flex justify-center">
            <div className="flex flex-col items-center gap-1.5 w-max">
              <div className="size-10 bg-warning rounded-full mb-1.5"></div>
              <p className="text-xs text-muted mb-0">Warning</p>
            </div>
          </div>
          <div className="col-4 flex justify-end">
            <div className="flex flex-col items-center gap-1.5 w-max">
              <div className="size-10 bg-danger rounded-full mb-1.5"></div>
              <p className="text-xs text-muted mb-0">Danger</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SemanticColors;
