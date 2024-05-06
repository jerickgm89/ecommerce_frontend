import React from 'react';
import ReactDOM from 'react-dom/client';
import { EcommerceApp } from './EcommerceApp.jsx';
import { BrowserRouter } from 'react-router-dom';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// import './style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <EcommerceApp />
    </BrowserRouter>
  </React.StrictMode>,
)
