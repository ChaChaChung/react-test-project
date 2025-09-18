import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { router } from './router/index';
import { SEOProvider } from './contexts/SEOContext';
import './css/index.css';

const Root = () => {
  return (
    <StrictMode>
      <SEOProvider>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </SEOProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<Root />);
