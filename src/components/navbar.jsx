import { Link } from 'react-router-dom';
import '../css/navbar.css'
import logo from '../assets/Pharmazon.png';
import { useState } from 'react';
import NotificationsPopup from "./notificationPopup.jsx";
import { FaUserCircle, FaBell } from "react-icons/fa"; // user icon


function Navbar({ user, setUser }) {
    // State for managing the shopping cart visibility
    // const [isCartOpen, setIsCartOpen] = useState(false);

    //  State for managing the mobile sidebar visibility
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showProfilePopup, setShowProfilePopup] = useState(false);
    const [showNotificationPopUp, setShowNotificationPopUp] = useState(false);

    // Closes the sidebar by setting state to false
    const closeSideBarOnClick = () => {
        setIsSidebarOpen(false);
    }

    // Opens the sidebar by setting state to true
    const openSideBarOnClick = () => {
        setIsSidebarOpen(true);
    }

    // LOGOUT HANDLER
    const handleLogout = () => {
        localStorage.removeItem("user");
        // localStorage.removeItem("email");
        setUser(null);
        setShowProfilePopup(false);
    };

    return (
        <>
            <nav className='nav-bar'>
                <div className='pharm-logo'><img src={logo} alt="logo" /></div>

                {/* Apply the 'open-sidebar' class conditionally based on state */}
                <div className={`navigation-box ${isSidebarOpen ? 'open-sidebar' : ''}`}>

                    {/* Close button (the 'X' icon) */}
                    <i className="fa-solid fa-xmark" onClick={closeSideBarOnClick}></i>

                    <div className='navigation-links'>
                        <Link className='nav-link' to="/" onClick={closeSideBarOnClick}>Home</Link>
                        <Link className='nav-link' to="/MyOrders" onClick={closeSideBarOnClick}>My Orders</Link>

                        {/* Cart link/button: You can keep it as a link or use it to toggle CartSlide */}
                        <Link className='nav-link' to="/cart" onClick={closeSideBarOnClick}>
                            Cart
                        </Link>

                        <Link className='nav-link' to="/medicines" onClick={closeSideBarOnClick}>Medicines</Link>
                    </div>
                </div>

                <div className='mobile-nav-btn-bar'>
                    {!user ? (
                        <Link to="/login">
                            <button className="sign-in-btn">Sign In</button>
                        </Link>
                    ) : (
                        <>
                            <div className='nav-sidebox'>
                                <div
                                    className="user-profile"
                                    style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}
                                    onClick={() => setShowProfilePopup(!showProfilePopup)}
                                >
                                    <FaUserCircle size={40} style={{ color: "#00413A" }} />
                                    <span>{user.name}</span>

                                    {showProfilePopup && (
                                        <div className="profile-popup">
                                            <button onClick={handleLogout}>Logout</button>
                                        </div>
                                    )}
                                </div>
                                <div className='notification-box'>
                                    <p></p>
                                    <FaBell size={22} onClick={()=>{setShowNotificationPopUp(!showNotificationPopUp)}}/>
                                    {
                                        showNotificationPopUp && <NotificationsPopup/>
                                    }

                                </div>
                                </div>
                            </>
                    )}
                            <i className="fa-solid fa-bars" onClick={openSideBarOnClick}></i>

                </div>
            </nav>

            {/* Cart Slide showing when open */}
            {/* {isCartOpen && <CartSlide onClose={() => setIsCartOpen(false)} />} */}
        </>
    )
}


export default Navbar;
