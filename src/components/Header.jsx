import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector, useDispatch } from "react-redux";
import AuthModal from "./AuthModal";
import { initializeUser } from "../utils/userSlice";

const Header = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const dispatch = useDispatch();

  const OnlineStatus = useOnlineStatus();
  const cartItem = useSelector((store) => store.cart.items);
  const isLoggedIn = useSelector((store) => store.user.isLoggedIn);
  const user = useSelector((store) => store.user.user);

  // Initialize user from localStorage on mount
  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  return (
    <>
      <div className="header">
        <div className="logo-container">
          <img
            className="logo"
            src="https://png.pngtree.com/png-vector/20220705/ourmid/pngtree-food-logo-png-image_5687686.png"
            alt="Food App Logo"
          />
        </div>
        <div className="nav-items">
          <ul>
            <li className="online-status">Online Status:{OnlineStatus ? "✅" : "🟥"}</li>
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/about" className="nav-link">About Us</Link></li>
            <li><Link to="/contact" className="nav-link">Contact Us</Link></li>
            <li><Link to="/grocerys" className="nav-link">Grocery</Link></li>
            <li><Link to="/tracking" className="nav-link">📦 Track</Link></li>
            <li><Link to="/cart" className="nav-link" aria-label="cart">🛒{cartItem.length > 0 && cartItem.length}</Link></li>
            <button 
              className="login" 
              onClick={() => setIsAuthOpen(true)}
            >
              {isLoggedIn ? `${user?.name} 👤` : "Sign In"}
            </button>
          </ul>
        </div>
      </div>
      
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)}
        isLoggedIn={isLoggedIn}
        user={user}
      />
    </>
  );
};

export default Header;
