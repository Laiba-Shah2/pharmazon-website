import '../css/login-register.css';
import logo from '../assets/Pharmazon.png';
import { useState } from "react";
import axios from "axios";
function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);



    const handleFogotPassword = async (e) => {
        e.preventDefault(); // stop page reload

        setMessage("");
        setLoading(true);


        try {
            const response = await axios.post(
                "http://localhost/online-pharmacy/backend/public/index.php?action=api/forgot-password",
                { email },
                {
                    headers: { "Content-Type": "application/json" }
                })

            setMessage(response.data.message);
                console.log(response.data);


        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message);
                console.log(error.response.data.message);

            } else {

                setMessage("Something went wrong. Try again later.");
                console.log(error);
            }

        }

        setLoading(false);
    }

    return (
        <>

            <div className="forget-password-container" onSubmit={handleFogotPassword}>
                <div className="pharmacy-logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="inner-container">
                    <h1>Forgot Password</h1>
                    <p>Enter your email address to reset your password.</p>
                    <form className="forgot-password-form">
                        <div className="form-field">
                            <label htmlFor="email" className="field-label user-email">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="user-email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="reset-password-btn" disabled={loading}>
                            {loading ? "Sending..." : "Send Reset Link"}
                        </button>
                        {message && <p className="reset-message">{message}</p>}


                    </form>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword;