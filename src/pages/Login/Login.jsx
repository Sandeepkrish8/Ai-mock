import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const fakeUser = {
      email: "user@gmail.com",
      name: "User"
    };

    // save login
    localStorage.setItem(
      "user",
      JSON.stringify(fakeUser)
    );

    navigate("/dashboard");
  };
  return (
    <div className="login-container">
      <div className="login-card">

        <h2>Welcome Back 👋</h2>
        <p>Login to continue your interview practice</p>

        <form onSubmit={handleLogin}>
          <input type="email" 
          placeholder="Email" 
          required />

          <input
          type="password"
          placeholder="Password"
          required />

          <button type="submit">
            Login
            </button>
          </form>

          <span className="signup-text">
            Don't have an account? <a href="Signup">Sign Up</a>
          </span>
      </div>
    </div>
  );
};

export default Login;