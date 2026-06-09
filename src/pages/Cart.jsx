import "../css/cart.css";
import CartProducts from "../components/cart-components.jsx";
import OrderSummary from "../components/order-summary.jsx";
import { useEffect, useState } from "react";
import API_BASE from "../config.js";
 
import axios from "axios";
function Cart({ cartItems = [], setCartItems }) {
    const [loading, setLoading] = useState(true);
    const [cartInfo, setcartInfo] = useState({});

    // Fetch protected cart data on page load
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const cart_id = user ? user.cart_id : null;
                const res = await axios.post(`${API_BASE}/backend/public/index.php?action=api/getCart`, { cart_id }); // your protected endpoint
                if (res.data.status) {
                    setCartItems(res.data.cart_items);
                    setcartInfo(res.data);
                    // update state
                } else {
                    console.error("Unauthorized or no cart items");
                }
            } catch (err) {
                console.error("Failed to fetch cart items:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, [setCartItems]);

    if (loading) return <p>Loading your cart...</p>;

    return (
        <div className="cart-body">
            <h1 className="cart-heading page-title">My Cart</h1>
            <div className="cart-container">
                <div className="cart-product-details">


                    {(cartItems.length === 0) ? (
                        <p style={{ fontSize: "20px", fontWeight: 700, color: "#00413A", margin: "auto" }}>Your cart is empty.</p>
                    ) : (
                        cartItems.map(item => (
                            <CartProducts
                                key={item.id}
                                cartItems={item}
                                product={item}
                                setCartItems={setCartItems}
                            />
                        ))
                    )}
                </div>

                <OrderSummary cartItems={cartItems} />
            </div>
        </div>
    );
}

export default Cart;
