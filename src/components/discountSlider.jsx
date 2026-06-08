import '../css/discountSlider.css';

function DiscountSlider() {
  const text = "💊 Save more, heal faster! Enjoy up to 40% OFF on trusted medicines.";

  return (
    <div className="discount-slider">
      <div className="slide-track">
        <div className="slide-text">{text}</div>
        <div className="slide-text">{text}</div>
        <div className="slide-text">{text}</div>
        <div className="slide-text">{text}</div>
      </div>
    </div>
  );
}

export default DiscountSlider;
