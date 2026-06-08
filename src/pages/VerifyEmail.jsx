import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

function VerifyEmail({ setUser }) {
  const [message, setMessage] = useState("Verifying...");
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token || !email) {
      setMessage("Invalid verification link.");
      setLoading(false);
      return;
    }

    const verify = async () => {
      try {
        const res = await axios.get(
          `http://localhost/online-pharmacy/backend/public/index.php?action=api/verifyEmail&token=${token}&email=${encodeURIComponent(email)}`
        );

        if (res.data.status === "success") {
          setMessage("Email verified successfully!");

          if (res.data.user) {
            localStorage.setItem("user", JSON.stringify(res.data.user));
            setUser(res.data.user);
          }

          // redirect home
          setTimeout(() => navigate("/"), 2000);
        } else {
          setMessage(res.data.message);
        }
      } catch (err) {
        setMessage("Verification failed. Try again.");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, []);

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h2>{loading ? "Verifying your email..." : message}</h2>
    </div>
  );
}

export default VerifyEmail;
