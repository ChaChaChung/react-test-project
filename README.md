# React SEO 專案

一個使用 React + Vite 建立的現代化網站，具有優秀的 SEO 優化功能和美觀的使用者介面。

## 🚀 特色功能

- ⚡ **快速開發體驗** - 使用 Vite 構建工具
- 🎨 **現代化 UI 設計** - 響應式設計，完美適配各種設備
- 🔧 **開發工具整合** - ESLint + Prettier 程式碼格式化
- 📱 **SEO 友好** - 優化的結構和元標籤
- 🌐 **國際化支援** - 中文界面設計

## 📦 技術棧

- **前端框架**: React 19.1.1
- **構建工具**: Vite 7.1.2
- **路由**: React Router DOM
- **程式碼品質**: ESLint + Prettier
- **樣式**: CSS3 + Flexbox/Grid

## 🛠️ 安裝與使用

### 環境需求

- Node.js >= 20.19.0
- npm >= 10.0.0

### 安裝步驟

1. **複製專案**

   ```bash
   git clone <your-repo-url>
   cd react-seo
   ```

2. **安裝依賴**

   ```bash
   npm install
   ```

3. **啟動開發伺服器**

   ```bash
   npm run dev
   ```

4. **開啟瀏覽器訪問**
   ```
   http://localhost:5173
   ```

## 📜 可用指令

```bash
# 開發模式
npm run dev

# 建置生產版本
npm run build

# 預覽生產版本
npm run preview

# 程式碼檢查
npm run lint

# 程式碼格式化
npm run format
```

## 📁 專案結構

```
src/
├── components/          # 可重用元件
│   ├── Header.jsx      # 網站標頭
│   ├── Header.css
│   ├── Footer.jsx      # 網站頁尾
│   └── Footer.css
├── pages/              # 頁面元件
│   ├── Home.jsx        # 首頁
│   └── Home.css
├── hooks/              # 自定義 Hooks
├── utils/              # 工具函數
├── assets/             # 靜態資源
├── App.jsx             # 主應用元件
├── App.css
├── main.jsx            # 應用入口點
└── index.css           # 全域樣式
```

## 🎨 設計系統

### 色彩配置

- **主色調**: #667eea → #764ba2 (漸層)
- **輔助色**: #f39c12 (橙色按鈕)
- **文字色**: #2c3e50 (深灰)
- **背景色**: #f8f9fa (淺灰)

### 字體

- 主字體: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif

## 🚀 部署

### 建置專案

```bash
npm run build
```

建置後的檔案將存放在 `dist/` 目錄中，可以直接部署到任何靜態網站託管服務。

### 推薦的託管平台

- [Vercel](https://vercel.com/)
- [Netlify](https://netlify.com/)
- [GitHub Pages](https://pages.github.com/)

## 🤝 貢獻

歡迎提交 Issues 和 Pull Requests 來改善這個專案！

## 📄 授權

此專案採用 MIT 授權條款 - 查看 [LICENSE](LICENSE) 檔案了解詳情。

## 🆘 需要幫助？

如果您遇到任何問題，請：

1. 查看 [常見問題](#)
2. 搜尋現有的 [Issues](../../issues)
3. 建立新的 [Issue](../../issues/new)

---

⭐ 如果這個專案對您有幫助，請給我們一個 Star！
