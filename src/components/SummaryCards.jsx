import React from "react";
import "../css/summaryCards.css";

const SummaryCards = ({ metrics }) => {
  return (
    <div className="summary-cards-container">
      {metrics.map((metric, index) => (
        <div className="summary-card" key={index}>
          <h3 className="card-title">{metric.title}</h3>
          <p className="card-value">{metric.value}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
