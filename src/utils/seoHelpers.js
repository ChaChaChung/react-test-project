// SEO 輔助函數

/**
 * 生成結構化數據
 * @param {Object} data - 結構化數據內容
 * @returns {string} JSON-LD 格式的結構化數據
 */
export const generateStructuredData = (data) => {
  return JSON.stringify({
    '@context': 'https://schema.org',
    ...data,
  });
};

/**
 * 生成網站麵包屑結構化數據
 * @param {Array} breadcrumbs - 麵包屑陣列 [{name: '首頁', url: '/'}]
 * @returns {string} JSON-LD 格式的麵包屑數據
 */
export const generateBreadcrumbData = (breadcrumbs) => {
  const itemListElement = breadcrumbs.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  }));

  return generateStructuredData({
    '@type': 'BreadcrumbList',
    itemListElement: itemListElement,
  });
};

/**
 * 生成文章結構化數據
 * @param {Object} article - 文章資訊
 * @returns {string} JSON-LD 格式的文章數據
 */
export const generateArticleData = (article) => {
  return generateStructuredData({
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: article.publisher,
      logo: {
        '@type': 'ImageObject',
        url: article.publisherLogo,
      },
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
  });
};

/**
 * 生成組織結構化數據
 * @param {Object} organization - 組織資訊
 * @returns {string} JSON-LD 格式的組織數據
 */
export const generateOrganizationData = (organization) => {
  return generateStructuredData({
    '@type': 'Organization',
    name: organization.name,
    url: organization.url,
    logo: organization.logo,
    description: organization.description,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: organization.phone,
      contactType: 'customer service',
    },
    sameAs: organization.socialMedia || [],
  });
};

/**
 * 清理和格式化 SEO 文字
 * @param {string} text - 原始文字
 * @param {number} maxLength - 最大長度
 * @returns {string} 格式化後的文字
 */
export const formatSEOText = (text, maxLength = 160) => {
  if (!text) return '';

  // 移除 HTML 標籤
  const cleanText = text.replace(/<[^>]*>/g, '');

  // 移除多餘空白
  const trimmedText = cleanText.trim().replace(/\s+/g, ' ');

  // 截斷文字
  if (trimmedText.length <= maxLength) {
    return trimmedText;
  }

  return trimmedText.substring(0, maxLength - 3) + '...';
};

/**
 * 生成 sitemap 項目
 * @param {Array} pages - 頁面陣列
 * @returns {string} XML 格式的 sitemap
 */
export const generateSitemap = (pages) => {
  const urlSet = pages
    .map(
      (page) => `
    <url>
      <loc>${page.url}</loc>
      <lastmod>${page.lastmod || new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>${page.changefreq || 'weekly'}</changefreq>
      <priority>${page.priority || '0.8'}</priority>
    </url>
  `
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urlSet}
</urlset>`;
};

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
