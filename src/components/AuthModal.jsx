import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, logoutUser } from "../utils/userSlice";

const AuthModal = ({ isOpen, onClose, isLoggedIn, user }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  // Validation
  const validateForm = () => {
    let newErrors = {};
    
    if (!email.includes("@")) {
      newErrors.email = "Invalid email format";
    }
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (isSignUp && !name.trim()) {
      newErrors.name = "Name is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const userData = {
      name: isSignUp ? name : email.split("@")[0],
      email,
      id: Math.random().toString(36).substr(2, 9),
    };

    dispatch(loginUser(userData));
    setEmail("");
    setPassword("");
    setName("");
    setErrors({});
    onClose();
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close-btn" onClick={onClose}>✕</button>

        {isLoggedIn ? (
          // Logged In View
          <div className="auth-logged-in">
            <div className="user-profile-icon">👤</div>
            <h2>Welcome, {user?.name}!</h2>
            <p className="user-email">{user?.email}</p>
            
            <div className="auth-actions">
              <button className="profile-btn">View Profile</button>
              <button className="orders-btn">My Orders</button>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        ) : (
          // Sign In/Sign Up View
          <div className="auth-form-container">
            <h2>{isSignUp ? "Create Account" : "Sign In"}</h2>

            <form onSubmit={handleSubmit}>
              {isSignUp && (
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={errors.name ? "input-error" : ""}
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>
              )}

              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? "input-error" : ""}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={errors.password ? "input-error" : ""}
                />
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>

              <button type="submit" className="auth-submit-btn">
                {isSignUp ? "Sign Up" : "Sign In"}
              </button>
            </form>

            <div className="auth-toggle">
              <p>
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setErrors({});
                    setEmail("");
                    setPassword("");
                    setName("");
                  }}
                  className="toggle-btn"
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
