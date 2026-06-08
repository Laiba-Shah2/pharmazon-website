import heroImage from '../assets/doctors.png';
import '../css/hero.css'
function Main() {



 return (
  <div className='hero-main_box'>
    <div className='hero-desciption'>
      <h1 className='hero-title'>Caring for You, Wherever You Are!</h1>
      <p className='hero-para'>
     
        Genuine medicines and health essentials — delivered safely to your home with Pharmazon.
      </p>
  
      <button type="button" className='shop-now-btn'>Shop Now!</button>
    </div>

    <div className='hero-background'>
      <img src={heroImage} alt="" />
    </div>
  </div>
);

}


export default Main;