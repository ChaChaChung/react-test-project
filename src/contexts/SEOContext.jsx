import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { fetchSEOData } from '../utils/apiHelpers';

const SEOContext = createContext();

export const useSEO = () => {
  const context = useContext(SEOContext);
  if (!context) {
    throw new Error('useSEO must be used within a SEOProvider');
  }
  return context;
};

export const SEOProvider = ({ children }) => {
  const [seoData, setSeoData] = useState({
    title: '',
    description: '',
    keywords: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 使用 ref 來追蹤API呼叫狀態，防止重複呼叫
  const hasInitialized = useRef(false);
  const isLoading = useRef(false);

  const loadSEOData = async () => {
    // 如果已經初始化過或正在載入中，就不要重複呼叫
    if (hasInitialized.current || isLoading.current) {
      return;
    }
    
    try {
      isLoading.current = true;
      setLoading(true);
      setError(null);
      
      console.log('🔄 正在呼叫 SEO API...');
      const data = await fetchSEOData();
      console.log('✅ SEO API 呼叫成功');
      
      setSeoData(data);
      hasInitialized.current = true;
    } catch (err) {
      console.error('❌ Error fetching SEO data:', err);
      setError(err.message);
      
      // 如果API失敗，使用預設值
      setSeoData({
        title: 'React SEO - 現代化網站開發 - 測試 SEO 檢查工具',
        description: '一個使用 React + Vite 建立的現代化網站，具有優秀的 SEO 優化功能',
        keywords: 'React, Vite, SEO, 網站開發, 前端'
      });
      hasInitialized.current = true;
    } finally {
      setLoading(false);
      isLoading.current = false;
    }
  };

  const refetch = async () => {
    hasInitialized.current = false;
    await loadSEOData();
  };

  useEffect(() => {
    loadSEOData();
  }, []);

  const value = {
    seoData,
    loading,
    error,
    refetch
  };

  return (
    <SEOContext.Provider value={value}>
      {children}
    </SEOContext.Provider>
  );
};
