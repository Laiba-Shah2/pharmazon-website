import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import API_BASE from "../config.js";

function Verify() {
  const [message, setMessage] = useState(""); // success or error message
  const [loading, setLoading] = useState(true); // show loading while verifying
  const [searchParams] = useSearchParams(); // get query params
  const navigate = useNavigate();

  useEffect(() => {
    // Step 1: Get token from URL
    const token = searchParams.get("token");

    if (!token) {
      setMessage("Invalid verification link.");
      setLoading(false);
      return;
    }

    // Step 2: Send token to backend to verify
    const verifyEmail = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/verify-email",
          { token }
        );

        // Step 3: Show success message
        setMessage(response.data.message || "Email verified successfully!");
        setLoading(false);

        // Step 4: Redirect to home page after 3 seconds
        setTimeout(() => {
          navigate("/"); // home page route
        }, 3000);

      } catch (error) {
        setLoading(false);
        if (error.response && error.response.data && error.response.data.message) {
          setMessage(error.response.data.message);
        } else {
          setMessage("Verification failed. Try again.");
        }
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      {loading ? (
        <p>Verifying your email...</p>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
}

export default Verify;
