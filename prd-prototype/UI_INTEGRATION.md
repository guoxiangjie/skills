# prd-prototype UI 规范接入方案

## 📋 优化概述

本次优化将《UI 规范.md》和《WEBUI 界面.md》两份设计规范接入到 prd-prototype 技能的原型生成流程中，让用户在生成原型时可以选择是否应用众诚 UI 规范。

---

## 🎯 优化目标

1. **保留原有流程**：不改变原有的技术栈选择流程
2. **新增 UI 规范选项**：在技术栈选择后，增加 UI 规范选择步骤
3. **模板分离**：为应用 UI 规范创建专用模板
4. **配置化**：将 UI 规范提取为可配置的设计 Token

---

## 📁 新增文件

### 1. UI 规范配置文件
**路径**: `prd-prototype/ui-presets/zhongcheng-ui.json`

包含众诚 UI 规范的所有设计 Token：
- 颜色体系（品牌色、中性色、功能色）
- 字体规范（6 级字阶）
- 间距规则（4px 倍数）
- 布局尺寸（导航、侧边栏、表格等）
- 组件样式（按钮、输入框、表格、卡片等）
- Tailwind 配置扩展

### 2. 增强版 HTML 模板
**路径**: `prd-prototype/templates/html_tailwind_zhongcheng.html`

在原有 HTML + Tailwind 模板基础上，融入众诚 UI 规范：
- 内嵌 Tailwind 配置（通过 CDN script）
- 预定义组件样式类（.btn-primary, .table-zc, .card-zc 等）
- 通用交互脚本（消息提示、确认对话框）

### 3. 链接检查脚本
**路径**: `prd-prototype/scripts/link_checker.js`

在生成原型后自动检查和修复链接路径：
- 检查所有 HTML 文件中的 href 链接
- 检查 window.location 跳转
- 根据目录结构自动修复路径
- 生成检查报告

---

## 🔄 流程变更

### 原有流程
```
1. 检查 PRD 文档
2. 读取并分析 PRD
3. 生成页面规划
4. 选择技术栈
5. 创建项目目录
6. 生成页面内容
7. 生成路由和导航
8. 确认完成
```

### 新流程（版本 1 - UI 规范接入）
```
1. 检查 PRD 文档
2. 读取并分析 PRD
3. 生成页面规划
4. 选择技术栈 ←──┐
5. 选择 UI 规范 ──┘ (新增步骤)
6. 创建项目目录
7. 生成页面内容
8. 生成路由和导航
9. 确认完成
```

### 最新流程（版本 2 - 增加链接检查）
```
1. 检查 PRD 文档
2. 读取并分析 PRD
3. 生成页面规划
4. 选择技术栈 ←──┐
5. 选择 UI 规范 ──┘ (新增步骤)
6. 创建项目目录
7. 生成页面内容
8. 生成路由和导航
9. 检查和修复链接路径 ← 新增：确保跨目录跳转正确
10. 确认完成
```

---

## 📝 修改的文件

### 1. SKILL.md
**修改内容**：
- 在核心资源导航中添加 `ui-presets/zhongcheng-ui.json` 和 `html_tailwind_zhongcheng.html`
- 在执行流程中增加 UI 规范选择步骤
- 新增"UI 规范支持"章节，介绍众诚 UI 规范
- 更新最后更新日期

### 2. commands/generate.md
**修改内容**：
- 在步骤 4 后新增步骤 5：选择 UI 规范（可选）
- 更新目录结构（增加 ui-config/ 目录）
- 在步骤 7 中增加 UI 规范应用说明
- 更新技术栈模板选择表格
- 新增 UI 规范配置详细说明

### 3. document/docs/prd-prototype/tech-stack.md
**修改内容**：
- 在技术栈对比后新增"UI 规范选择"章节
- 介绍众诚 UI 规范内容
- 提供 Tailwind 配置示例
- 增加何时推荐使用 UI 规范的场景说明

---

## 🎨 UI 规范内容映射

### 颜色体系
| 规范来源 | 配置项 | 示例值 |
|---------|--------|--------|
| UI 规范.md - 基础色板 | colors.brand | #246FE5 |
| UI 规范.md - 中性色板 | colors.gray | #F7F9FA - #1B2129 |
| UI 规范.md - 功能色板 | colors.success/warning/error | #3FBE72 / #FFB800 / #F55047 |

### 字体规范
| 规范来源 | 配置项 | 示例值 |
|---------|--------|--------|
| UI 规范.md - 字阶规范 | fontSize.h1/h2/h3 | 24px/20px/16px |
| UI 规范.md - 字重规范 | fontWeight | Medium/Regular |

