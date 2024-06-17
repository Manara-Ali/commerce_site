import { Link } from "react-router-dom";
import cookBook from './../assets/cookbook.jpg';
import foodMood from './../assets/foodmood.jpg'
import random from './../assets/random.jpg';
import openedFride from './../assets/opened-fridge.jpg';

export const About = ({ children }) => {
  return (
    <div>
      <div className="d-flex justify-content-between">{children}</div>
      <Link style={{ width: "15rem" }} to={"/"}>
        <button
          className="btn m-3 p-3 d-flex align-items-center justify-content-center"
          id="back-btn"
        >
          {" "}
          <i className="fa fa-arrow-left fa-2x mr-3" aria-hidden="true"></i>BACK
        </button>
      </Link>
      <h1 className="display-3 text-center">About Us</h1>
      <img className="my-5 border" src={random} alt="" style={{width: "95%", height: "auto", marginLeft: "auto", marginRight: "auto", display: "block", borderRadius: "10px"}}/>
      <p className="px-4" style={{fontSize: "1.5rem", fontWeight: "400", color: "#000"}}>
        Welcome to Mimi's Kitchen & Grill, where culinary excellence meets
        unparalleled service. Founded by Mimi, a passionate chef with a flair
        for creating unforgettable dining experiences, our catering services are
        designed to elevate any event, big or small.
      </p>
      <img className="my-5 border" src={foodMood} alt="" style={{width: "95%", height: "auto", marginLeft: "auto", marginRight: "auto", display: "block", borderRadius: "10px"}}/>
      <p className="px-4" style={{fontSize: "1.5rem", fontWeight: "400", color: "#000"}}>
        With a focus on fresh, seasonal ingredients and innovative recipes, we
        craft menus that delight the senses and exceed expectations. Whether
        you're planning a corporate event, wedding, or intimate gathering, our
        team is dedicated to providing impeccable service and exquisite cuisine
        that leaves a lasting impression.
      </p>
      <img className="my-5 border" src={cookBook} alt="" style={{width: "95%", height: "auto", marginLeft: "auto", marginRight: "auto", display: "block", borderRadius: "10px"}}/>
      <p className="px-4" style={{fontSize: "1.5rem", fontWeight: "400", color: "#000"}}>
        At Mimi's Kitchen & Grill, we understand that each event is unique, which
        is why we work closely with our clients to customize menus that reflect
        their tastes and preferences. From elegant plated dinners to interactive
        food stations, we create culinary experiences that are as distinctive as
        they are delicious.
      </p>
      <img className="my-5 border" src={openedFride} alt="" style={{width: "95%", height: "auto", marginLeft: "auto", marginRight: "auto", display: "block", borderRadius: "10px"}}/>
      <p className="px-4" style={{fontSize: "1.5rem", fontWeight: "400", color: "#000", marginBottom: "-50px"}}>
        With a commitment to excellence and a passion for food, Silver is your partner in creating unforgettable moments. Contact us
        today to discuss how we can make your next event truly exceptional.
      </p>
    </div>
  );
};
