import React, { useState, useEffect } from "react";
import "../css/checkout.css";
import OrderSummary from "../components/order-summary.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout({ cartItems = [], setCartItems }) {

    const [loading, setLoading] = useState(true);

    const [fullName, setFullName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [city, setCity] = useState("");
    const [shippingAddress, setShippingAddress] = useState("");
  const navigate = useNavigate(); // used to redirect user

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const cart_id = user ? user.cart_id : null;

                const res = await axios.post(
                    "http://localhost/online-pharmacy/backend/public/index.php?action=api/getCart",
                    { cart_id }
                );

                if (res.data.status) {
                    setCartItems(res.data.cart_items);
                }
            } catch (err) {
                console.error("Failed to fetch cart items:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, [setCartItems]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem("user"));
                const user_email = user.email;

        if (!user?.id) {
            alert("User not logged in");
            return;
        }

        const payload = {
            user_id: user.id,
            user_name: fullName,
            city: city,
            shipping_address: shippingAddress,
            phone_no: phoneNo,
            // user_email: user_email
        };

        try {
            const response = await axios.post(
                "http://localhost/online-pharmacy/backend/public/index.php?action=api/placeOrder",
                payload
            );

            if (response.data.status === "success" || response.data.status === true) {
                alert("Order placed successfully!");
                setCartItems([]);

                // clear form fields
                setFullName("");
                setPhoneNo("");
                setCity("");
                setShippingAddress("");
                setTimeout(() => {


                    navigate("/MyOrders");


                }, 2000);
            } else {
                alert(response.data.message);
                // console.log(payload);
                console.log("FULL RESPONSE:", response.data);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to place order");
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="checkout-body">
            <div className="checkout-container">
                <h1 className="checkout-heading">Checkout</h1>

                <div className="checkout-inner-div">
                    <form className="checkout-form" onSubmit={handleSubmit}>

                        <label>Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />

                        <label>Phone Number</label>
                        <input
                            type="text"
                            placeholder="Enter your phone number"
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                            required
                        />

                        <label>City</label>
                        <input
                            type="text"
                            placeholder="Enter your city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />

                        <label>Address</label>
                        <textarea
                            placeholder="Enter your complete address"
                            value={shippingAddress}
                            onChange={(e) => setShippingAddress(e.target.value)}
                            required
                        ></textarea>

                        <button type="submit" className="place-order-btn">
                            Place Order
                        </button>

                        <p className="cash-on-delivery">
                            <span>Please note:</span> Payments are accepted through Cash on Delivery only.
                        </p>
                    </form>

                    <OrderSummary cartItems={cartItems} />
                </div>
            </div>
        </div>
    );
}

export default Checkout;
