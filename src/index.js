import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log('ok')

const rootElement = document.getElementById('root'); // Or any other element where you want to render
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);