# generate 命令 - 生成交互原型

## 功能说明

从 PRD 文档生成交互式多页面原型。

## ⚠️ 重要：必须与用户交互

**禁止跳过以下步骤，必须逐一与用户确认：**

1. ✅ 步骤 1：确认产物路径 - 必须询问用户是否确认
2. ✅ 步骤 4：确定主题色和风格 - 必须展示推荐并询问用户选择
3. ✅ 步骤 5：选择技术栈 - 必须询问用户选择哪个技术栈
4. ✅ 步骤 6：页面规划确认 - 必须展示页面契约并询问用户确认

**如果用户没有明确选择，必须停下来询问，不能自动推进流程。**

---

## 🛡️ 三阶段质量保障机制

本命令采用三阶段质量保障，确保原型完整性和正确性：

```
┌─────────────────────────────────────────────────────────────┐
│  阶段1: 规划锁定（步骤 3-6）                                  │
│  ├── 步骤 3: 分析 PRD，生成页面规划                           │
│  ├── 步骤 4: 生成设计体系                                     │
│  ├── 步骤 5: 选择技术栈                                      │
│  └── 步骤 6: 生成 pages.json 页面契约，用户确认锁定            │
├─────────────────────────────────────────────────────────────┤
│  阶段2: 按序生成 + 即时验证（步骤 7）                          │
│  ├── 读取 pages.json 作为生成队列                             │
│  ├── 每个页面生成前: 验证引用链接的合法性                       │
│  ├── 每个页面生成后: 页面完整性自检                            │
│  └── 不合格则重试（最多2次）                                  │
├─────────────────────────────────────────────────────────────┤
│  阶段3: 最终完整性检查（步骤 8）                               │
│  ├── 页面清单核对: pages.json vs 实际文件                     │
│  ├── 链接有效性检查: href 目标是否存在                        │
│  ├── 导航一致性检查: 侧边栏菜单是否匹配                        │
│  ├── 内容完整性检查: 表格数据、弹窗实现                        │
│  └── 输出检查报告                                            │
└─────────────────────────────────────────────────────────────┘
```

---

## 工作流程

### 步骤 1：检查 PRD 文档并确定产物路径

检查项目目录下是否存在 PRD 文档：
- `prd/main_prd.md` - 主 PRD 文档
- `prd/modules/` - 模块 PRD 目录

**产物路径规则**：
```
PRD 文档位置        → 原型产物位置
prd/                → prd/prototype/
```

**如果没有 PRD 文档**：
> ⚠️ 未找到 PRD 文档。请先使用 `/prd-suite` 技能创建 PRD 文档。

**⚠️ 必须询问用户确认**：
```
📂 检测到 PRD 文档位置：prd/
📂 原型将生成到：prd/prototype/

确认生成原型？[确认/取消]
```

> **注意**：如果 `prd/prototype/` 目录已存在，会询问是否覆盖。

### 步骤 2：读取并分析 PRD

读取主 PRD 和相关模块 PRD，提取以下信息：

1. **功能模块清单** → 主要页面列表
2. **业务流程** → 页面跳转关系
3. **用户角色** → 权限和导航菜单
4. **详细功能需求** → 页面元素

### 步骤 3：生成页面规划

基于 PRD 分析，生成页面规划文档。

## ⚠️ 核心原则（必须遵守）

### 原则一：一个功能模块 = 一个页面

**禁止过度拆分**：新增、编辑、详情、删除等操作都在同一个页面内通过弹窗完成，不要生成独立页面。

```
❌ 错误做法（过度拆分）：
用户管理模块生成 5 个页面：
- user-list.html      (列表)
- user-add.html       (新增)
- user-edit.html      (编辑)
- user-detail.html    (详情)
- user-delete.html    (删除确认)

✅ 正确做法（模块合一）：
用户管理模块生成 1 个页面：
- user-management.html  (列表 + 弹窗实现新增/编辑/详情/删除)
```

### 原则二：弹窗优先

**页面内交互用弹窗**：所有 CRUD 操作都通过弹窗（Modal）完成，不跳转页面。

| 操作 | 实现方式 | 示例 |
|------|----------|------|
| 新增 | 弹窗表单 | 点击"新增"按钮 → 打开弹窗填写表单 |
| 编辑 | 弹窗表单 | 点击"编辑"按钮 → 打开弹窗编辑数据 |
| 详情 | 弹窗/抽屉 | 点击"查看"按钮 → 打开弹窗展示详情 |
| 删除 | 确认弹窗 | 点击"删除"按钮 → 弹窗确认后执行 |
| 筛选 | 弹窗/侧边栏 | 点击"筛选"按钮 → 弹窗选择条件 |

### 原则三：完整导航结构

**每个页面必须包含**：
- Logo（点击返回首页/dashboard）
- 侧边栏导航菜单（所有模块入口）
- 顶部导航栏（用户信息、通知等）
- 面包屑导航

### 原则四：页面内容必须完整

**禁止偷懒**：
- ❌ 不得使用 alert()、confirm()、prompt()
- ❌ 不得使用占位文字（"此处显示表格"）
- ❌ 不得生成空白或骨架页面
- ✅ 必须生成完整的 UI 组件
- ✅ 表格必须有表头 + 至少 3 条数据
- ✅ 表单必须有完整字段

---

## 页面规划示例

```
页面规划：

1. 首页/登录页 (index.html)
   - 功能：用户登录
   - 跳转：登录成功 → dashboard.html
   - 元素：完整登录表单

2. 仪表盘 (dashboard.html)
   - 功能：数据概览、快捷入口
   - 跳转：点击模块卡片 → 对应模块页面
   - 元素：统计卡片、快捷入口、侧边栏导航
   - 导航：Logo 点击返回首页

3. 用户管理 (user-management.html) ← 一个页面包含所有操作
   - 功能：用户列表、新增、编辑、查看详情、删除、搜索、筛选
   - 弹窗：
     - 新增用户弹窗（完整表单）
     - 编辑用户弹窗（完整表单，带默认值）
     - 用户详情弹窗/抽屉（完整信息展示）
     - 删除确认弹窗
   - 元素：表格（含操作列）、搜索框、筛选按钮、新增按钮
   - 导航：Logo 点击返回 dashboard，侧边栏菜单

4. 订单管理 (order-management.html)
   - 功能：订单列表、查看详情、取消订单、导出
   - 弹窗：
     - 订单详情弹窗/抽屉
     - 取消订单确认弹窗
   - 元素：表格、筛选条件、导出按钮
   - 导航：完整导航结构

5. 系统设置 (settings.html)
   - 功能：基础设置、通知设置、安全设置
   - 弹窗：按需
   - 元素：Tab 切换 + 设置表单
   - 导航：完整导航结构
```

---

## 页面数量对照

