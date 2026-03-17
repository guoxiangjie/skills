# PRD Skills

> AI 驱动的产品需求文档（PRD）生成工具集，为 Trae IDE 提供智能化的 PRD 管理能力。

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Trae IDE](https://img.shields.io/badge/Trae%20IDE-Compatible-green.svg)](https://trae.ai)

## ✨ 核心特性

### 🗺️ XMind 文件支持（推荐）
- 通过 XMind MCP 服务直接读取 `.xmind` 文件
- 智能解析思维导图结构，自动提取 PRD 信息
- 生成中间内容文档供确认，确保解析准确性

### 📝 自然语言需求模板
- 支持自然语言描述项目需求
- AI 自动提取结构化信息
- 四种创建模式灵活选择

### 🔄 智能推断机制
- 从主 PRD 自动推断模块信息
- 减少重复输入，提升效率
- 保持文档一致性

### ✅ 审核确认流程
- 所有 PRD 操作必须经过用户确认
- 支持迭代修改，直到满意为止
- 提供完整的审核选项

### 📊 版本管理
- 语义化版本控制
- 完整的 CHANGELOG 记录
- 变更前后对比，便于回溯

## 🚀 快速开始

### 前置要求

- Trae IDE 已安装
- （可选）XMind MCP 服务 - 用于 XMind 文件导入功能

### 安装

将 `prd-init` 和 `prd-suite` 目录复制到你的 Trae 项目 `.trae/skills/` 目录下：

```bash
cp -r prd-init /path/to/your/project/.trae/skills/
cp -r prd-suite /path/to/your/project/.trae/skills/
```

### 使用方式

#### 1. 初始化 PRD 文档包

```
/prd-init
```

自动创建标准 PRD 文档包结构：
```
project/
├── PRD_INDEX.md        # PRD 索引
├── CHANGELOG.md        # 变更日志
├── {项目名}_main_prd.md # 主 PRD
└── modules/            # 模块 PRD 目录
```

#### 2. 创建主 PRD

```
/prd-suite create main
```

支持四种创建模式：
- **XMind 文件**（推荐）：从 XMind 思维导图导入
- **需求文件**：从自然语言需求模板生成
- **混合模式**：需求文件 + 交互补充
- **手动创建**：交互式逐项填写

#### 3. 创建模块 PRD

```
/prd-suite create module
```

支持两种模式：
- **快速模式**：根据主 PRD 自动生成
- **问答模式**：逐章节询问核心信息

#### 4. 更新 PRD

```
/prd-suite update main    # 更新主 PRD
/prd-suite update module  # 更新模块 PRD
```

#### 5. 删除模块 PRD

```
/prd-suite delete module
```

## 📁 目录结构

```
├── prd-init/
│   ├── SKILL.md              # Skill 入口
│   ├── commands/
│   │   └── init.md           # 初始化命令
│   ├── config/
│   │   └── config.json       # 配置文件
│   ├── scripts/
│   │   └── utils.js          # 工具函数
│   └── templates/
│       ├── CHANGELOG.md      # 变更日志模板
│       ├── PRD_INDEX.md      # 索引模板
│       └── README.md         # 项目说明模板
│
├── prd-suite/
│   ├── SKILL.md              # Skill 入口
│   ├── commands/
│   │   ├── create.md         # 创建命令
│   │   ├── update.md         # 更新命令
│   │   └── delete.md         # 删除命令
│   ├── config/
│   │   └── config.json       # 配置文件
│   ├── scripts/
│   │   ├── parser.js         # 需求解析
│   │   └── utils.js          # 工具函数
│   └── templates/
│       ├── main_prd_template.md      # 主 PRD 模板
│       ├── module_prd_template.md    # 模块 PRD 模板
│       ├── requirement_template.md   # 需求模板
│       ├── xmind_content_template.md # XMind 内容模板
│       ├── changelog_format.md       # CHANGELOG 格式规范
│       ├── format_guidelines.md      # 格式规范
│       ├── review_process.md         # 审核流程
│       ├── module_qa_template.md     # 问答模式模板
│       └── error_codes_reference.md  # 错误码参考
│
└── README.md
```

## 🛠️ 技术栈

- **Trae IDE Skills Framework** - AI 技能框架
- **XMind MCP** - XMind 文件解析服务
- **Markdown** - 文档格式标准

## 📖 文档规范

### PRD 模板结构

主 PRD 包含以下章节：
1. 文档基础信息
2. 项目概述
3. 功能模块清单
4. 用户角色定义
5. 业务流程概述
6. 非功能需求
7. 验收标准
8. 附录

模块 PRD 包含以下章节：
1. 文档基础信息
2. 模块概述
3. 详细功能需求
4. 接口定义
5. 数据模型
6. 业务规则与边界条件
7. 非功能需求
8. 验收标准
9. 附录

### CHANGELOG 格式

```markdown
## 2024-01-15

### 📄 项目名_main_prd.md (v1.0 → v1.1)

**变更概述**：调整用户管理模块的功能需求

#### 第3章 功能模块清单

| 变更项 | 变更前 | 变更后 | 变更原因 |
|--------|--------|--------|----------|
| 用户登录方式 | 仅支持账号密码登录 | 新增微信、支付宝第三方登录 | 用户反馈登录方式单一 |
```

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 开发流程

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

### 提交规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat`: 新功能
- `fix`: 修复 Bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建/工具相关

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- Trae IDE 团队提供的 Skills Framework
- XMind MCP 服务
- 所有贡献者

---

<p align="center">Made with ❤️ for Product Managers</p>
