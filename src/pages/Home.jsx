import Navbar from "../components/navbar.jsx"
import DiscountSlider from "../components/discountSlider"
import Main from "../components/hero"
import FeaturedMedicines from "../pages/FeaturedMedicines.jsx"
import WhyChoseUs from "../components/whyChooseUs.jsx";
import NoOnePharmacy from "../components/NoOnePharmacy.jsx"
import Categories from "../components/shopByCategories.jsx"
function Home() {




    return (
        <>

            <Main />
            <NoOnePharmacy />
            <FeaturedMedicines />
            <WhyChoseUs />
            <Categories />
        </>
    )
}


export default Home;
