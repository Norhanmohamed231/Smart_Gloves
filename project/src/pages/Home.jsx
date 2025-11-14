import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/home.css';

function Home() {
  const navigate = useNavigate();
  return (
    <div className='container'>
      <div className='overlay'></div>
      <div className='card'>
        <p className='title'>اختر نوع المساعدة الذكية التي تناسبك</p>

        <div className='options'>
          {/* visual support */}
          <div
            className='optionBox'
            onClick={() => navigate("/blind")}
          >
            <img src="/img/blind.png" alt="Blind user" className='image' />
            <h3 className='optionTitle'>Blind</h3>
            <p className='optionDesc'>convert text to speech</p>
            <button className='btn'>
              <i className="fa-solid fa-microphone marginLeft" aria-hidden="true"></i>
              Start Now
            </button>
          </div>

          {/* hearing support */}
          <div
            className='optionBox'
            onClick={() => navigate("/deaf")}
          >
            <img src="/img/deaf.png" alt="Deaf user" className='image' />
            <h3 className='optionTitle'>Deaf</h3>
            <p className='optionDesc'>Convert speech to text</p>
            <button className='btn'>
              <i className="fa-solid fa-pen marginLeft" aria-hidden="true"></i>
              Start Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
