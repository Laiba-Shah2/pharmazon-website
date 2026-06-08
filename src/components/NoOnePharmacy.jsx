import React from "react";
import "../css/noOnePharmacy.css"; // Link to the CSS
import pharmacyImage from "../assets/pharmacy.jpg"; // Replace with your image path

function NoOnePharmacy() {
  return (
    <section className="pharmacy-section">
      <div className="pharmacy-content">
        <div className="text-content">
          <h1>Pakistan's No.1 Pharmacy</h1>
          <p>
            Welcome to <strong>Pharmazon</strong>, where your health is our
            top priority. We provide 100% genuine medicines, fast home delivery,
            and expert guidance to ensure you and your loved ones stay healthy.
            Trusted by thousands across Pakistan for quality, reliability, and
            care.
          </p>
        </div>
        <div className="image-content">
          <img src={pharmacyImage} alt="Pharmacy" />
        </div>
      </div>
    </section>
  );
}

export default NoOnePharmacy;
