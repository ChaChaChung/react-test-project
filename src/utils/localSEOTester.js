// 本地 SEO 檢測工具

/**
 * 在瀏覽器控制台中運行的 SEO 檢測函數
 * 使用方法：在瀏覽器控制台輸入 window.checkSEO()
 */
export const createSEOTester = () => {
  // 將檢測函數掛載到 window 對象
  window.checkSEO = () => {
    console.log('🔍 開始檢測 SEO 狀態...\n');
    
    const results = {
      基本Meta標籤: {},
      OpenGraph: {},
      TwitterCard: {},
      結構化數據: {},
      技術SEO: {},
      圖片優化: {},
      建議: []
    };

    // 檢測基本 Meta 標籤
    const title = document.querySelector('title');
    const description = document.querySelector('meta[name="description"]');
    const keywords = document.querySelector('meta[name="keywords"]');
    const robots = document.querySelector('meta[name="robots"]');

    results.基本Meta標籤.標題 = title ? {
      內容: title.textContent,
      長度: title.textContent.length,
      狀態: title.textContent.length >= 30 && title.textContent.length <= 60 ? '✅ 良好' : 
            title.textContent.length < 30 ? '⚠️ 太短' : '❌ 太長'
    } : '❌ 缺少';

    results.基本Meta標籤.描述 = description ? {
      內容: description.content,
      長度: description.content.length,
      狀態: description.content.length >= 120 && description.content.length <= 160 ? '✅ 良好' : 
            description.content.length < 120 ? '⚠️ 太短' : '❌ 太長'
    } : '❌ 缺少';

    results.基本Meta標籤.關鍵字 = keywords ? keywords.content : '⚠️ 未設置';
    results.基本Meta標籤.Robots = robots ? robots.content : '⚠️ 未設置';

    // 檢測 Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogImage = document.querySelector('meta[property="og:image"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');

    results.OpenGraph.標題 = ogTitle ? '✅ ' + ogTitle.content : '❌ 缺少';
    results.OpenGraph.描述 = ogDescription ? '✅ ' + ogDescription.content : '❌ 缺少';
    results.OpenGraph.圖片 = ogImage ? '✅ ' + ogImage.content : '❌ 缺少';
    results.OpenGraph.URL = ogUrl ? '✅ ' + ogUrl.content : '❌ 缺少';

    // 檢測 Twitter Card
    const twitterCard = document.querySelector('meta[name="twitter:card"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');

    results.TwitterCard.卡片類型 = twitterCard ? '✅ ' + twitterCard.content : '❌ 缺少';
    results.TwitterCard.標題 = twitterTitle ? '✅ ' + twitterTitle.content : '❌ 缺少';
    results.TwitterCard.描述 = twitterDescription ? '✅ ' + twitterDescription.content : '❌ 缺少';

    // 檢測結構化數據
    const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
    results.結構化數據.數量 = jsonLdScripts.length;
    results.結構化數據.內容 = Array.from(jsonLdScripts).map(script => {
      try {
        return JSON.parse(script.textContent);
      } catch (e) {
        return '❌ JSON 格式錯誤';
      }
    });

    // 檢測技術 SEO
    const canonical = document.querySelector('link[rel="canonical"]');
    const viewport = document.querySelector('meta[name="viewport"]');
    const lang = document.documentElement.lang;

    results.技術SEO.Canonical = canonical ? '✅ ' + canonical.href : '❌ 缺少';
    results.技術SEO.Viewport = viewport ? '✅ ' + viewport.content : '❌ 缺少';
    results.技術SEO.語言設定 = lang ? '✅ ' + lang : '❌ 缺少';

    // 檢測圖片 Alt 屬性
    const images = document.querySelectorAll('img');
    const imagesWithoutAlt = Array.from(images).filter(img => !img.alt);
    results.圖片優化.總圖片數 = images.length;
    results.圖片優化.缺少Alt的圖片 = imagesWithoutAlt.length;
    results.圖片優化.狀態 = imagesWithoutAlt.length === 0 ? '✅ 良好' : `❌ ${imagesWithoutAlt.length} 張圖片缺少 Alt`;

    // 生成建議
    if (results.基本Meta標籤.標題 === '❌ 缺少') {
      results.建議.push('添加頁面標題');
    }
    if (results.基本Meta標籤.描述 === '❌ 缺少') {
      results.建議.push('添加頁面描述');
    }
    if (results.OpenGraph.圖片 === '❌ 缺少') {
      results.建議.push('添加 Open Graph 圖片');
    }
    if (results.圖片優化.缺少Alt的圖片 > 0) {
      results.建議.push('為所有圖片添加 Alt 屬性');
    }

    // 輸出結果
    console.table(results.基本Meta標籤);
    console.table(results.OpenGraph);
    console.table(results.TwitterCard);
    console.log('📊 結構化數據:', results.結構化數據);
    console.table(results.技術SEO);
    console.table(results.圖片優化);
    
    if (results.建議.length > 0) {
      console.log('💡 改進建議:');
      results.建議.forEach((suggestion, index) => {
        console.log(`${index + 1}. ${suggestion}`);
      });
    } else {
      console.log('🎉 SEO 設置良好！');
    }

    return results;
  };

  // 檢測頁面性能
  window.checkPerformance = () => {
    if ('performance' in window) {
      const perfData = performance.getEntriesByType('navigation')[0];
      console.log('⚡ 頁面性能數據:');
      console.log(`載入時間: ${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`);
      console.log(`DOM 解析時間: ${Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart)}ms`);
      console.log(`首次渲染時間: ${Math.round(perfData.responseEnd - perfData.requestStart)}ms`);
    }
  };

  console.log('🛠️ SEO 檢測工具已載入！');
  console.log('使用 checkSEO() 檢測 SEO 狀態');
  console.log('使用 checkPerformance() 檢測頁面性能');
};