| PRD 功能模块 | 生成页面数 | 实现方式 |
|-------------|-----------|----------|
| 用户管理 | 1 个 | user-management.html（列表 + 弹窗） |
| 订单管理 | 1 个 | order-management.html（列表 + 弹窗/抽屉） |
| 商品管理 | 1 个 | product-management.html（列表 + 弹窗） |
| 数据统计 | 1 个 | statistics.html（图表 + 筛选） |
| 系统设置 | 1 个 | settings.html（Tab 切换） |

**不要生成的页面**：
- ❌ xxx-add.html
- ❌ xxx-edit.html
- ❌ xxx-detail.html
- ❌ xxx-delete.html
- ❌ xxx-confirm.html

---

### 步骤 4：生成设计体系

**⚠️ 必须展示给用户确认，不能自动跳过！**

根据 PRD 内容分析项目类型，自动生成完整的设计体系，展示给用户确认。

**🎨 核心美学原则**：

```
┌─────────────────────────────────────────────────────────────┐
│  ❌ 绝对禁止：通用 AI 审美                                    │
│  ├── 字体：Inter、Roboto、Arial、系统默认                    │
│  ├── 配色：白底紫渐变、Bootstrap 蓝                          │
│  ├── 布局：标准三栏、对称网格                                │
│  └── 风格：模板化、缺乏特色                                  │
├─────────────────────────────────────────────────────────────┤
│  ✅ 必须追求：独特、有辨识度的设计                            │
│  ├── 字体：个性标题 + 精致正文，强字重对比                   │
│  ├── 配色：主色突出、点缀鲜明，避免平均分布                  │
│  ├── 布局：不对称、叠加、打破网格                            │
│  └── 细节：渐变背景、装饰边框、强烈阴影                      │
└─────────────────────────────────────────────────────────────┘
```

详细美学指南见：[templates/design_aesthetics.md](templates/design_aesthetics.md)

#### 4.1 分析项目类型

根据 PRD 中的项目描述、功能模块、目标用户等信息，判断项目类型：

| 项目类型 | 特征关键词 | 推荐风格 | 字体组合 | 色彩方案 |
|---------|-----------|----------|----------|----------|
| **企业后台** | ERP、CRM、OA、后台管理 | 工业硬朗 | Archivo Black + Work Sans | 高对比工业风 |
| **数据大屏** | 报表、监控、统计分析 | 科技现代 | Orbitron + Exo 2 | 赛博朋克风 |
| **电商平台** | 商品、订单、购物车 | 暖调复古 | Playfair + Lora | 暖调复古风 |
| **金融系统** | 银行、理财、交易 | 深色奢华 | Playfair + Lora | 深色奢华风 |
| **教育平台** | 课程、学习、培训 | 圆润亲和 | Nunito + M PLUS | 清新自然风 |
| **社交应用** | 聊天、动态、社区 | 清新活力 | Syne + Manrope | 清新自然风 |
| **医疗健康** | 医院、预约、问诊 | 专业清新 | Outfit + DM Sans | 清新自然风 |

#### 4.2 自动生成设计体系

根据项目类型自动生成完整设计体系，包含五大核心模块：

**一、字体排版体系**

| 参数 | 说明 | 示例 |
|------|------|------|
| 标题字体 | 个性、有辨识度 | Outfit (800/900 字重) |
| 正文字体 | 精致、易读 | DM Sans (400/500) |
| 字重对比 | 强烈对比 | 标题 900 vs 正文 400 |
| 字号节奏 | 非线性层级 | 12/14/16/20/32/48/72 |

**字体引入（Google Fonts）**：
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800;900&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet">
```

**二、色彩体系**

使用 CSS 变量定义，确保一致性：

```css
:root {
  /* 背景 */
  --bg-primary: #faf7f2;        /* 主背景 */
  --bg-secondary: #f0ebe3;      /* 次背景 */
  --bg-card: #ffffff;           /* 卡片背景 */

  /* 文字 */
  --text-primary: #2d2a26;      /* 主文字 */
  --text-secondary: #7a756d;    /* 次文字 */

  /* 主色 - 占 80% 视觉焦点 */
  --accent: #c45c26;            /* 砖红 */
  --accent-hover: #d46a32;

  /* 点缀色 - 仅在关键交互使用 */
  --accent-secondary: #2b7a78;  /* 青绿 */

  /* 功能色 */
  --success: #40916c;
  --warning: #e76f51;
  --error: #c1121f;

  /* 边框与阴影 */
  --border: #e5dfd4;
  --shadow-color: rgba(45, 42, 38, 0.1);
}
```

**三、动效体系**

| 类型 | 用途 | 实现方式 |
|------|------|----------|
| 入场动画 | 页面/元素入场 | CSS keyframes + 错开延迟 |
| 悬停效果 | 按钮交互 | transform + box-shadow |
| 过渡动画 | 状态变化 | transition + cubic-bezier |
| 滚动触发 | 区域进入视野 | Intersection Observer |

**核心动画代码**：
```css
/* 入场动画 */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-in {
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
}
.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.3s; }

/* 悬停效果 */
.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 40px -10px var(--accent);
}
```

**四、空间构图**

| 原则 | 说明 | 示例 |
|------|------|------|
| 不对称 | 非等分布局 | grid-template-columns: 2fr 1fr |
| 元素叠加 | 创造层次 | position + z-index + 负 margin |
| 大留白 | 奢适感 | padding: 8rem 2rem |
| 打破网格 | 跨越容器 | width: 100vw + 负 margin |

**五、视觉细节**

| 元素 | 用途 | 实现方式 |
|------|------|----------|
| 渐变背景 | 营造氛围 | radial-gradient 多层叠加 |
| 杂色纹理 | 增加质感 | SVG feTurbulence |
| 装饰边框 | 强调边界 | 渐变边框 / 双层边框 |
| 强烈阴影 | 视觉冲击 | 硬阴影 / 发光阴影 |

#### 4.3 展示设计体系并确认

**⚠️ 必须展示完整设计体系，等待用户确认！**

```
📊 分析 PRD 内容...

项目类型：企业管理系统（后台管理）
识别关键词：用户管理、权限管理、数据统计、系统设置

🎨 自动生成设计体系：

═══════════════════════════════════════════════════════════

【字体排版】工业硬朗风格
├── 标题字体：Archivo Black（900 字重，强烈的工业感）
├── 正文字体：Work Sans（400/500，清晰易读）
├── 字号节奏：12/14/16/20/32/48（非线性层级）
└── 引入方式：Google Fonts

【色彩体系】高对比工业风
├── 背景：纯白 #ffffff / 浅灰 #f8f8f8
├── 文字：纯黑 #000000 / 灰色 #666666
├── 主色：鲜红 #ff3d00（强调行动）
├── 点缀：纯黑 #000000（边框/阴影）
└── 特效：硬阴影 8px 8px 0 #000

