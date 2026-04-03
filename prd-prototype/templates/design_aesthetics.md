# 原型设计美学指南

> ⚠️ **核心原则**：拒绝通用 AI 审美，追求独特、有辨识度的设计。

---

## 一、字体排版

### ❌ 禁止使用的通用字体

```
绝对不要使用：
- Inter
- Roboto
- Arial
- Helvetica
- 系统默认字体
- Space Grotesk（已泛滥）
```

### ✅ 推荐的独特字体组合

每套组合 = 1个个性标题字体 + 1个精致正文字体

| 风格 | 标题字体 | 正文字体 | 适用场景 | 引入方式 |
|------|----------|----------|----------|----------|
| **现代几何** | Outfit | DM Sans | 科技产品、SaaS | Google Fonts |
| **人文优雅** | Playfair Display | Lora | 高端品牌、文化 | Google Fonts |
| **工业硬朗** | Archivo Black | Work Sans | 制造、物流 | Google Fonts |
| **圆润亲和** | Nunito | M PLUS Rounded 1c | 教育、儿童 | Google Fonts |
| **复古怀旧** | Bebas Neue | Libre Baskerville | 咖啡、酒类 | Google Fonts |
| **日式清新** | Noto Sans JP + Zen Maru Gothic | - | 日系品牌 | Google Fonts |
| **中文雅黑** | Noto Serif SC | Noto Sans SC | 中文内容、文化 | Google Fonts |
| **未来科技** | Orbitron | Exo 2 | 科幻、游戏 | Google Fonts |
| **手写风格** | Caveat | Patrick Hand | 创意、艺术 | Google Fonts |
| **极简现代** | Syne | Manrope | 设计工作室 | Google Fonts |

### 字体引入示例

```html
<!-- Google Fonts 引入 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet">

<style>
  :root {
    --font-heading: 'Outfit', sans-serif;
    --font-body: 'DM Sans', sans-serif;
  }

  h1, h2, h3 { font-family: var(--font-heading); }
  body { font-family: var(--font-body); }
</style>
```

### 字重与字号节奏

```css
/* 避免：均等的字重分布 */
/* 推荐：强烈的字重对比 */

:root {
  /* 字重 - 强对比 */
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-bold: 700;
  --weight-black: 900;  /* 标题用超大字重 */

  /* 字号 - 非线性节奏 */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.25rem;    /* 20px */
  --text-xl: 1.5rem;     /* 24px */
  --text-2xl: 2rem;      /* 32px */
  --text-3xl: 3rem;      /* 48px - 大标题 */
  --text-5xl: 4.5rem;    /* 72px - 特大标题，营造冲击 */
}
```

---

## 二、色彩与主题

### ❌ 禁止的套路配色

```
绝对不要使用：
- 白底 + 紫色渐变（最泛滥的 AI 审美）
- 纯白背景 + 蓝色按钮（过于保守）
- 均匀分布的彩色（缺乏主次）
- Bootstrap 默认蓝 #007bff
```

### ✅ 创意色彩方案

#### 方案1：深色奢华风

```css
:root {
  --bg-primary: #0a0a0f;      /* 深邃黑 */
  --bg-secondary: #141428;    /* 深紫黑 */
  --bg-card: rgba(255, 255, 255, 0.03);
  --text-primary: #ffffff;
  --text-secondary: #a0a0b0;
  --accent: #c9a962;          /* 金色点缀 */
  --accent-secondary: #7c5cff;/* 紫色辅助 */
  --border: rgba(255, 255, 255, 0.08);
}
```

#### 方案2：暖调复古风

```css
:root {
  --bg-primary: #faf7f2;      /* 米白 */
  --bg-secondary: #f0ebe3;    /* 暖灰 */
  --bg-card: #ffffff;
  --text-primary: #2d2a26;    /* 深褐 */
  --text-secondary: #7a756d;
  --accent: #c45c26;          /* 砖红 */
  --accent-secondary: #2b7a78;/* 青绿 */
  --border: #e5dfd4;
}
```

#### 方案3：赛博朋克风

```css
:root {
  --bg-primary: #0d0d1a;
  --bg-secondary: #1a1a2e;
  --bg-card: rgba(0, 255, 136, 0.02);
  --text-primary: #e0e0e0;
  --text-secondary: #8888aa;
  --accent: #00ff88;          /* 荧光绿 */
  --accent-secondary: #ff00aa;/* 洋红 */
  --border: rgba(0, 255, 136, 0.2);

  /* 发光效果 */
  --glow: 0 0 20px var(--accent);
}
```

