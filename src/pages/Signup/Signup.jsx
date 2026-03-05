import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    const newUser = {
      email: "newuser@gmail.com"
    };

    localStorage.setItem(
      "user",
      JSON.stringify(newUser)
    );

    navigate("/dashboard");
  };
  return (
    <div className="signup-container">
      <div className="signup-card">

        <h2>Create Account 🚀</h2>
        <p>Start practicing AI interviews today</p>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            required
          />

          <input
            type="password"
            placeholder="Password"
            required
          />

          <button type="submit">
            Sign Up
          </button>
        </form>

        <span className="login-text">
          Already have an account?
          <Link to="/login"> Login</Link>
        </span>

      </div>
    </div>
  );
};

export default Signup;