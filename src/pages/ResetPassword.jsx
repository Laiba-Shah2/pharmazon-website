import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import logo from '../assets/Pharmazon.png';
import ShowPassword from '../components/showPassword.jsx';
import '../css/login-register.css';
import API_BASE from "../config.js";

function ResetPassword() {
    const [searchParams] = useSearchParams(); // to read ?token=xyz
    const token = searchParams.get("token"); // get token from URL
    const email = searchParams.get("email"); // get email from URL
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        // Step 1: Check if passwords match
        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            setLoading(false);
            return;
        }

        // Step 2: Call backend API
        try {
            const response = await axios.post(
                `${API_BASE}/backend/public/index.php?action=api/reset-password`,
                { email, token, password },
                { headers: { "Content-Type": "application/json" } }
            );

            setMessage(response.data.message);

            // Step 3: If successful, redirect to login/home
            if (response.data.status === "success") {
                setTimeout(() => {
                    navigate("/login"); // or navigate("/home") if you want home page
                }, 3000);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Something went wrong. Try again later.");
            }
        }

        setLoading(false);
    };

    return (
      <>
    <div className="reset-password-container">
        <div className="pharmacy-logo">
            <img src={logo} alt="logo" />
        </div>

        <div className="inner-container">
            <h1>Reset Password</h1>
            <p>Enter your new password below.</p>
            <form className="reset-password-form" onSubmit={handleResetPassword}>
                <div className="form-field">
                    <label htmlFor="new-password" className="field-label new-password">
                        New Password
                    </label>
                    <ShowPassword
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter new password"
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="confirm-password" className="field-label confirm-password">
                        Confirm Password
                    </label>
                    <ShowPassword
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                    />
                </div>

                <button type="submit" className="update-password-btn" disabled={loading}>
                    {loading ? "Updating..." : "Update Password"}
                </button>
            </form>

           <span> {message && <p className="status-message">{message}</p>}</span>
        </div>
    </div>
</>

    );
}

export default ResetPassword;