#### 方案4：清新自然风

```css
:root {
  --bg-primary: #f4f9f4;      /* 薄荷白 */
  --bg-secondary: #e8f5e9;    /* 浅绿 */
  --bg-card: #ffffff;
  --text-primary: #1b4332;    /* 森林绿 */
  --text-secondary: #52796f;
  --accent: #40916c;          /* 翡翠绿 */
  --accent-secondary: #e76f51;/* 珊瑚橙 */
  --border: #d8f3dc;
}
```

#### 方案5：高对比工业风

```css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f8f8;
  --bg-card: #ffffff;
  --text-primary: #000000;
  --text-secondary: #666666;
  --accent: #ff3d00;          /* 鲜红 */
  --accent-secondary: #000000;
  --border: #000000;
  --shadow: 8px 8px 0 #000;   /* 硬阴影 */
}
```

### 色彩使用原则

```css
/* ❌ 错误：平均分布 */
.button-primary { background: var(--accent); }
.button-secondary { background: var(--accent-secondary); }
.button-tertiary { background: var(--accent-tertiary); }

/* ✅ 正确：主次分明 */
/* 主色占 80% 的视觉焦点，点缀色只在关键交互出现 */
.cta-button { background: var(--accent); }  /* 唯一的主色 */
.link { color: var(--accent-secondary); }   /* 少量点缀 */
.body-text { color: var(--text-primary); }  /* 大面积用中性色 */
```

---

## 三、动效设计

### CSS 入场动画

```css
/* 页面入场动画 - 错开延迟 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-in {
  animation: fadeInUp 0.6s ease-out forwards;
}

.animate-delay-1 { animation-delay: 0.1s; }
.animate-delay-2 { animation-delay: 0.2s; }
.animate-delay-3 { animation-delay: 0.3s; }
.animate-delay-4 { animation-delay: 0.4s; }

/* 使用 */
.hero-title { opacity: 0; animation: fadeInUp 0.6s ease-out 0.1s forwards; }
.hero-subtitle { opacity: 0; animation: fadeInUp 0.6s ease-out 0.2s forwards; }
.hero-cta { opacity: 0; animation: fadeInUp 0.6s ease-out 0.3s forwards; }
```

### 悬停微交互

```css
/* 按钮悬停 - 多维度变化 */
.btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 40px -10px var(--accent);
}

/* 卡片悬停 - 边框发光 */
.card {
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.card:hover {
  border-color: var(--accent);
  box-shadow: 0 0 30px -5px var(--accent);
}

/* 链接悬停 - 下划线动画 */
.link {
  position: relative;
}

.link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent);
  transition: width 0.3s ease;
}

.link:hover::after {
  width: 100%;
}
```

### 滚动触发动画

```css
/* 使用 Intersection Observer 触发 */
.scroll-reveal {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.scroll-reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

```js
// 简单的滚动触发实现
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.scroll-reveal').forEach(el => {
  observer.observe(el);
});
```

---

## 四、空间构图

### 非常规布局模式

```css
/* ❌ 避免：标准三栏布局 */
.layout { display: grid; grid-template-columns: 1fr 1fr 1fr; }

/* ✅ 推荐：不对称布局 */
.asymmetric {
  display: grid;
  grid-template-columns: 2fr 1fr;  /* 不等分 */
  gap: 4rem;  /* 大间距 */
}

/* 元素叠加 */
.overlap {
  position: relative;
}

.overlap::before {
  content: '';
  position: absolute;
  top: -20px;
  left: -20px;
  width: 100%;
  height: 100%;
  background: var(--accent);
  z-index: -1;
  opacity: 0.1;
}

/* 斜向分割 */
.diagonal-section {
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
  padding-bottom: 10%;
}

/* 打破网格 */
.break-grid {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
}
```

### 留白与密集

```css
/* 大量留白 - 奢适感 */
.luxury-section {
  padding: 8rem 2rem;
}

.luxury-section h2 {
  margin-bottom: 3rem;
}

