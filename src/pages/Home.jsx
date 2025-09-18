import React from 'react';
import SEO from '../components/SEO';
import useSEOData from '../hooks/useSEOData';

const Home = () => {
  const { seoData } = useSEOData();

  return (
    <div className="home">
      <SEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        url={window.location.origin}
        image={`${window.location.origin}/vite.svg`}
      />
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">歡迎來到 React SEO</h1>
          <p className="hero-subtitle">
            這是一個使用 React + Vite 建立的現代化網站，具有優秀的 SEO 優化功能
          </p>
          <button className="cta-button">開始探索</button>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">主要特色</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>快速開發</h3>
              <p>使用 Vite 構建工具，享受極快的開發體驗</p>
            </div>
            <div className="feature-card">
              <h3>SEO 友好</h3>
              <p>優化的結構和元標籤，提升搜尋引擎排名</p>
            </div>
            <div className="feature-card">
              <h3>響應式設計</h3>
              <p>完美適配各種設備和螢幕尺寸</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
