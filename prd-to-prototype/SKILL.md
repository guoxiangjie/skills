---
name: "prd-to-prototype"
description: "将PRD文档转换为可交互原型网页。需要生成原型或预览界面时调用。依赖frontend-design skill。"
---

# PRD 转可交互原型网页

## 功能说明

此 skill 用于将 PRD 文档转换为可交互原型网页，帮助产品经理和开发团队快速可视化产品需求。

## 依赖说明

⚠️ **重要：此 skill 依赖** **`frontend-design`** **skill**

在使用此 skill 之前，请确保已安装 `frontend-design` skill。如果未安装，系统会提示您安装。

## 目录结构

```
prd-to-prototype/
├── SKILL.md              # 主入口
├── commands/             # 子命令
│   ├── generate.md       # 生成原型命令
│   └── preview.md        # 预览原型命令
├── templates/            # 模板文件
│   └── prototype_prompt_template.md  # 原型生成提示词模板
└── config/               # 配置文件
    └── config.json       # 配置信息
```

## 子命令

### generate

- **功能**：根据 PRD 文档生成可交互原型网页
- **路径**：`commands/generate.md`
- **描述**：扫描项目 PRD 文件，解析内容，调用 frontend-design skill 生成原型

### preview

- **功能**：预览已生成的原型网页
- **路径**：`commands/preview.md`
- **描述**：启动本地服务器，在浏览器中预览原型

## 工作流程

### 生成原型流程

1. **依赖检测**：检查 frontend-design skill 是否可用
   - 如果可用：继续执行
   - 如果不可用：提示用户安装并终止流程
2. **扫描 PRD 文件**：扫描**项目目录，查找所有 PRD** 文件
   - 主 PRD：`*_main_prd.md`
   - 模块 PRD：`*_module_prd.md`
3. **解析 PRD 内容**：提取关键信息
   - 主 PRD：项目名称、背景、目标、功能模块清单、用户角色
   - 模块 PRD：详细功能需求、用户故事、界面设计、交互细节
4. **生成原型提示词**：根据 PRD 内容生成 frontend-design skill 可理解的提示词
5. **调用 frontend-design skill**：使用生成的提示词调用 frontend-design skill
6. **输出原型文件**：生成可交互原型网页文件

### 预览原型流程

1. **检查原型文件**：确认原型文件已生成
2. **启动本地服务器**：启动 HTTP 服务器
3. **打开浏览器**：自动打开浏览器预览原型

## PRD 解析策略

### 主 PRD 解析内容

从主 PRD 文档中提取以下信息：

| 章节      | 提取内容           |
| ------- | -------------- |
| 文档基础信息  | 项目名称、作者、版本     |
| 项目背景与目标 | 背景说明、产品目标      |
| 核心业务流程  | 业务流程概述、流程图     |
| 功能模块清单  | 模块列表、模块关系      |
| 用户故事概述  | 用户角色、权限、高层用户故事 |

### 模块 PRD 解析内容

从模块 PRD 文档中提取以下信息：

| 章节        | 提取内容                |
| --------- | ------------------- |
| 模块背景与目标   | 模块背景、模块目标           |
| 详细功能需求    | 功能清单、功能流程、功能详细说明    |
| 用户故事详述    | 完整的用户故事、验收标准        |
| 用户界面设计    | 核心屏幕、页面流程、页面布局、交互细节 |
| 业务规则与边界条件 | 业务规则、边界条件           |

## 使用方法

### 生成原型

1. 确保项目中已有 PRD 文档
2. 确保已安装 frontend-design skill
3. 调用 `prd-to-prototype` skill
4. 选择 `generate` 命令
5. 等待原型生成完成

### 预览原型

1. 确保已生成原型文件
2. 调用 `prd-to-prototype` skill
3. 选择 `preview` 命令
4. 在浏览器中查看原型

## 配置文件

配置文件位于 `config/config.json`，包含以下内容：

- 技能基本信息
- 子命令配置
- 模板文件路径
- frontend-design skill 依赖配置

## 模板文件

模板文件位于 `templates/` 目录：

- `prototype_prompt_template.md` - 原型生成提示词模板，用于将 PRD 内容转换为 frontend-design skill 可理解的格式

## 注意事项

1. **依赖检查**：使用前必须确保 frontend-design skill 已安装
2. **PRD 格式**：PRD 文档应遵循标准模板格式，以确保正确解析
3. **原型位置**：生成的原型文件默认存放在项目的 `prototype/` 目录
4. **版本管理**：建议将原型文件纳入版本控制

