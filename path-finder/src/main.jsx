import React from 'react';
import ReactDOM from 'react-dom/client';
import { withBase } from './publicUrl';
import App from './App';
import './App.css';

const fontStyle = document.createElement('style');
fontStyle.textContent = `@font-face{font-family:'zihunaotushijieti_T';src:url('${withBase('fonts/zihunaotushijieti_T.ttf')}') format('truetype');font-weight:400;font-style:normal;font-display:swap;}`;
document.head.appendChild(fontStyle);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
