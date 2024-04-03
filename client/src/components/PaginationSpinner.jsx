export const PaginationSpinner = () => {
  return (
    <div className="d-flex flex-column align-items-center">
        <div
      className="spinner-border" role="status" id="pagination-spinner" style={{color: "#66ba30"}}
    >
      <span className="sr-only">Loading...</span>
    </div>
    </div>
  );
};