【动效设计】
├── 入场：fadeInUp 0.6s + 错开延迟
├── 悬停：translateY(-2px) + 阴影扩散
└── 缓动：cubic-bezier(0.4, 0, 0.2, 1)

【空间构图】
├── 布局：不对称 2:1 分割
├── 留白：大间距 4rem+
└── 特色：硬边阴影、粗线条边框

【视觉细节】
├── 背景：纯色 + 网格线纹理
├── 边框：1px 黑色实线
├── 阴影：硬阴影 8px 8px 0
└── 圆角：无（方正锐利）

═══════════════════════════════════════════════════════════

请确认设计方案：

1. ✅ 确认使用以上设计
2. 🎨 切换设计风格（当前：工业硬朗）
3. 🔄 重新生成设计体系
4. ❌ 取消操作
```

#### 4.4 用户修改选项

**选项 2：切换设计风格**

```
请选择设计风格：

1. 工业硬朗（当前）- 粗犷线条、硬阴影、高对比，适合企业后台
2. 科技现代 - 发光效果、渐变背景、赛博朋克，适合数据大屏
3. 暖调复古 - 米白背景、砖红点缀、装饰边框，适合电商平台
4. 深色奢华 - 深邃黑底、金色点缀、细腻纹理，适合金融系统
5. 清新自然 - 薄荷绿调、柔和阴影、圆润边角，适合教育医疗
6. 圆润亲和 - 大圆角、彩色阴影、活泼配色，适合社交应用

请输入选项数字：
```

用户选择后，**重新生成完整设计体系**（字体+色彩+动效+细节），再次展示确认。

**选项 3：重新生成**

当用户对当前设计不满意时，重新分析项目特征，生成不同的设计方案。

**注意**：每次重新生成应产出**截然不同**的风格，避免微小调整。

#### 4.5 确认后保存设计体系

用户确认后，将设计体系保存到以下位置：

1. `pages.json` 的 `design_system` 字段
2. 内存变量中，供后续页面生成使用

---

### 步骤 5：选择技术栈

**⚠️ 必须使用 AskUserQuestion 工具询问用户选择！**

询问用户选择原型技术栈：

```
请选择原型技术栈：

1. HTML + Tailwind CSS - 快速、轻量、无需构建
2. React + shadcn/ui + Tailwind - 现代化组件、美观实用

请输入选项数字（1/2）：
```

| 选项 | 技术栈 | 特点 |
|------|--------|------|
| 1 | **HTML + Tailwind CSS** | 快速、轻量、无需构建 |
| 2 | **React + shadcn/ui + Tailwind** | 现代化组件、美观实用、高度可定制 |

---

## 🎨 统一使用 Lucide 图标

**所有技术栈统一使用 Lucide 图标库**，保持视觉一致性。

### Lucide 图标 CDN

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
```

### 常用图标名称对照表

| 场景 | Lucide 图标名 | 用途 |
|------|--------------|------|
| 首页 | `home` | 面包屑、返回首页 |
| 仪表盘 | `layout-dashboard` | 仪表盘菜单 |
| 用户 | `users` | 用户管理菜单 |
| 订单 | `shopping-bag` | 订单管理菜单 |
| 设置 | `settings` | 系统设置菜单 |
| 新增 | `plus` | 新增按钮 |
| 编辑 | `pencil` | 编辑按钮 |
| 删除 | `trash-2` | 删除按钮 |
| 查看 | `eye` | 查看详情按钮 |
| 搜索 | `search` | 搜索按钮 |
| 通知 | `bell` | 通知图标 |
| 用户头像 | `user` | 用户头像 |
| Logo | `box` | 项目 Logo |

---

### 步骤 6：生成页面契约（pages.json）

**⚠️ 这是质量保障的关键步骤，必须生成 pages.json 并让用户确认！**

#### 6.1 页面契约的作用

`pages.json` 是原型生成的"契约文件"，用于：

1. **锁定页面清单** - 明确要生成哪些页面，防止遗漏或过度生成
2. **定义导航菜单** - 统一侧边栏导航项，保证一致性
3. **约束链接目标** - 所有链接必须指向契约中的有效页面
4. **支持即时验证** - 生成过程中可验证页面完整性
5. **支持最终检查** - 检查所有契约页面是否已生成

#### 6.2 生成 pages.json

根据步骤 3 的页面规划，生成 `prd/prototype/pages.json` 文件：

```json
{
  "version": "1.0",
  "created_at": "2026-04-03T14:00:00",
  "prototype_dir": "prd/prototype/",
  "project_name": "用户管理系统",

  "pages": [
    {
      "file": "index.html",
      "title": "登录页",
      "module": "登录",
      "features": ["用户登录", "记住密码"],
      "modals": [],
      "links_to": ["dashboard.html"],
      "requireNav": false,
      "status": "pending"
    },
    {
      "file": "dashboard.html",
      "title": "仪表盘",
      "module": "仪表盘",
      "features": ["数据概览", "快捷入口", "统计卡片"],
      "modals": [],
      "links_to": ["user-management.html", "order-management.html"],
      "requireNav": true,
      "status": "pending"
    },
    {
      "file": "user-management.html",
      "title": "用户管理",
      "module": "用户管理",
      "features": ["用户列表", "新增", "编辑", "详情", "删除", "搜索"],
      "modals": ["新增用户弹窗", "编辑用户弹窗", "用户详情弹窗", "删除确认弹窗"],
      "links_to": ["dashboard.html"],
      "requireNav": true,
      "status": "pending"
    }
  ],

  "nav_items": [
    { "label": "仪表盘", "href": "dashboard.html", "icon": "layout-dashboard" },
    { "label": "用户管理", "href": "user-management.html", "icon": "users" },
    { "label": "订单管理", "href": "order-management.html", "icon": "shopping-bag" },
    { "label": "系统设置", "href": "settings.html", "icon": "settings" }
  ],

  "design_system": {
    "style": "商务简约",
    "primary_color": "#1890ff",
    "tech_stack": "html-tailwind"
  },

  "validation_rules": {
    "nav_required": ["Logo", "侧边栏菜单", "顶部导航", "面包屑"],
    "table_min_rows": 3,
    "forbidden_elements": ["alert()", "confirm()", "prompt()"],
    "forbidden_patterns": ["此处显示", "TODO", "待实现"]
  }
}
```

#### 6.3 pages.json 字段说明