/* 可控密集 - 信息丰富 */
.data-dense {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
```

---

## 五、背景与视觉细节

### 渐变背景

```css
/* ❌ 避免：简单双色渐变 */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* ✅ 推荐：多层渐变 + 纹理 */
.gradient-bg {
  background:
    radial-gradient(circle at 20% 80%, rgba(255, 0, 128, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(0, 255, 136, 0.15) 0%, transparent 50%),
    linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 100%);
}

/* 网格渐变 */
.grid-gradient {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}
```

### 杂色纹理

```css
/* 噪点纹理 */
.noise-texture {
  position: relative;
}

.noise-texture::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none;
}
```

### 装饰性边框

```css
/* 渐变边框 */
.gradient-border {
  position: relative;
  background: var(--bg-card);
  border-radius: 16px;
}

.gradient-border::before {
  content: '';
  position: absolute;
  inset: -1px;
  background: linear-gradient(135deg, var(--accent), var(--accent-secondary));
  border-radius: inherit;
  z-index: -1;
  opacity: 0.5;
}

/* 双层边框 */
.double-border {
  border: 1px solid var(--border);
  outline: 1px solid var(--border);
  outline-offset: 4px;
}
```

### 强烈阴影

```css
/* 硬阴影 - 复古印刷感 */
.hard-shadow {
  box-shadow: 8px 8px 0 #000;
}

/* 发光阴影 */
.glow-shadow {
  box-shadow: 0 0 40px -10px var(--accent);
}

/* 多层阴影 */
.multi-shadow {
  box-shadow:
    0 1px 1px rgba(0, 0, 0, 0.08),
    0 2px 2px rgba(0, 0, 0, 0.08),
    0 4px 4px rgba(0, 0, 0, 0.08),
    0 8px 8px rgba(0, 0, 0, 0.08);
}
```

### 自定义光标

```css
/* 自定义光标 */
.custom-cursor {
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='10' fill='none' stroke='%23c9a962' stroke-width='2'/%3E%3C/svg%3E") 12 12, auto;
}

/* 悬停时光标变化 */
.cta-button {
  cursor: url("data:image/svg+xml,...") 12 12, pointer;
}
```

---

## 六、按项目类型推荐

| 项目类型 | 推荐风格 | 字体组合 | 色彩方案 | 特色元素 |
|----------|----------|----------|----------|----------|
| **企业后台** | 工业硬朗 | Archivo + Work Sans | 高对比工业风 | 硬阴影、粗线条 |
| **数据大屏** | 科技现代 | Orbitron + Exo 2 | 赛博朋克风 | 发光效果、网格背景 |
| **电商前台** | 暖调复古 | Noto Serif SC + Noto Sans SC | 暖调复古风 | 大留白、装饰边框 |
| **教育平台** | 圆润亲和 | Nunito + M PLUS | 清新自然风 | 柔和阴影、圆角 |
| **金融系统** | 深色奢华 | Playfair + Lora | 深色奢华风 | 金色点缀、细腻纹理 |
| **社交应用** | 清新活力 | Syne + Manrope | 清新自然风 | 渐变背景、微动效 |

---

## 七、实现复杂度匹配

### 极繁设计（需要复杂代码）

- 多层渐变叠加
- 复杂动画编排
- 自定义光标 + 滚动触发
- SVG 纹理背景
- 颗粒/粒子效果

### 极简设计（需要精准克制）

- 极致的留白
- 精准的字号节奏
- 微妙的阴影层次
- 细腻的过渡动画
- 字重的强对比

---

## 八、检查清单

生成每个页面时，必须检查：

### 排版
- [ ] 是否使用了独特字体（非 Inter/Roboto/Arial）？
- [ ] 标题和正文是否使用了不同字体？
- [ ] 字重是否有强对比（400 vs 700/900）？

### 色彩
- [ ] 是否避免了白底+紫渐变？
- [ ] 是否有明确的主色和点缀色区分？
- [ ] 是否使用了 CSS 变量保证一致性？

### 动效
- [ ] 是否有入场动画（错开延迟）？
- [ ] 是否有悬停微交互？
- [ ] 动画是否使用 cubic-bezier 缓动？

### 布局
- [ ] 是否有非常规布局（非标准三栏）？
- [ ] 是否有元素叠加或不对称设计？
- [ ] 留白是否充足或密集得有节奏？

### 细节
- [ ] 背景是否非纯色？
- [ ] 是否有装饰性元素（边框/阴影/纹理）？
- [ ] 整体风格是否独特、有辨识度？