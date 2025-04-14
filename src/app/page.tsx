'use client';

import './style.css';
import './figma-design.css';

export default function Home() {
  return (
    <div className="container">
      {/* Navigation buttons */}
      <div className="nav-buttons">
        <button className="nav-button">Product</button>
        <button className="nav-button">Mechatronics</button>
        <button className="nav-button">Game</button>
      </div>
      
      {/* Layer 2 image */}
      <img className="layer2-image" src="/images/layer 3.png" alt="Background Image" />
      
      {/* Carousel - positioned in the background but visible */}
      <div className="carousel">
        <div className="slider" style={{'--quantity': 10} as any}>
          <div className="item" style={{'--position': 1} as any}><img src="/images/MCW.png" alt="MCW Image" /></div>
          <div className="item" style={{'--position': 2} as any}><img src="/images/MCW.png" alt="MCW Image" /></div>
          <div className="item" style={{'--position': 3} as any}><img src="/images/Head1.png" alt="Head Image" /></div>
          <div className="item" style={{'--position': 4} as any}><img src="/images/Head_Open.png" alt="Head Open Image" /></div>
          <div className="item" style={{'--position': 5} as any}><img src="/images/MCW.png" alt="MCW Image" /></div>
          <div className="item" style={{'--position': 6} as any}><img src="/images/MCW.png" alt="MCW Image" /></div>
          <div className="item" style={{'--position': 7} as any}><img src="/images/MCW.png" alt="MCW Image" /></div>
          <div className="item" style={{'--position': 8} as any}><img src="/images/MCW.png" alt="MCW Image" /></div>
          <div className="item" style={{'--position': 9} as any}><img src="/images/MCW.png" alt="MCW Image" /></div>
          <div className="item" style={{'--position': 10} as any}><img src="/images/MCW.png" alt="MCW Image" /></div>
        </div>
      </div>
      
      {/* Removing Robot face image */}
      {/* <img className="robot-face" src="/images/robot-face.svg" alt="Robotic face" /> */}
      
      {/* Name and title section */}
      <div className="name-section">
        <h1 className="name">Sean Cheng</h1>
        <div className="title">
          <p>Product &amp;</p>
          <p>Mechatronics &amp;</p>
          <p>Game Design</p>
        </div>
      </div>
      
      {/* Dot button in bottom left */}
      <button className="dot-button"></button>
    </div>
  );
}

/* Compress size for Head1.png and Head_Open.png */
.carousel .slider .item:nth-child(3) img,
.carousel .slider .item:nth-child(4) img {
  transform: rotateY(0deg) scale(0.85);
}
