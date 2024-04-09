import { useSelector } from "react-redux";
import { Rating } from "./Rating";

export const ReviewList = ({ reviews }) => {
  const reviewCopy = [...reviews];

  const reversedArr = reviewCopy?.reverse();
  // const sortedArr = reviewCopy?.sort((a, b) => {
  //   return Date.parse(b.createdAt) - Date.parse(a.createdAt);
  // });

  const { user } = useSelector((state) => {
    return state.usersCombinedReducer;
  });

  return (
    <div className="border rounded-lg p-3 mb-5" style={{marginTop: "6rem"}}>
      {reversedArr?.map((element, index) => {
        const firstName = reversedArr[index]?.userId?.name.split(" ")[0];

        const lastNameInitial = reversedArr[index]?.userId?.name?.split(
          " "
        )?.[1]?.[0];

        // return (
        //   <div className="review-div">
        //     <div style={{ display: "flex" }}>
        //       <div
        //         key={element._id}
        //         style={{
        //           // border: "1px solid red",
        //           backgroundImage: `url(${reversedArr[index]?.userId?.photo})`,
        //           backgroundPosition: "center",
        //           backgroundSize: "contain",
        //           backgroundRepeat: "no-repeat",
        //           // margin: "auto",
        //           height: "50px",
        //           width: "50px",
        //           marginBottom: "20px",
        //           marginRight: "20px",
        //           borderRadius: "50%",
        //         }}
        //       />
        //       <div>
        //         <p
        //           style={{
        //             fontWeight: "600",
        //             marginTop: "2px",
        //             marginBottom: "0px",
        //           }}
        //         >
        //           {firstName} {lastNameInitial}.
        //         </p>
        //         <Rating value={reversedArr[index]?.rating} />
        //       </div>
        //     </div>
        //     <p>{reversedArr[index]?.review}</p>
        //   </div>
        // );
        if(user?._id === element?.userId?._id) {
          return (
          <div className="review-div">
            <div style={{ display: "flex" }}>
              <div
                key={element._id}
                style={{
                  // border: "1px solid red",
                  backgroundImage: `url(${reversedArr[index]?.userId?.photo})`,
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
                  {firstName}{" "}
                  {lastNameInitial}.
                </p>
                <Rating value={reversedArr[index]?.rating}/>
              </div>
            </div>
            <p>{reversedArr[index]?.review}</p>
            <div className="btn-container">
          <button name="delete" className="btn">
            Delete
          </button>
          <button name="update" className="btn">
            Update
          </button>
        </div>
          </div>
        );
        } else {
          return (
          <div className="review-div">
            <div style={{ display: "flex" }}>
              <div
                key={element._id}
                style={{
                  // border: "1px solid red",
                  backgroundImage: `url(${reversedArr[index]?.userId?.photo})`,
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
                  {firstName}{" "}
                  {lastNameInitial}.
                </p>
                <Rating value={reversedArr[index]?.rating}/>
              </div>
            </div>
            <p>{reversedArr[index]?.review}</p>
          </div>
        );
        }
      })}
    </div>
  );
};
