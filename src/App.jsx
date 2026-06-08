import { useState } from 'react' // Make sure useEffect is here
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx"
import Navbar from './components/navbar.jsx'
import DiscountSlider from './components/discountSlider.jsx';
import Login from './pages/Login.jsx'
import SignUp from './pages/Register.jsx';
import Verify from './pages/verify.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import MedicineCard from './components/medicineCard.jsx';
import MedicineDetails from './pages/MedicineDetail.jsx';
import CartProducts from './components/cart-components.jsx';
import Footer from './components/footer.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import OrderConfirmation from "./pages/OrderConfirmationPage.jsx";
import MyOrders from './pages/MyOrders.jsx';
import Layout from './pages/AdminLayout.jsx';
import Orders from './pages/Admin/OrdersManagement.jsx';
import ManageMedicines from "./pages/Admin/ManageMedicines.jsx"
import InventoryManager from "./pages/Admin/InventoryManagement.jsx"
import Catalogue from "./pages/Admin/Catalogues.jsx"
import Reports from "./pages/Admin/Reports.jsx"
import MedicinePage from "./pages/MedicinePage.jsx"
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx"
import VerifyEmail from "./pages/VerifyEmail.jsx"
import OrderDetails from './pages/OrderDetails.jsx';
import { useLocation } from "react-router-dom";

function App() {

  const [cartItems, setCartItems] = useState([]);

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });


  const location = useLocation();

  const hideLayoutRoutes = [
    "/login",
    "/signup",
    "/forgotPassword",
    "/verify",
    "/resetPassword"

  ];

  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  const isAdminRoute = location.pathname.startsWith("/admin");



  return (
    <>




      {!isAdminRoute && !shouldHideLayout && <Navbar user={user} setUser={setUser} />}
      {!isAdminRoute && !shouldHideLayout && <DiscountSlider />}

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/MyOrders' element={<MyOrders />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/medicines" element={<MedicinePage />} />
        <Route path="/medicine/:id" element={<MedicineDetails cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/verify" element={<VerifyEmail setUser={setUser} />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/order/:id" element={<OrderDetails />} />

        <Route path="/admin" element={<Layout />}>
          <Route index element={<AdminDashboard />} /> {/* default dashboard */}
          <Route path="orders" element={<Orders />} />
          <Route path="medicines" element={<ManageMedicines />} />
          <Route path="categories" element={<Catalogue />} />
          <Route path="inventory" element={<InventoryManager />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>

      {!isAdminRoute && !shouldHideLayout && <Footer />}


    </>
  )
}




export default App