| 字段 | 说明 | 用途 |
|------|------|------|
| `pages[].file` | 页面文件名 | 生成和验证的目标文件 |
| `pages[].title` | 页面标题 | 面包屑和页面标题 |
| `pages[].module` | 对应的PRD模块 | 内容来源 |
| `pages[].features` | 页面功能列表 | 生成内容参考 |
| `pages[].modals` | 需要的弹窗列表 | 完整性检查 |
| `pages[].links_to` | 该页面链接的目标页面 | 链接有效性检查 |
| `pages[].requireNav` | 是否需要完整导航 | 登录页可设为 false |
| `pages[].status` | 生成状态 | pending/done/error |
| `nav_items` | 侧边栏导航菜单 | 所有页面统一使用 |

#### 6.4 展示页面契约并确认

**⚠️ 必须展示完整的 pages.json 内容，等待用户确认！**

```
📋 已生成页面契约（pages.json）：

【页面清单】共 5 个页面
┌────────────────────────────────────────────────────┐
│ 序号 │ 文件名                  │ 标题       │ 弹窗数 │
├────────────────────────────────────────────────────┤
│  1   │ index.html              │ 登录页     │   0   │
│  2   │ dashboard.html          │ 仪表盘     │   0   │
│  3   │ user-management.html    │ 用户管理   │   4   │
│  4   │ order-management.html   │ 订单管理   │   2   │
│  5   │ settings.html           │ 系统设置   │   0   │
└────────────────────────────────────────────────────┘

【导航菜单】共 4 个入口
  仪表盘 → dashboard.html
  用户管理 → user-management.html
  订单管理 → order-management.html
  系统设置 → settings.html

【设计体系】
  风格：商务简约
  主色：#1890ff
  技术栈：HTML + Tailwind CSS

─────────────────────────

请确认页面契约：

1. ✅ 确认，开始生成原型
2. ✏️ 修改页面列表
3. ✏️ 修改导航菜单
4. ❌ 取消操作
```

**用户确认后，pages.json 被锁定，后续生成必须严格遵循契约内容。**

---

### 步骤 7：创建项目目录

创建原型项目目录结构（**所有页面平铺，无子目录**）：

```
prd/prototype/                # 原型目录（固定路径）
├── pages.json              # 页面契约文件（已生成）
├── index.html              # 首页/登录页
├── dashboard.html          # 仪表盘
├── user-management.html    # 用户管理页面
├── order-management.html   # 订单管理页面
├── settings.html           # 系统设置页面
└── ...                     # 其他功能模块页面
```

> **⚠️ 重要**：所有页面都直接放在 `prd/prototype/` 目录下，不要创建 `pages/` 子目录。

---

## ⚠️ 页面跳转规则（重要）

### 简单规则：所有页面同级，直接写文件名

由于所有页面都在同一目录下，跳转链接非常简单：

```html
<!-- 从任何页面跳转到其他页面，直接写文件名 -->
<a href="dashboard.html">仪表盘</a>
<a href="user-management.html">用户管理</a>
<a href="order-management.html">订单管理</a>
<a href="settings.html">系统设置</a>

<!-- 登录页跳转到仪表盘 -->
<form action="dashboard.html">
<!-- 或 -->
<a href="dashboard.html">登录</a>
```

### 链接写法对照表

| 当前页面 | 目标页面 | 链接写法 |
|---------|---------|---------|
| index.html | dashboard.html | `href="dashboard.html"` |
| index.html | user-management.html | `href="user-management.html"` |
| dashboard.html | user-management.html | `href="user-management.html"` |
| user-management.html | dashboard.html | `href="dashboard.html"` |
| user-management.html | settings.html | `href="settings.html"` |

### ❌ 常见错误

```html
<!-- ❌ 错误：不要加 pages/ 前缀 -->
<a href="pages/user-management.html">用户管理</a>

<!-- ❌ 错误：不要用 ../ 返回上级 -->
<a href="../dashboard.html">返回</a>

<!-- ✅ 正确：直接写文件名 -->
<a href="user-management.html">用户管理</a>
<a href="dashboard.html">返回</a>
```

---

### 步骤 8：按队列生成页面内容

**⚠️ 必须严格按照 pages.json 中的页面列表顺序生成！**

#### 8.1 读取页面契约队列

从 `prd/prototype/pages.json` 读取页面列表，作为生成队列：

```javascript
// 示例 pages.json 结构
{
  "pages": [
    { "file": "index.html", "title": "登录页", "status": "pending" },
    { "file": "dashboard.html", "title": "仪表盘", "status": "pending" },
    { "file": "user-management.html", "title": "用户管理", "status": "pending" }
  ],
  "nav_items": [
    { "label": "仪表盘", "href": "dashboard.html", "icon": "layout-dashboard" },
    { "label": "用户管理", "href": "user-management.html", "icon": "users" }
  ]
}
```

#### 8.2 页面生成流程（每个页面）

```
┌─────────────────────────────────────────┐
│           页面生成流程                    │
├─────────────────────────────────────────┤
│  1. 预检查                               │
│     ├── 验证页面文件名在 pages.json 中    │
│     └── 收集该页面的 links_to 目标列表    │
├─────────────────────────────────────────┤
│  2. 生成页面内容                         │
│     ├── 填充模板变量                     │
│     ├── 生成完整导航结构                 │
│     ├── 生成主内容区（表格/表单/卡片）    │
│     ├── 生成所有弹窗（如有）              │
│     └── 转换业务逻辑标记 <@><@>          │
├─────────────────────────────────────────┤
│  3. 即时验证（生成后立即执行）             │
│     ├── ✅ 导航结构完整                   │
│     ├── ✅ 所有 links_to 目标有效         │
│     ├── ✅ 表格有数据（≥3行）             │
│     ├── ✅ 弹窗已实现                     │
│     └── ✅ 无禁止元素（alert/占位文字）    │
├─────────────────────────────────────────┤
│  4. 更新状态                             │
│     └── pages.json 中该页面 status → done │
└─────────────────────────────────────────┘
```

#### 8.3 即时验证规则

每个页面生成后，立即执行以下验证：

| 检查项 | 验证规则 | 失败处理 |
|--------|----------|----------|
| **导航结构** | 包含侧边栏、面包屑、Logo链接 | 重新生成 |
| **链接目标** | 所有 href 指向 pages.json 中的有效页面 | 警告并修复 |
| **表格数据** | 表格至少有 3 行数据 | 补充数据 |
| **弹窗实现** | modals 数组中的弹窗都已实现 | 补充弹窗 |
| **禁止元素** | 无 alert/confirm/prompt | 移除替换 |
| **占位文字** | 无"此处显示"/"TODO"/"待实现" | 替换为实际内容 |

#### 8.4 验证失败处理

```
页面生成后验证流程：

验证通过 → 更新 status 为 "done" → 继续下一个页面
     ↓
验证失败 → 显示具体问题 → 重新生成该页面（最多2次）
     ↓
2次仍失败 → 标记为 "error" → 记录问题 → 继续下一个页面
```

#### 8.5 生成进度展示

