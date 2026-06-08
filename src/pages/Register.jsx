import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios"; // to send requests to backend
import ShowPassword from '../components/showPassword.jsx';

import logo from '../assets/Pharmazon.png';
import '../css/login-register.css';

function SignUp() {
    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await axios.post("http://localhost/online-pharmacy/backend/public/index.php?action=api/register", {
                username,
                email,
                password
            });

            setMessage(response.data.message);
            setLoading(false);

        } catch (error) {
            setLoading(false);
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Registration failed. Try again.");
            }
            console.error(error);
        }
    }

    return (
        <>
            <div className="sign-in-container">
                <div className="pharmacy-logo">
                    <img src={logo} alt="logo" />
                </div>

                <div className="inner-container">
                    <h1>Sign Up</h1>

                    <form className="sign-in-form" onSubmit={handleRegister}>
                        <div className="form-field">
                            <label htmlFor="signup-user-name" className="field-label user-name">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="user-name"
                                id="signup-user-name"
                                className="user-name"
                                value={username}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-field">
                            <div className="input-group">
                                <label htmlFor="signup-email" className="field-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="signup-email"
                                    className="user-email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-field">
                            <div className="input-group">
                                <label htmlFor="signup-password" className="field-label">Password</label>

                                <ShowPassword
                                    id="signup-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder=" "
                                    className="user-password"
                                />
                            </div>
                        </div>

                        <button type="submit" className="sign-up-btn" disabled={loading}>
                            {loading ? "Registering..." : "Sign Up"}
                        </button>
                    </form>

                    {message && <div><p className="register-message">{message}</p></div>}

                    <p className="dont-have-account">
                        Already have an account? <span className="signup-signin-link">
                            <Link to='/login'>Sign in</Link>
                        </span> now!
                    </p>
                </div>
            </div>
        </>
    );
}

export default SignUp;
