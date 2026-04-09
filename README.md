# PRD Skills

> 从需求到原型的完整产品工作流

## 概述

基于 AI 的产品需求文档生成与原型设计工具集，支持从思维导图导入到可交互原型的一站式自动化。

---

## 技能清单

| 技能 | 功能 | 命令 |
|------|------|------|
| **prd-init** | 初始化 PRD 文档包结构 | `/prd-init` |
| **prd-suite** | 创建和管理 PRD 文档 | `/prd-suite` |
| **prd-prototype** | 生成交互式原型 / 前端项目 | `/prd-prototype` |
| **prd-relations** | 模块间关联关系检查 | `/prd-relations` |

---

## 核心能力

### 📝 PRD 文档管理

- **XMind 导入** - 从思维导图直接生成结构化 PRD
- **自然语言需求** - 用日常语言描述需求，AI 自动转换
- **主 PRD + 模块 PRD** - 层级化文档结构，支持大型项目
- **版本管理** - 语义化版本控制，自动记录变更日志
- **关联检查** - 跨模块数据一致性校验

### 🎨 原型生成（双模式）

根据使用人身份选择不同模式：

#### 模式 A：需求 / 项目经理

| 特性 | 说明 |
|------|------|
| **技术栈** | HTML + Tailwind CSS |
| **设计风格** | 4 种预设风格 + 自定义输入 |
| **产物** | 多页面 HTML 文件，含弹窗交互 |
| **适用** | 快速验证、产品演示、需求评审 |

**预设设计风格**：

| 风格 | 主色 | 适用场景 |
|------|------|----------|
| 众诚 | `#246FE5` | 极简、清晰、标准化 |
| 类 Ant Design | `#165DFF` | 阿里官方企业级 |
| 类 Element Plus | `#409EFF` | Vue3 经典中后台 |
| 类 Arco Design | `#165DFF` | 字节跳动官方企业级 |

#### 模式 B：研发人员

| 特性 | 说明 |
|------|------|
| **技术栈** | React 18 + Ant Design + Zustand + React Router v6 |
| **架构** | SPA 单页应用 |
| **产物** | 完整前端项目（TypeScript 严格模式） |
| **适用** | 开发对接、技术评审、项目实现 |

**研发人员模式特点**：

- **SPA 架构** - React Router v6 + Ant Design Pro 风格布局
- **组件拆分** - 先分析全局公共组件，再逐页生成页面
- **类型安全** - 完整 TypeScript 类型定义
- **Mock 数据** - 内置模拟数据层，无需后端即可运行
- **代码质量** - 使用 `vercel-react-best-practices` 和 `vercel-composition-patterns` 确保质量
- **包管理器** - 使用 pnpm

---

## 🛡️ 质量保障

### 三阶段机制

```
阶段 1: 规划锁定 → 扫描模块 PRD → 生成设计体系 → 确认页面契约
阶段 2: 按序生成 → 逐页生成 + 即时验证 → 失败重试（最多 2 次）
阶段 3: 最终检查 → 页面/链接/导航一致性 → 输出检查报告
```

### 研发人员模式额外保障

- **全局组件分析** - 先提取公共组件，再逐页生成
- **Skills 代码规范** - 自动安装并使用 Vercel React 最佳实践
- **TypeScript 编译** - 确保类型正确
- **Mock 数据验证** - 确保数据层可用

---

## 标准工作流

```
1. prd-init      → 初始化标准目录结构
2. prd-suite     → 创建主 PRD 和模块 PRD
3. prd-prototype → 生成交互式原型 / 前端项目
4. prd-relations → 检查模块间关联关系
5. prd-suite     → 更新 PRD（迭代）
6. prd-prototype → 增量更新原型
```

---

## 📦 快速开始

### 安装

```bash
npx skills add https://github.com/guoxiangjie/skills
```

### 使用

```bash
# 1. 初始化 PRD 文档包
/prd-init

# 2. 创建主 PRD 和模块 PRD
/prd-suite create main
/prd-suite create module

# 3. 生成原型 / 前端项目
/prd-prototype
```

---

## 📚 文档

详细文档请访问 [PRD Skills 文档网站](./document/docs/introduction/overview.md)

- [快速开始](./document/docs/introduction/quick-start.md)
- [prd-init 使用说明](./document/docs/prd-init/index.md)
- [prd-suite 使用说明](./document/docs/prd-suite/index.md)
- [prd-prototype 使用说明](./document/docs/prd-prototype/index.md)

---

## 📄 许可证

Copyright © 2025 PRD Skills
