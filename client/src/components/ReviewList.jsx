import { Rating } from "./Rating";

export const ReviewList = ({ reviews }) => {
    const reviewCopy = [...reviews];

    const sortedArr  = reviewCopy?.sort((a, b) => {
        return Date.parse(b.createdAt) - Date.parse(a.createdAt);
      });
      
  return (
    <div
      className="border rounded-lg p-3 mb-5"
    >
      {sortedArr?.map((element, index) => {
        return (
          <div className="review-div">
            <div style={{ display: "flex" }}>
              <div
                key={element._id}
                style={{
                  // border: "1px solid red",
                  backgroundImage: `url(${sortedArr[index]?.userId?.photo})`,
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  // margin: "auto",
                  height: "50px",
                  width: "50px",
                  marginBottom: "20px",
                  marginRight: "20px",
                  borderRadius: "50%",
                }}
              />
              <div>
                <p style={{ fontWeight: "600", marginTop: "2px", marginBottom: "0px" }}>
                  {sortedArr[index]?.userId?.name.split(" ")[0]}{" "}
                  {sortedArr[index]?.userId?.name?.split(" ")?.[1]?.[0]}.
                </p>
                <Rating value={sortedArr[index]?.rating}/>
              </div>
            </div>
            <p>{sortedArr[index]?.review}</p>
          </div>
        );
      })}
    </div>
  );
};
