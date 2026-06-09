import axios from "axios";
import API_BASE from "../config.js";

const addToCartAPI = async (productId, quantity = 1, cart_id) => {
  try {
    const response = await axios.post(
      `${API_BASE}/backend/public/index.php?action=api/addToCart`,
      { medicine_id: productId, quantity, cart_id },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    console.log(productId, quantity, cart_id)
    return { status: "fail", message: "Cannot add to cart" };
  }
};


export default addToCartAPI;