```
📋 页面生成队列（共 5 个页面）

[1/5] 🔨 生成 index.html...
      ✅ 导航结构完整
      ✅ 链接目标有效
      ✅ 验证通过
      ✅ 已完成

[2/5] 🔨 生成 dashboard.html...
      ✅ 导航结构完整
      ⚠️  链接 "user-mgmt.html" 不在页面列表中，已修正为 "user-management.html"
      ✅ 验证通过
      ✅ 已完成

[3/5] 🔨 生成 user-management.html...
      ✅ 导航结构完整
      ❌ 表格数据不足（仅 1 行）
      🔄 重新生成...
      ✅ 验证通过
      ✅ 已完成

...
```

## ⚠️ 页面结构要求

### 每个页面必须包含的完整结构

```
┌─────────────────────────────────────────────────────────────┐
│  Logo      导航菜单                    用户头像 | 通知 | 退出 │ ← 顶部导航栏
├──────────┬──────────────────────────────────────────────────┤
│          │  面包屑：首页 > 当前页面                          │
│  侧边栏   ├──────────────────────────────────────────────────┤
│          │                                                  │
│  - 仪表盘 │                                                  │
│  - 用户   │                                                  │
│  - 订单   │              页面主要内容                        │
│  - 商品   │                                                  │
│  - 设置   │                                                  │
│          │                                                  │
└──────────┴──────────────────────────────────────────────────┘
```

### 必须包含的元素

| 元素 | 要求 | 示例 |
|------|------|------|
| Logo | 点击返回 dashboard | `<a href="dashboard.html">项目名称</a>` |
| 侧边栏菜单 | 包含所有模块入口，当前页高亮 | 仪表盘、用户管理、订单管理... |
| 顶部导航 | 用户信息、通知、退出等 | 头像 + 用户名 + 下拉菜单 |
| 面包屑 | 显示当前位置 | 首页 > 用户管理 |
| 主内容区 | 完整的功能 UI | 表格 + 按钮 + 弹窗 |

---

## ⚠️ 业务逻辑标记转换（重要）

生成页面时，**必须**解析 PRD 中的 `<@>业务逻辑说明<@>` 标记，并转换为悬停提示气泡。

### 转换规则

| PRD 内容 | 转换为 |
|----------|--------|
| `按钮文字 <@>业务说明<@>` | 按钮 + 💡图标 + 悬停气泡 |
| `字段名 <@>业务说明<@>` | 标签 + 💡图标 + 悬停气泡 |

### HTML + Tailwind 转换示例

**PRD 原文**：
```
新增用户按钮 <@>点击打开新增表单弹窗，必填字段：用户名、姓名<@>
```

**转换后**：
```html
<button class="btn btn-primary">
    <i data-lucide="plus" class="w-4 h-4"></i>
    新增用户
</button>
<span class="business-tip">
    <span class="business-tip-icon">💡</span>
    <span class="business-tip-content">点击打开新增表单弹窗，必填字段：用户名、姓名</span>
</span>
```

**PRD 原文**（表格操作列）：
```
编辑 <@>只有管理员角色才能编辑其他管理员信息<@>
```

**转换后**：
```html
<button class="btn btn-secondary text-sm">编辑</button>
<span class="business-tip">
    <span class="business-tip-icon">💡</span>
    <span class="business-tip-content">只有管理员角色才能编辑其他管理员信息</span>
</span>
```

**PRD 原文**（表单字段）：
```
用户名 <@>必填，长度4-20字符，仅支持英文和数字<@>
```

**转换后**：
```html
<div class="flex items-center gap-1">
    <label class="form-label">用户名</label>
    <span class="business-tip">
        <span class="business-tip-icon">💡</span>
        <span class="business-tip-content">必填，长度4-20字符，仅支持英文和数字</span>
    </span>
</div>
<input type="text" class="form-input" placeholder="请输入用户名" required />
```

### React + shadcn/ui 转换示例

**PRD 原文**：
```
新增用户按钮 <@>点击打开新增表单弹窗，必填字段：用户名、姓名<@>
```

**转换后**：
```jsx
<Button onClick={() => setShowAddModal(true)}>
    <Icon.Plus size={16} />
    新增用户
</Button>
<span className="business-tip">
    <span className="business-tip-icon">💡</span>
    <span className="business-tip-content">点击打开新增表单弹窗，必填字段：用户名、姓名</span>
</span>
```

### 多行业务说明处理

**PRD 原文**：
```
<@>
第一行：点击后打开新增表单弹窗
第二行：必填字段包括用户名、姓名
第三行：用户名长度限制4-20字符
<@>
```

**转换后**（保留换行）：
```html
<span class="business-tip">
    <span class="business-tip-icon">💡</span>
    <span class="business-tip-content">第一行：点击后打开新增表单弹窗
第二行：必填字段包括用户名、姓名
第三行：用户名长度限制4-20字符</span>
</span>
```

### ⚠️ 转换检查清单

生成每个页面后，必须检查：

1. ✅ 是否识别了所有 `<@>...<@>` 标记
2. ✅ 每个标记是否正确转换为 `.business-tip` 结构
3. ✅ 业务说明内容是否完整保留
4. ✅ 多行说明是否保留换行格式
5. ✅ 💡 图标是否正确显示

---

## 弹窗实现要求

### HTML + Tailwind CSS

```html
<!-- 弹窗遮罩 -->
<div id="modal-overlay" class="fixed inset-0 bg-black/50 hidden z-50" onclick="closeAllModals()"></div>

<!-- 新增弹窗 -->
<div id="add-modal" class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-[600px] hidden z-50">
    <div class="p-4 border-b flex justify-between items-center">
        <h3 class="text-lg font-semibold">新增用户</h3>
        <button onclick="closeModal('add-modal')" class="text-gray-400 hover:text-gray-600">✕</button>
    </div>
    <form class="p-4 space-y-4">
        <!-- 表单字段 -->
    </form>
</div>

<script>
function openModal(id) {
    document.getElementById('modal-overlay').classList.remove('hidden');
    document.getElementById(id).classList.remove('hidden');
}
function closeModal(id) {
    document.getElementById('modal-overlay').classList.add('hidden');
    document.getElementById(id).classList.add('hidden');
}
function closeAllModals() {
    document.getElementById('modal-overlay').classList.add('hidden');
    document.querySelectorAll('[id$="-modal"]').forEach(m => m.classList.add('hidden'));
}
</script>
```

### React + shadcn/ui + Tailwind

shadcn/ui 使用 Radix UI 原语 + Tailwind CSS 样式，组件美观且高度可定制。

**基础组件**：

