import React, { useState, useEffect } from 'react';
import { calculateSEOScore } from '../utils/localSEOTester';

const LocalSEOPanel = () => {
  const [seoScore, setSeoScore] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [metaInfo, setMetaInfo] = useState({});

  // 只在開發環境顯示
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  const runSEOCheck = () => {
    const score = calculateSEOScore();
    setSeoScore(score);
    
    // 獲取當前頁面 Meta 資訊
    const title = document.querySelector('title');
    const description = document.querySelector('meta[name="description"]');
    const ogImage = document.querySelector('meta[property="og:image"]');
    
    setMetaInfo({
      title: title ? title.textContent : '未設置',
      titleLength: title ? title.textContent.length : 0,
      description: description ? description.content : '未設置',
      descriptionLength: description ? description.content.length : 0,
      ogImage: ogImage ? ogImage.content : '未設置',
      url: window.location.href
    });
  };

  useEffect(() => {
    // 組件載入時自動檢測一次
    runSEOCheck();
  }, []);

  const getScoreColor = (score) => {
    if (score >= 90) return '#27ae60';
    if (score >= 70) return '#f39c12';
    return '#e74c3c';
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('已複製到剪貼板！');
    });
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '20px',
      zIndex: 9999,
      fontFamily: 'monospace',
      fontSize: '12px'
    }}>
      <button
        onClick={() => setIsVisible(!isVisible)}
        style={{
          backgroundColor: seoScore ? getScoreColor(seoScore.score) : '#95a5a6',
          color: 'white',
          border: 'none',
          padding: '10px 15px',
          borderRadius: '5px',
          cursor: 'pointer',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          marginBottom: '10px'
        }}
      >
        📊 SEO 分數: {seoScore ? `${seoScore.score}/100 (${seoScore.grade})` : '檢測中...'}
      </button>

      {isVisible && (
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '20px',
          minWidth: '400px',
          maxWidth: '500px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          maxHeight: '80vh',
          overflowY: 'auto'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ margin: 0, color: '#2c3e50' }}>🔍 本地 SEO 檢測</h3>
            <button
              onClick={runSEOCheck}
              style={{
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '10px'
              }}
            >
              重新檢測
            </button>
          </div>

          {seoScore && (
            <>
              {/* 分數圓環 */}
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: `conic-gradient(${getScoreColor(seoScore.score)} ${seoScore.score * 3.6}deg, #ecf0f1 0deg)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  position: 'relative'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    color: getScoreColor(seoScore.score)
                  }}>
                    {seoScore.score}
                  </div>
                </div>
                <div style={{ marginTop: '10px', fontWeight: 'bold', color: getScoreColor(seoScore.score) }}>
                  等級: {seoScore.grade}
                </div>
              </div>

              {/* 檢測項目 */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>檢測項目：</h4>
                {seoScore.checks.map((check, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '5px 0',
                    borderBottom: '1px solid #ecf0f1'
                  }}>
                    <span>{check.item}</span>
                    <span style={{
                      color: check.status === '✅' ? '#27ae60' : '#e74c3c'
                    }}>
                      {check.status} ({check.points}分)
                    </span>
                  </div>
                ))}
              </div>

              {/* 頁面資訊 */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>頁面資訊：</h4>
                
                <div style={{ marginBottom: '10px' }}>
                  <strong>標題 ({metaInfo.titleLength} 字符)：</strong>
                  <div style={{
                    backgroundColor: '#f8f9fa',
                    padding: '5px',
                    borderRadius: '3px',
                    fontSize: '11px',
                    marginTop: '5px',
                    cursor: 'pointer'
                  }} onClick={() => copyToClipboard(metaInfo.title)}>
                    {metaInfo.title}
                  </div>
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <strong>描述 ({metaInfo.descriptionLength} 字符)：</strong>
                  <div style={{
                    backgroundColor: '#f8f9fa',
                    padding: '5px',
                    borderRadius: '3px',
                    fontSize: '11px',
                    marginTop: '5px',
                    cursor: 'pointer'
                  }} onClick={() => copyToClipboard(metaInfo.description)}>
                    {metaInfo.description}
                  </div>
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <strong>OG 圖片：</strong>
                  <div style={{
                    backgroundColor: '#f8f9fa',
                    padding: '5px',
                    borderRadius: '3px',
                    fontSize: '11px',
                    marginTop: '5px',
                    cursor: 'pointer'
                  }} onClick={() => copyToClipboard(metaInfo.ogImage)}>
                    {metaInfo.ogImage}
                  </div>
                </div>
              </div>

              {/* 快速操作 */}
              <div style={{ borderTop: '1px solid #ecf0f1', paddingTop: '15px' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>快速操作：</h4>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => window.open('https://developers.facebook.com/tools/debug/', '_blank')}
                    style={{
                      backgroundColor: '#4267B2',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      fontSize: '10px'
                    }}
                  >
                    Facebook 分享除錯
                  </button>
                  
                  <button
                    onClick={() => window.open('https://cards-dev.twitter.com/validator', '_blank')}
                    style={{
                      backgroundColor: '#1DA1F2',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      fontSize: '10px'
                    }}
                  >
                    Twitter 卡片驗證
                  </button>
                  
                  <button
                    onClick={() => window.checkSEO && window.checkSEO()}
                    style={{
                      backgroundColor: '#27ae60',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      fontSize: '10px'
                    }}
                  >
                    控制台詳細檢測
                  </button>
                </div>
              </div>
            </>
          )}

          <div style={{ marginTop: '15px', fontSize: '10px', color: '#7f8c8d', textAlign: 'center' }}>
            💡 點擊文字可複製 | 僅在開發環境顯示
          </div>
        </div>
      )}
    </div>
  );
};

export default LocalSEOPanel;
