export const Spinner = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center mt-5"  style={{height: "60vh"}}>
        <div
      className="spinner-border" role="status" id="spinner"
    >
      <span className="sr-only">Loading...</span>
    </div>
    <p className="mt-3" id="spinner-text">Loading...</p>
    </div>
  );
};
