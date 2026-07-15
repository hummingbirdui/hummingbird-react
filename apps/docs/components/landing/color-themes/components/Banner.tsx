const Banner = () => {
  return (
    <div className="card border-subtle rounded-2xl h-full">
      <div className="card-body flex flex-col items-center justify-center px-10 py-6">
        <h4 className="card-title">Hummingbird</h4>
        <p className="mb-6">Color Themes</p>
        <a href="#" className="btn btn-subtle-primary">
          View all themes
        </a>
      </div>
    </div>
  );
};

export default Banner;
