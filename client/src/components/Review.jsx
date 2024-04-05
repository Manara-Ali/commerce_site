export const Review = () => {
  return (
    <div className="col-md-9 my-5 pt-2 border rounded-lg w-100">
      <textarea
        style={{ width: "inherit", fontSize: "15px" }}
        placeholder="Add a review"
      ></textarea>
      <div className="btn-container">
        <button className="btn">Cancel</button>
        <button className="btn">Review</button>
      </div>
    </div>
  );
};
