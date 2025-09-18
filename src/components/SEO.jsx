import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title,
  description,
  keywords,
  image = '/vite.svg',
  url = window.location.href,
  type = 'website',
  siteName = 'React SEO',
  locale = 'zh_TW',
  twitterCard = 'summary_large_image',
  author = 'React SEO Team',
}) => {
  // 使用傳入的資料，如果沒有則使用預設值
  const defaultTitle = 'React SEO - 現代化網站開發 - 測試 SEO 檢查工具';
  const defaultDescription = '一個使用 React + Vite 建立的現代化網站，具有優秀的 SEO 優化功能';
  const defaultKeywords = 'React, Vite, SEO, 網站開發, 前端';
  
  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  // 確保標題不超過 60 個字符
  const formattedTitle =
    finalTitle.length > 60 ? finalTitle.substring(0, 57) + '...' : finalTitle;

  // 確保描述不超過 160 個字符
  const formattedDescription =
    finalDescription.length > 160
      ? finalDescription.substring(0, 157) + '...'
      : finalDescription;

  return (
    <Helmet>
      {/* 基本 Meta 標籤 */}
      <title>{formattedTitle}</title>
      <meta name="description" content={formattedDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="zh-TW" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph Meta 標籤 (Facebook) */}
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={formattedDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />

      {/* Twitter Card Meta 標籤 */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={formattedDescription} />
      <meta name="twitter:image" content={image} />

      {/* 額外的 SEO 標籤 */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="format-detection" content="telephone=no" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Favicon */}
      <link rel="icon" href="/vite.svg" />
      <link rel="apple-touch-icon" href="/vite.svg" />

      {/* 結構化數據 - 網站資訊 */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: siteName,
          description: formattedDescription,
          url: url,
          author: {
            '@type': 'Organization',
            name: author,
          },
          inLanguage: 'zh-TW',
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
