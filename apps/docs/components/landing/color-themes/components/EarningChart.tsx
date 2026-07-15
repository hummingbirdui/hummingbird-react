const EarningChart = () => {
  return (
    <div className="card border-subtle rounded-2xl h-full">
      <div className="card-body flex flex-col">
        <h6 className="card-title text-base">Earned this Week</h6>
        <h6 className="text-base mb-4">$350</h6>
        <div className="flex items-end gap-1 flex-1">
          <div className="bg-highlight flex-1 rounded h-7/10"></div>
          <div className="bg-primary flex-1 min-w-3 h-full rounded"></div>
          <div className="bg-highlight flex-1 min-w-3 h-6/10 rounded"></div>
          <div className="bg-highlight flex-1 min-w-3 h-6/10 rounded"></div>
          <div className="bg-highlight flex-1 min-w-3 h-5/10 rounded"></div>
          <div className="bg-highlight flex-1 min-w-3 h-2/10 rounded"></div>
          <div className="bg-highlight flex-1 min-w-3 h-4/10 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default EarningChart;