/**
 * 檢測當前頁面的 SEO 分數
 */
export const calculateSEOScore = () => {
  let score = 0;
  const checks = [];

  // 基本檢測項目
  const title = document.querySelector('title');
  if (title && title.textContent.length >= 30 && title.textContent.length <= 60) {
    score += 20;
    checks.push({ item: '標題長度', status: '✅', points: 20 });
  } else {
    checks.push({ item: '標題長度', status: '❌', points: 0 });
  }

  const description = document.querySelector('meta[name="description"]');
  if (description && description.content.length >= 120 && description.content.length <= 160) {
    score += 20;
    checks.push({ item: '描述長度', status: '✅', points: 20 });
  } else {
    checks.push({ item: '描述長度', status: '❌', points: 0 });
  }

  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) {
    score += 15;
    checks.push({ item: 'Open Graph 圖片', status: '✅', points: 15 });
  } else {
    checks.push({ item: 'Open Graph 圖片', status: '❌', points: 0 });
  }

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    score += 10;
    checks.push({ item: 'Canonical URL', status: '✅', points: 10 });
  } else {
    checks.push({ item: 'Canonical URL', status: '❌', points: 0 });
  }

  const jsonLd = document.querySelectorAll('script[type="application/ld+json"]');
  if (jsonLd.length > 0) {
    score += 15;
    checks.push({ item: '結構化數據', status: '✅', points: 15 });
  } else {
    checks.push({ item: '結構化數據', status: '❌', points: 0 });
  }

  const images = document.querySelectorAll('img');
  const imagesWithAlt = Array.from(images).filter(img => img.alt);
  if (images.length === 0 || imagesWithAlt.length === images.length) {
    score += 10;
    checks.push({ item: '圖片 Alt 屬性', status: '✅', points: 10 });
  } else {
    checks.push({ item: '圖片 Alt 屬性', status: '❌', points: 0 });
  }

  const lang = document.documentElement.lang;
  if (lang) {
    score += 10;
    checks.push({ item: '語言設定', status: '✅', points: 10 });
  } else {
    checks.push({ item: '語言設定', status: '❌', points: 0 });
  }

  return { score, maxScore: 100, checks, grade: getGrade(score) };
};

const getGrade = (score) => {
  if (score >= 90) return 'A+';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  return 'D';
};
