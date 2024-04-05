export const ReviewList = ({ reviews }) => {
  console.log(reviews[0]?.userId?.photo);
  return (
    <div className="border rounded-lg p-3 mb-5"
      style={{
        // border: "1px solid blue",
      }}
    >
      {reviews?.map((element, index) => {
        return (
          <>
            <div style={{display: "flex"}}>
                <div
              key={element._id}
              style={{
                // border: "1px solid red",
                backgroundImage: `url(${reviews[index]?.userId?.photo})`,
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                // margin: "auto",
                height: "70px",
                width: "70px",
                marginBottom: "20px",
                marginRight: "20px",
                borderRadius: "50%"
              }}
            />
                <p style={{fontWeight: "600", marginTop: "10px"}}>{reviews[index]?.userId?.name}</p>
            </div>
            <p>{reviews[index]?.review}</p>
            <hr />
          </>
        );
      })}
    </div>
  );
};