| 功能 | 组件 |
|------|------|
| 按钮 | `<Button variant="primary/secondary/outline/destructive/ghost/link" size="sm/default/lg/icon">` |
| 输入框 | `<Input placeholder="请输入" icon={<Icon.Search />} />` |
| 文本域 | `<Textarea placeholder="请输入" />` |
| 标签 | `<Label required>用户名</Label>` |
| 卡片 | `<Card><CardHeader><CardTitle><CardDescription><CardContent><CardFooter>` |
| 徽章 | `<Badge variant="default/secondary/success/warning/destructive/outline">正常</Badge>` |
| 头像 | `<Avatar size="sm/default/lg"><AvatarFallback>管</AvatarFallback></Avatar>` |
| 分隔线 | `<Separator orientation="horizontal/vertical" />` |
| 骨架屏 | `<Skeleton className="h-4 w-48" />` |
| 加载动画 | `<Spinner size="sm/default/lg" />` |
| 空状态 | `<Empty title="暂无数据" description="点击新增" action={<Button>新增</Button>} />` |
| 键盘按键 | `<Kbd>Ctrl</Kbd>` |

**表单组件**：

| 功能 | 组件 |
|------|------|
| 下拉选择 | `<Select options={[{value, label}]} value={} onChange={} />` |
| 原生选择 | `<NativeSelect options={[{value, label}]} value={} onChange={} />` |
| 复选框 | `<Checkbox checked={} onChange={} label="同意" />` |
| 复选框组 | `<CheckboxGroup options={[]} value={[]} onChange={} />` |
| 单选框 | `<Radio checked={} onChange={} label="选项" />` |
| 单选框组 | `<RadioGroup options={[]} value={} onChange={} />` |
| 开关 | `<Switch checked={} onChange={} />` |
| 滑块 | `<Slider value={} onChange={} min={0} max={100} />` |
| 日期选择 | `<DatePicker value={} onChange={} />` |
| 时间选择 | `<TimePicker value={} onChange={} />` |
| 日期时间 | `<DateTimePicker value={} onChange={} />` |
| OTP输入 | `<InputOTP length={6} value={} onChange={} />` |
| 切换按钮 | `<Toggle pressed={} onPressedChange={}>{children}</Toggle>` |
| 切换按钮组 | `<ToggleGroup type="single/multiple" options={[]} value={} onChange={} />` |

**数据展示组件**：

| 功能 | 组件 |
|------|------|
| 表格 | `<Table><TableHeader><TableBody><TableRow><TableHead><TableCell>` |
| 进度条 | `<Progress value={50} max={100} />` |
| 分页 | `<Pagination current={1} total={100} pageSize={10} onChange={} />` |
| 面包屑 | `<Breadcrumb items={[{label, href}]} />` |

**导航组件**：

| 功能 | 组件 |
|------|------|
| 标签页 | `<Tabs value={} onChange={}><TabsList><TabsTrigger>` + `<TabsContent>` |
| 手风琴 | `<Accordion><AccordionItem><AccordionTrigger><AccordionContent>` |

**反馈组件**：

| 功能 | 组件 |
|------|------|
| 弹窗 | `<Dialog open={} onOpenChange={}><DialogHeader><DialogTitle><DialogDescription><DialogFooter>` |
| 确认弹窗 | `<AlertDialog><AlertDialogHeader><AlertDialogTitle><AlertDialogDescription><AlertDialogFooter><AlertDialogAction><AlertDialogCancel>` |
| 右侧抽屉 | `<Sheet open={} onOpenChange={}><SheetHeader><SheetTitle><SheetFooter>` |
| 左侧抽屉 | `<Drawer open={} onOpenChange={}><DrawerHeader><DrawerTitle><DrawerFooter>` |
| 弹出框 | `<Popover open={} onOpenChange={} trigger={}><PopoverContent>` |
| 提示 | `<Tooltip content="提示内容"><Button>悬停</Button></Tooltip>` |
| 下拉菜单 | `<Dropdown trigger={<Button>菜单</Button>} items={[{label, icon, onClick}]} />` |
| 确认气泡 | `<Popconfirm title="确定删除?" description="不可恢复" onConfirm={}><Button>删除</Button></Popconfirm>` |
| 悬停卡片 | `<HoverCard trigger={<Avatar />}>{content}</HoverCard>` |
| 警告提示 | `<Alert variant="default/destructive/success/warning" title="标题">内容</Alert>` |
| 消息提示 | `<ToastProvider>包裹应用，useToast().addToast("消息", "success")` |

**示例 - 列表页（含弹窗）**：
```jsx
<Card>
    <CardHeader>
        <CardTitle>用户列表</CardTitle>
    </CardHeader>
    <CardContent>
        <div className="flex justify-between mb-4">
            <div className="flex gap-2">
                <Input placeholder="搜索用户名..." className="w-64" icon={<Icon.Search size={16} />} />
                <Button variant="outline">搜索</Button>
            </div>
            <Button onClick={() => setShowAddModal(true)}><Icon.Plus size={16} />新增用户</Button>
        </div>

        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>序号</TableHead>
                    <TableHead>用户名</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>操作</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>张三</TableCell>
                    <TableCell><Badge variant="success">正常</Badge></TableCell>
                    <TableCell>
                        <div className="flex gap-2">
                            <Button variant="link" size="sm" onClick={() => openEditModal(row)}>编辑</Button>
                            <Popconfirm title="确定删除?" description="此操作不可恢复" onConfirm={() => handleDelete(row.id)}>
                                <Button variant="link" size="sm" className="text-red-500">删除</Button>
                            </Popconfirm>
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>

        <div className="flex justify-end mt-4">
            <Pagination current={1} total={100} pageSize={10} onChange={handlePageChange} />
        </div>
    </CardContent>
</Card>

{/* 新增弹窗 */}
<Dialog open={showAddModal} onOpenChange={setShowAddModal}>
    <DialogHeader>
        <DialogTitle>新增用户</DialogTitle>
        <DialogDescription>填写用户信息</DialogDescription>
    </DialogHeader>
    <div className="space-y-4 py-4">
        <div className="space-y-2">
            <Label required>用户名</Label>
            <Input placeholder="请输入用户名" />
        </div>
        <div className="space-y-2">
            <Label>角色</Label>
            <Select options={[{value: "admin", label: "管理员"}, {value: "user", label: "普通用户"}]} value={role} onChange={setRole} />
        </div>
        <div className="space-y-2">
            <Label>状态</Label>
            <RadioGroup options={[{value: "active", label: "启用"}, {value: "inactive", label: "禁用"}]} value={status} onChange={setStatus} />
        </div>
    </div>
    <DialogFooter>
        <Button variant="outline" onClick={() => setShowAddModal(false)}>取消</Button>
        <Button onClick={handleAdd}>确定</Button>
    </DialogFooter>
</Dialog>

{/* 详情抽屉 */}
<Sheet open={showDetailSheet} onOpenChange={setShowDetailSheet}>
    <SheetHeader>
        <SheetTitle>用户详情</SheetTitle>
        <SheetDescription>查看用户完整信息</SheetDescription>
    </SheetHeader>
    <div className="space-y-4">
        <div className="flex justify-between py-2 border-b">
            <span className="text-gray-500">用户名</span>
            <span>{detailData.username}</span>
        </div>
        <div className="flex justify-between py-2 border-b">
            <span className="text-gray-500">角色</span>
            <Badge>{detailData.role}</Badge>
        </div>
    </div>
    <SheetFooter>
        <Button variant="outline" onClick={() => setShowDetailSheet(false)}>关闭</Button>
    </SheetFooter>
</Sheet>
```

