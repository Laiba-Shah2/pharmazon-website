import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import '../css/login-register.css';
import logo from '../assets/Pharmazon.png';
import API_BASE from "../config.js";

import ShowPassword from '../components/showPassword.jsx';

function Login({ setUser }) {
  // Step 1: Create states to store input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // for success/error message
  const [loading, setLoading] = useState(false); // to show loading state

  const navigate = useNavigate(); // used to redirect user

  // Step 2: Handle login button click
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        `${API_BASE}/backend/public/index.php?action=api/login`,
        { email, password }
      );

      const { status, message, id, name, role, email: userEmail, cart_id } = response.data;
      // Check the logical status returned by the PHP backend
      if (status === true) {
        // Successful Login - status is TRUE

        const user = { id, name, role, email: userEmail, cart_id };

        localStorage.setItem('user', JSON.stringify(user)); // store full object
        localStorage.setItem('role', role); // optional separate role storage

        setMessage(message); // Show success message from backend
        // Redirect after a delay
        setTimeout(() => {

          if (role === "admin") {
            navigate("/admin");
            setUser(user);
          } else if (role === "customer") {
            navigate("/");
            setUser(user);
          }

        }, 2000);

        console.log("successful", response.data);

      } else {
        // Logical Failure - status is FALSE (e.g., "Incorrect password")
        setMessage(message);
        console.log("wrong", response.data);
      }

    } catch (error) {
      let errorMessage = "Connection error. Please ensure the backend server is running.";

      if (axios.isAxiosError(error) && error.response) {
        console.error("Server responded with HTTP error status:", error.response.status, error.response.data);

        if (error.response.data && error.response.data.message) {
          // Use the specific message from the error response body
          errorMessage = error.response.data.message;
        } else {
          errorMessage = `Request failed: HTTP Status ${error.response.status}.`;
        }
      } else {
        console.error("Login failed due to client/network issue:", error);
      }

      // Display the final error message
      setMessage(errorMessage);

    } finally {
      // Always stop loading
      setLoading(false);
    }
  };


  return (
    <>
      <div className="sign-in-container">
        <div className="pharmacy-logo">
          <img src={logo} alt="logo" />
          {/* Placeholder for logo */}
        </div>

        <div className="inner-container">
          <h1>Login</h1>
          <p>Log in to your Pharmazon account to explore more.</p>

          <form className="sign-in-form" onSubmit={handleLogin}>
            <div className="form-field">
              <label htmlFor="email" className="field-label user-email">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="user-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <div className="input-group">
                <label htmlFor="password" className="field-label">
                  Password
                </label>


                {
                  <ShowPassword
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=" "
                    className="user-password"
                  />
                }
              </div>
              <p className="forgot-password"><Link to='/forgotPassword'>Forgot Password?</Link></p>
            </div>

            {/* Step 8: Show success/error message below the form */}
            {message && (
              <div >
                <p className="login-message ">{message}</p>
              </div>
            )}

            <button type="submit" className="sign-in" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="dont-have-account mt-4">
            Don't have an account?{" "}
            <span className="signup-signin-link">
              <Link to='/signup'>Sign up</Link>
            </span>{" "}
            now!
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;