### 布局规范
| 规范来源 | 配置项 | 示例值 |
|---------|--------|--------|
| WEBUI 界面.md - 顶部导航 | height.top-nav | 47px |
| WEBUI 界面.md - 侧边栏 | width.sidebar | 216px |
| WEBUI 界面.md - 页签 | height.page-tab | 44px |
| WEBUI 界面.md - 表格 | height.table-header/row | 37px/47px |
| WEBUI 界面.md - 弹窗 | height.dialog-header/footer | 56px/56px |

### 间距规范
| 规范来源 | 配置项 | 示例值 |
|---------|--------|--------|
| UI 规范.md - 间距规则 | spacing.unit | 4px |
| WEBUI 界面.md - 筛选区 | spacing.filter-gap | 24px |
| WEBUI 界面.md - 表单 | spacing.label-input | 8px |
| WEBUI 界面.md - 按钮 | spacing.btn-gap-filled | 12px |

---

## 🛠️ 使用方式

### 用户操作流程

```
用户：/prd-prototype

AI: 正在分析 PRD 文档...
    已识别 5 个功能模块，将生成 8 个页面

AI: 请选择原型技术栈：
    1. HTML + Tailwind CSS（快速、轻量、无需构建）
    2. React + shadcn/ui（现代化、组件丰富）
    3. Vue + Element Plus（企业级、后台友好）
    4. 原生 HTML/CSS（无依赖、兼容性好）

用户：1

AI: 是否应用众诚 UI 规范？
    1. 应用众诚 UI 规范（企业中后台设计风格）
    2. 不使用（使用默认样式）

    众诚 UI 规范包含：
    - 颜色体系：品牌色 (#246FE5)、中性色、功能色
    - 字体规范：6 级字阶、字重规范
    - 间距规则：4px 倍数、预设间距
    - 布局规范：顶部导航 47px、侧边栏 216px
    - 组件样式：按钮、表格、表单、弹窗、卡片等

用户：1

AI: 正在生成原型...
    ✅ 已创建项目目录
    ✅ 已生成页面 (8/8)
    ✅ 已生成路由和导航
    ✅ 已应用众诚 UI 规范

    原型已成功生成在：xxx-prototype/
```

---

## 📊 模板选择逻辑

```
技术栈选择 → UI 规范选择 → 模板选择
                                     ↓
         HTML + Tailwind + 不使用   → html_tailwind.html
         HTML + Tailwind + 众诚 UI  → html_tailwind_zhongcheng.html
         React + shadcn/ui         → react_shadcn.html
         Vue + Element Plus        → vue_element.html
         原生 HTML/CSS             → native_html.html
```

---

## 🔮 后续扩展

### 待支持功能

1. **React/Vue 模板的 UI 规范支持**
   - 创建 `react_shadcn_zhongcheng` 模板
   - 创建 `vue_element_zhongcheng` 模板

2. **UI 规范自定义**
   - 允许用户修改 zhongcheng-ui.json 中的值
   - 提供预设主题切换（深色模式等）

3. **组件库增强**
   - 添加更多预定义组件（空状态、消息通知等）
   - 支持组件属性配置

---

## 📌 注意事项

1. **模板选择**：确保根据用户选择的技术栈和 UI 规范选项正确选择模板
2. **配置注入**：应用 UI 规范时，确保设计 Token 正确注入到模板中
3. **样式一致性**：生成的所有页面应保持同一套 UI 规范
4. **向后兼容**：不应用 UI 规范时，保持原有默认样式不变
5. **链接路径**：生成完成后必须检查链接路径，确保跨目录跳转正确

---

## 🔗 链接路径规则

### 目录结构
```
{项目名称}-prototype/
├── index.html              # 根目录
├── dashboard.html          # 根目录
└── pages/                  # 子目录
    ├── user-management.html
    └── order-list.html
```

### 链接规则
| 当前页面位置 | 目标页面 | 正确链接示例 |
|-------------|---------|-------------|
| 根目录 (index.html) | 根目录 (dashboard.html) | `dashboard.html` |
| 根目录 (index.html) | 子目录 (pages/user.html) | `pages/user-management.html` |
| 子目录 (pages/user.html) | 根目录 (dashboard.html) | `../dashboard.html` |
| 子目录 (pages/user.html) | 子目录 (pages/order.html) | `order-list.html` |

### ⚠️ 常见错误（pages 内跳转）
| 错误场景 | 错误链接 | 正确链接 |
|---------|---------|---------|
| pages 内跳转到 pages 内 | `pages/user-edit.html` | `user-edit.html` |
| pages 内返回根目录 | `dashboard.html` | `../dashboard.html` |
| 重复路径 | `pages/pages/xxx.html` | `pages/xxx.html` 或 `xxx.html` |

### 检查工具
```bash
# 运行链接检查脚本
node scripts/link_checker.js {prototype-dir}
```

---

*文档创建时间：2026-03-20*
*最后更新：2026-03-20 (增加链接检查 + pages 内跳转修复)*
