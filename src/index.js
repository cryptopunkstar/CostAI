import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CostAIApp from './App';  // Add this line

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CostAIApp />
  </React.StrictMode>
);