**图标组件 (Lucide)**：

模板内置了常用 Lucide 图标组件，使用方式：

```jsx
// 图标用法
<Icon.Home size={18} />
<Icon.Users size={20} className="text-gray-500" />
<Icon.Settings />

// 常用图标列表
Icon.Home          // 首页
Icon.Dashboard     // 仪表盘
Icon.Users         // 用户
Icon.Settings      // 设置
Icon.Bell          // 通知
Icon.User          // 用户头像
Icon.Plus          // 新增
Icon.Pencil        // 编辑
Icon.Trash         // 删除
Icon.Eye           // 查看
Icon.Search        // 搜索
Icon.Menu          // 菜单
Icon.Box           // Logo
Icon.Calendar      // 日历
Icon.Clock         // 时间
Icon.Download      // 下载
Icon.Upload        // 上传
Icon.Check         // 确认
Icon.X             // 关闭
Icon.ChevronDown   // 下箭头
Icon.ChevronRight  // 右箭头
Icon.AlertCircle   // 警告
Icon.CheckCircle   // 成功
Icon.Info          // 信息
Icon.Loader        // 加载中
Icon.RefreshCw     // 刷新
Icon.LogOut        // 退出
```

**⚠️ 注意：DOM 标签必须正确闭合**
```jsx
// ❌ 错误
<input type="text">
<br>
<img src="...">

// ✅ 正确
<input type="text" />
<br />
<img src="..." />
```

---

## 模板变量替换

生成页面时，需要替换模板中的变量：

### 基础变量

| 变量 | 说明 | 示例值 |
|------|------|--------|
| `{{PROJECT_NAME}}` | 项目名称 | 用户管理系统 |
| `{{PAGE_TITLE}}` | 页面标题 | 用户管理 |

### 字体变量（美学准则核心）

| 变量 | 说明 | 示例值 |
|------|------|--------|
| `{{FONT_HEADING}}` | 标题字体 | Outfit |
| `{{FONT_BODY}}` | 正文字体 | DM Sans |

### 色彩体系变量

| 变量 | 说明 | 示例值 |
|------|------|--------|
| `{{BG_PRIMARY}}` | 主背景色 | #faf7f2 |
| `{{BG_SECONDARY}}` | 次背景色 | #f0ebe3 |
| `{{BG_CARD}}` | 卡片背景色 | #ffffff |
| `{{TEXT_PRIMARY}}` | 主文字色 | #2d2a26 |
| `{{TEXT_SECONDARY}}` | 次文字色 | #7a756d |
| `{{ACCENT}}` | 主强调色 | #c45c26 |
| `{{ACCENT_HOVER}}` | 主强调悬停色 | #d46a32 |
| `{{ACCENT_SECONDARY}}` | 点缀色 | #2b7a78 |
| `{{SUCCESS_COLOR}}` | 成功色 | #40916c |
| `{{WARNING_COLOR}}` | 警告色 | #e76f51 |
| `{{ERROR_COLOR}}` | 错误色 | #c1121f |
| `{{BORDER_COLOR}}` | 边框色 | #e5dfd4 |
| `{{SHADOW_COLOR}}` | 阴影色 | rgba(45, 42, 38, 0.1) |

### 特效变量

| 变量 | 说明 | 示例值 |
|------|------|--------|
| `{{HARD_SHADOW}}` | 硬阴影值 | 8px 8px 0 #000 |

### 完整变量替换示例

```html
<!-- 替换前 -->
<link href="https://fonts.googleapis.com/css2?family={{FONT_HEADING}}:wght@400;600;800;900&family={{FONT_BODY}}:wght@400;500;600&display=swap" rel="stylesheet">

<!-- 替换后 -->
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800;900&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```

```css
/* 替换前 */
--accent: {{ACCENT}};

/* 替换后 */
--accent: #c45c26;
```

---

## 业务逻辑标记

在生成页面时，PRD 中使用 `<@>业务逻辑<@>` 标记的内容会自动转换为悬停提示气泡。

### 使用方式

在 PRD 文档的功能描述中，将业务逻辑说明用 `<@>...<@>` 包裹：

**PRD 示例**：
- 新增用户按钮 <@>点击打开新增表单弹窗，必填字段：用户名、姓名、角色<@>
- 状态列 <@>状态变更会触发邮件通知<@>
- 编辑操作 <@>只有管理员角色才能编辑其他管理员信息<@>

**生成效果**：
- 在按钮旁显示 💡 图标（灯泡）
- 鼠标悬停时展示业务逻辑说明气泡
- 气泡最大宽度 256px，支持多行文本和滚动

### 多行支持

业务逻辑说明可以包含换行：

```
<@>
第一行业务逻辑说明
第二行业务逻辑说明
第三行业务逻辑说明
<@>
```

气泡会保留换行格式，超长内容可滚动查看。

### 适用场景

| 场景 | 示例 |
|------|------|
| 功能按钮 | `新增用户 <@>点击后打开新增表单弹窗<@>` |
| 表格操作列 | `编辑 <@>只有管理员才能编辑<@>` |
| 状态字段 | `状态 <@>状态变更触发邮件通知<@>` |
| 表单字段 | `用户名 <@>必填，长度 4-20 字符<@>` |

---

### 步骤 9：最终完整性检查

**⚠️ 所有页面生成完成后，必须执行完整性检查！**

#### 9.1 执行检查脚本

运行验证脚本 `scripts/prototype_validator.js`，执行以下检查：

```bash
node scripts/prototype_validator.js prd/prototype/
```

#### 9.2 检查项目清单

| 检查类别 | 检查项 | 通过条件 |
|----------|--------|----------|
| **页面完整性** | 所有 pages.json 中的页面已生成 | 文件存在 |
| **链接有效性** | 所有 href 目标页面存在 | 目标在 pages.json 中 |
| **导航一致性** | 每个页面的侧边栏菜单一致 | 包含所有 nav_items |
| **Logo返回** | Logo 点击返回 dashboard | 包含正确的 href |
| **表格数据** | 每个表格至少 3 行数据 | <tr> 或 TableRow 数量 |
| **弹窗实现** | 配置的弹窗都已实现 | modal/Modal/Dialog 数量 |
| **禁止元素** | 无 alert/confirm/prompt | 正则匹配 |
| **占位检测** | 无占位文字 | 正则匹配 |

