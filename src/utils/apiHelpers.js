// API 相關的輔助函數

/**
 * 獲取 SEO 資料的 API 呼叫
 * @returns {Promise<{title: string, description: string, keywords: string}>}
 */
export const fetchSEOData = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/get/seo-data', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      title: data.title || '',
      description: data.description || '',
      keywords: data.keywords || ''
    };
  } catch (error) {
    console.error('Error fetching SEO data:', error);
    throw error;
  }
};
