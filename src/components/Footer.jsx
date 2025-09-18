import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; 2024 React SEO. 版權所有.</p>
        <div className="footer-links">
          <a href="/privacy" className="footer-link">
            隱私政策
          </a>
          <a href="/terms" className="footer-link">
            使用條款
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
