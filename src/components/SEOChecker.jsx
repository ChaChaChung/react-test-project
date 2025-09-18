import React, { useState, useEffect } from 'react';
import { checkSEOBestPractices } from '../utils/seoHelpers';
import { useSEO } from '../contexts/SEOContext';

const SEOChecker = () => {
  const [seoIssues, setSeoIssues] = useState([]);
  const [showChecker, setShowChecker] = useState(false);
  const [currentSeoData, setCurrentSeoData] = useState({
    title: '',
    description: '',
    keywords: ''
  });
  
  // 從Context獲取SEO資料
  const { seoData: apiSeoData, loading: apiLoading, error: apiError } = useSEO();

  useEffect(() => {
    // 從 DOM 中讀取實際的 SEO 數據
    const updateSEOData = () => {
      // 取得 DOM 中的 title 和 meta 標籤
      const title = document.title || '';
      const descriptionMeta = document.querySelector('meta[name="description"]');
      const keywordsMeta = document.querySelector('meta[name="keywords"]');

      // 取得 meta 標籤的 content 屬性
      const description = descriptionMeta ? descriptionMeta.getAttribute('content') || '' : '';
      const keywords = keywordsMeta ? keywordsMeta.getAttribute('content') || '' : '';

      // 把資料設定到 currentSeoData 狀態中
      setCurrentSeoData({ title, description, keywords });

      // 檢查 SEO 最佳實踐
      const issues = checkSEOBestPractices({ title, description, keywords });

      // 把檢查結果設定到 seoIssues 狀態中
      setSeoIssues(issues);
    };

    // 初始更新
    updateSEOData();

    // 監聽 DOM 變化
    const observer = new MutationObserver((mutations) => {
      let shouldUpdate = false;
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.target.tagName === 'TITLE') {
          shouldUpdate = true;
        } else if (
          mutation.type === 'attributes' && 
          mutation.target.tagName === 'META' &&
          (mutation.target.getAttribute('name') === 'description' || 
           mutation.target.getAttribute('name') === 'keywords')
        ) {
          shouldUpdate = true;
        }
      });
      
      if (shouldUpdate) {
        updateSEOData();
      }
    });

    // 觀察 head 元素的變化
    observer.observe(document.head, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['content']
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // 只在開發環境顯示 SEO 檢查器
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  const errorCount = seoIssues.filter((issue) => issue.type === 'error').length;
  const warningCount = seoIssues.filter(
    (issue) => issue.type === 'warning'
  ).length;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999,
        fontFamily: 'monospace',
        fontSize: '12px',
      }}
    >
      <button
        onClick={() => setShowChecker(!showChecker)}
        style={{
          backgroundColor:
            errorCount > 0
              ? '#e74c3c'
              : warningCount > 0
                ? '#f39c12'
                : '#27ae60',
          color: 'white',
          border: 'none',
          padding: '10px 15px',
          borderRadius: '50px',
          cursor: 'pointer',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        }}
      >
        SEO{' '}
        {errorCount > 0
          ? `❌ ${errorCount}`
          : warningCount > 0
            ? `⚠️ ${warningCount}`
            : '✅'}
      </button>

      {showChecker && (
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '0',
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            minWidth: '300px',
            maxWidth: '400px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            maxHeight: '300px',
            overflowY: 'auto',
          }}
        >
          <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>
            SEO 檢查報告
          </h3>

          <div style={{ marginBottom: '10px' }}>
            <strong>頁面資訊：</strong>
            <div>
              標題: {currentSeoData.title ? `"${currentSeoData.title}" (${currentSeoData.title.length} 字符)` : '未設置'}
            </div>
            <div>
              描述:{' '}
              {currentSeoData.description
                ? `"${currentSeoData.description.substring(0, 50)}..." (${currentSeoData.description.length} 字符)`
                : '未設置'}
            </div>
            <div>關鍵字: {currentSeoData.keywords || '未設置'}</div>
          </div>

          {/* API 資料狀態 */}
          <div style={{ marginBottom: '10px', fontSize: '11px', color: '#7f8c8d' }}>
            <strong>API 狀態：</strong>
            {apiLoading && <span style={{ color: '#3498db' }}> 載入中...</span>}
            {apiError && <span style={{ color: '#e74c3c' }}> 錯誤: {apiError}</span>}
            {!apiLoading && !apiError && <span style={{ color: '#27ae60' }}> 已載入</span>}
          </div>

          {seoIssues.length === 0 ? (
            <div style={{ color: '#27ae60', fontWeight: 'bold' }}>
              ✅ SEO 設置良好！
            </div>
          ) : (
            <div>
              <strong>發現的問題：</strong>
              {seoIssues.map((issue, index) => (
                <div
                  key={index}
                  style={{
                    margin: '5px 0',
                    padding: '5px',
                    borderRadius: '3px',
                    backgroundColor:
                      issue.type === 'error' ? '#ffebee' : '#fff3e0',
                    borderLeft: `3px solid ${issue.type === 'error' ? '#e74c3c' : '#f39c12'}`,
                  }}
                >
                  {issue.type === 'error' ? '❌' : '⚠️'} {issue.message}
                </div>
              ))}
            </div>
          )}

          <div
            style={{ marginTop: '10px', fontSize: '10px', color: '#7f8c8d' }}
          >
            💡 這個檢查器只在開發環境顯示
          </div>
        </div>
      )}
    </div>
  );
};

export default SEOChecker;
