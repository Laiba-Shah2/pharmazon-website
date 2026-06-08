
import React from "react";
import { FaCheckCircle, FaTruck, FaTags, FaHeadset } from "react-icons/fa"; 
import "../css/whyChoseUs.css";

function WhyChoseUs() {


    const choosePoints = [


        {
            title: "100% Original Medicines",
            description: "We provide only authentic and approved medicines.",
            icon: <FaCheckCircle />,
        },
        {
            title: "Fast Home Delivery",
            description: "Get your medicines delivered safely and quickly.",
            icon: <FaTruck />,
        },
        {
            title: "Affordable Prices",
            description: "We offer competitive pricing for all essential medicines.",
            icon: < FaTags />,
        },
        {
            title: "Customer Support",
            description: "We are here to assist you anytime.",
            icon: <FaHeadset />,
        }
    ]
    return (

        <>
            <div className="why-choose-us-container">
                <h2 className="why-heading">Why Choose Us</h2>
                <div className="why-choose-us-inner-container" >
                {choosePoints.map((p, i)=>

                    (

                        <div className="choose-card">
                            <div className="choose-icon">{p.icon}</div>
                            <h2 className="choose-title">{p.title}</h2>
                            <p className="choose-description">{p.description}</p>
                        </div>
                    ))}
</div>
            </div>

        </>
    )


}


export default WhyChoseUs;