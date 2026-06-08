import "../css/footer.css";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">

            <div className="footer-container">
                
                <div className="footer-column">
                    <h3>Why Choose Us</h3>
                    <ul>
                        <li>Affordable Prices</li>
                        <li>Genuine Products</li>
                        <li>Fast Delivery</li>
                        <li>Secure Payments</li>
                    </ul>
                </div>



                {/* 1. Categories */}
                <div className="footer-column">
                    <h3>Categories</h3>
                    <ul>
                        <li>Pain Relief</li>
                        <li>Cold & Flu</li>
                        <li>Vitamins</li>
                        <li>Baby Care</li>
                        <li>Skin Care</li>
                    </ul>
                </div>

                {/* 2. Pages */}
                <div className="footer-column">
                    <h3>Pages</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/medicines">Medicines</Link></li>
                        <li><Link to="/cart">My Cart</Link></li>
                        <li><Link to="/orders">My Orders</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                {/* 3. Contact Us */}
                <div className="footer-column">
                    <h3>Contact Us</h3>
                    <ul>
                        <li>📍 Karachi, Pakistan</li>
                        <li>📞 0300-1234567</li>
                        <li>📧 support@pharmazon.com</li>
                    </ul>
                </div>



            </div>

            <div className="footer-bottom">
                <p>© 2021 All Rights Reserved</p>
            </div>

        </footer>
    );
}


export default Footer;