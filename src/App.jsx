import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SEOChecker from './components/SEOChecker';
import LocalSEOPanel from './components/LocalSEOPanel';
import { createSEOTester } from './utils/localSEOTester';
import { useSEO } from './contexts/SEOContext';
import useSEOData from './hooks/useSEOData';
import SEO from './components/SEO';

function App() {
  const { loading, error } = useSEO();

  const { seoData } = useSEOData();

  // 在開發環境載入 SEO 檢測工具
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      createSEOTester();
    }
  }, []);

  return (
    <div className="app">
      {/* SEO API 載入狀態 - 只在載入時顯示 */}
      {loading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          margin: 0,
          padding: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <div className="loading-spinner" />
          <p style={{
            marginTop: '20px',
            fontSize: '16px',
            color: '#333',
            fontWeight: '500'
          }}>
            正在載入 SEO 資料...
          </p>
        </div>
      )}
      
      {/* SEO API 錯誤狀態 - 只在錯誤時顯示 */}
      {error && (
        <div style={{ 
          backgroundColor: '#e74c3c', 
          color: 'white', 
          padding: '8px', 
          textAlign: 'center', 
          fontSize: '14px',
          margin: 0
        }}>
          ⚠️ SEO API 載入失敗：{error}（已使用預設資料）
        </div>
      )}

      <SEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        url={window.location.origin}
        image={`${window.location.origin}/vite.svg`}
      />

      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />

      {/* SEO 檢查工具 - 只在開發環境顯示 */}
      <LocalSEOPanel />
      <SEOChecker />
    </div>
  );
}

export default App;
