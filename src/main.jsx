import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import './index.css';

TimeAgo.addDefaultLocale(en);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
