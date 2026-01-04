import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux"
const Header = () => {
  const [buttonText, setButtonText] = useState("Sign In");

  const handleOnBtnClick = () => {
    if (buttonText === "Sign In") {
      setButtonText("Sign Out");
    } else {
      setButtonText("Sign In");
    }
  };
  const OnlineStatus = useOnlineStatus();
  const cartItem = useSelector((store) => store.cart.items);
  return (
    <div className="header">
      <div className="logo-container">
        <img
          className="logo"
          src="https://png.pngtree.com/png-vector/20220705/ourmid/pngtree-food-logo-png-image_5687686.png"
        ></img>
      </div>
      <div className="nav-items">
        <ul>
          <li>Online Status:{OnlineStatus ? "✅" : "🟥"}</li>
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/about" className="nav-link"> About Us</Link></li>
          <li><Link to="/contact" className="nav-link"> Contact Us</Link></li>
           <li><Link to="/grocerys" className="nav-link">grocery</Link></li>
          <li><Link to="/cart" className="nav-link" aria-label="cart"> 🛒{cartItem.length >0 && cartItem.length}</Link></li>
          <button className="login" onClick={handleOnBtnClick}>
            {buttonText}
          </button>
        </ul>

        <div />
      </div>
    </div>
  );
};

export default Header;
