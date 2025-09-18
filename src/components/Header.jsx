import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">React SEO</h1>
        <nav className="nav">
          <Link to="/" className="nav-link">
            首頁
          </Link>
          <Link to="/about" className="nav-link">
            關於我們
          </Link>
          <Link to="/contact" className="nav-link">
            聯絡我們
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
