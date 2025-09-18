// SEO 輔助函數

/**
 * 檢查 SEO 最佳實踐
 * @param {Object} seoData - SEO 數據
 * @returns {Array} 檢查結果陣列
 */
export const checkSEOBestPractices = (seoData) => {
  const issues = [];

  // 檢查標題長度
  if (!seoData.title) {
    issues.push({ type: 'error', message: '缺少頁面標題' });
  } else if (seoData.title.length < 30) {
    issues.push({ type: 'warning', message: '標題太短，建議 30-60 個字符' });
  } else if (seoData.title.length > 60) {
    issues.push({ type: 'warning', message: '標題太長，可能會被截斷' });
  }

  // 檢查描述長度
  if (!seoData.description) {
    issues.push({ type: 'error', message: '缺少頁面描述' });
  } else if (seoData.description.length < 120) {
    issues.push({ type: 'warning', message: '描述太短，建議 120-160 個字符' });
  } else if (seoData.description.length > 160) {
    issues.push({ type: 'warning', message: '描述太長，可能會被截斷' });
  }

  // 檢查關鍵字
  if (!seoData.keywords) {
    issues.push({ type: 'warning', message: '建議添加關鍵字' });
  }

  return issues;
};
