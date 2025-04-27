import React from 'react';
import './globals.css';
import './style.css';
import './figma-design.css';
import './slider.css';

export default function Home() {
  return (
    <div>
      <h1>My Portfolio</h1>
      <p>This is a Next.js app. To view the portfolio, please check the index.html file directly.</p>
      <p>
        <a href="/index.html" style={{ color: 'blue', textDecoration: 'underline' }}>
          View Portfolio
        </a>
      </p>
    </div>
  );
} 