#### 9.3 生成检查报告

检查完成后，生成 `prd/prototype/validation_report.md` 报告：

```markdown
# 原型完整性检查报告

**检查时间**：2026-04-03 14:30:00
**原型目录**：prd/prototype/
**页面契约**：pages.json

---

## 📊 统计摘要

| 指标 | 数值 |
|------|------|
| 规划页面数 | 5 |
| 已生成页面 | 5 |
| 有效链接 | 12 |
| 失效链接 | 0 |
| 内容问题 | 0 |

---

## ✅ 通过项

- ✅ index.html - 页面已生成
- ✅ dashboard.html - 页面已生成，内容完整
- ✅ user-management.html - 页面已生成，内容完整
- ✅ order-management.html - 页面已生成，内容完整
- ✅ settings.html - 页面已生成，内容完整

---

## ⚠️ 警告项

（无警告）

---

## ❌ 错误项

（无错误）

---

## 检查结论

✅ 原型完整性检查通过！
```

#### 9.4 自动修复机制

对于以下问题，自动执行修复：

| 问题类型 | 自动修复方案 |
|----------|--------------|
| 链接路径错误 | 修正为正确的文件名 |
| 缺少 pages/ 前缀 | 移除多余的前缀 |
| 导航项缺失 | 补充缺失的导航项 |
| 表格数据不足 | 补充示例数据行 |

#### 9.5 检查结果处理

```
检查结果流程：

全部通过 → 进入步骤 9（生成映射文档）
     ↓
存在警告 → 显示警告列表 → 询问用户是否继续
     ↓
存在错误 → 显示错误列表 → 必须修复后才能继续
```

**⚠️ 有错误时的处理**：
```
❌ 发现以下问题需要修复：

1. user-management.html 表格数据不足
2. order-management.html 链接指向不存在的页面

请选择处理方式：
1. 自动修复（推荐）
2. 手动说明修复方案
3. 重新生成问题页面
4. 暂时跳过，稍后处理
```

---

### 步骤 10：生成映射文档

**⚠️ 必须在每生成一个页面后，立即记录该页面的依赖关系到映射文档！**

生成 `prd/prototype/mapping.md` 文件，记录原型页面与 PRD 的映射关系。

#### 映射文档结构

```markdown
# 原型映射文档

**生成时间**：{{YYYY-MM-DD HH:mm:ss}}
**原型版本**：v1.0
**技术栈**：{{技术栈名称}}

---

## 页面依赖映射

### {{页面文件名}}（{{页面标题}}）

**生成时间**：{{YYYY-MM-DD HH:mm:ss}}

| 依赖 PRD | 版本 | 依赖章节 | 依赖内容 |
|----------|------|----------|----------|
| {{PRD文件名}} | {{版本号}} | {{章节编号 章节名称}} | {{具体内容描述}} |

---

## PRD 版本快照

| PRD 文件 | 记录版本 | 记录时间 |
|----------|----------|----------|
| {{PRD文件名}} | {{版本号}} | {{YYYY-MM-DD HH:mm:ss}} |

---

## 设计体系快照

**设计风格**：{{风格名称}}
**主题色**：{{主题色值}}
**生成时间**：{{YYYY-MM-DD HH:mm:ss}}

---

## 更新历史

| 更新时间 | 操作 | 更新页面 | 变更说明 |
|----------|------|----------|----------|
| {{YYYY-MM-DD HH:mm:ss}} | 初始生成 | 全部页面 | - |
```

#### 记录规则

**每生成一个页面后，立即记录：**

1. **页面文件名** - 如 `user-management.html`
2. **页面标题** - 如 `用户管理`
3. **生成时间** - 完成时间戳
4. **依赖 PRD** - 该页面依赖的所有 PRD 文件
5. **版本** - 各 PRD 当前的版本号
6. **依赖章节** - 从 PRD 的哪些章节提取内容
7. **依赖内容** - 具体提取了什么内容

**示例记录**：

```markdown
### user-management.html（用户管理）

**生成时间**：2026-04-02 14:30:00

| 依赖 PRD | 版本 | 依赖章节 | 依赖内容 |
|----------|------|----------|----------|
| M001_用户管理_prd.md | v1.0 | 第3章 详细功能需求 | 用户列表、搜索、筛选、批量操作 |
| M001_用户管理_prd.md | v1.0 | 第4章 数据字段定义 | 用户字段：用户名、姓名、角色、状态 |
| M001_用户管理_prd.md | v1.0 | 第6章 用户界面设计 | 列表页布局、新增/编辑弹窗、详情抽屉 |
| main_prd.md | v1.0 | 第5章 用户故事概述 | 用户角色权限定义 |
```

#### PRD 版本读取

从各 PRD 文件的第 1 章"文档基础信息"中读取"当前版本"字段：

- 主 PRD：`prd/main_prd.md`
- 模块 PRD：`prd/modules/*.md`

---

### 步骤 11：确认完成

输出完成信息：

```
✅ 原型已成功生成在：prd/prototype/

目录结构：
prd/prototype/
├── pages.json              # 页面契约文件
├── mapping.md              # 映射文档（记录 PRD 与原型的对应关系）
├── validation_report.md    # 完整性检查报告
├── index.html              # 登录页
├── dashboard.html          # 仪表盘
├── user-management.html    # 用户管理（含新增/编辑/详情弹窗）
├── order-management.html   # 订单管理（含详情抽屉）
└── settings.html           # 系统设置

技术栈：HTML + Tailwind CSS
设计风格：商务简约
主题色：商务蓝 (#1890ff)

═══════════════════════════════════════
🛡️ 三阶段质量保障检查结果
═══════════════════════════════════════

【阶段1：规划锁定】
✅ pages.json 页面契约已生成
✅ 导航菜单已定义（4 个入口）
✅ 设计体系已确认

【阶段2：按序生成 + 即时验证】
✅ 5/5 页面已生成
✅ 所有页面即时验证通过
✅ 业务逻辑标记已转换

【阶段3：最终完整性检查】
✅ 页面清单核对通过
✅ 链接有效性检查通过（12 个链接）
✅ 导航一致性检查通过
✅ 内容完整性检查通过
✅ 检查报告已生成：validation_report.md

═══════════════════════════════════════

页面数量：5 个
总体验证：✅ 通过

下一步：
- 使用 /prd-prototype preview 命令在浏览器中打开原型
- PRD 更新后，使用 /prd-prototype check 检查同步状态
- 如需修改页面，直接编辑 pages.json 后重新生成
```