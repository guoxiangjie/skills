# {{PROJECT_NAME}} PRD指南

## 项目结构

### 需求清单

```
prd/
├── main_prd.md                 # 主产品需求文档
├── modules/                    # 功能模块PRD目录
├── README.md                   # 项目说明文档
├── CHANGELOG.md                # 版本变更日志
└── PRD_INDEX.md                # PRD模块总集索引
```

## 文档结构说明

### 1. 主PRD文档 (`main_prd.md`)
- 整体项目的产品需求文档
- 包含项目背景、目标、核心业务流程、功能模块清单等
- 使用 `prd-suite` skill 来生成或更新主PRD内容

### 2. 模块PRD文档 (`modules/`)
- 存放各个功能模块的详细需求文档
- 每个模块可以创建独立的PRD文件
- 使用 `prd-suite` skill 来生成或更新模块PRD内容

### 3. PRD模块总集 (`PRD_INDEX.md`)
- 记录所有模块PRD的索引信息
- 包含模块编号、中文名称、文档地址、版本号和状态
- 提供模块编号规则和新增模块流程

## 使用方法

### 创建主PRD
- 使用 `prd-suite` skill 来生成完整的主PRD内容

### 创建模块PRD
- 使用 `prd-suite` skill 来生成模块PRD内容

### 版本管理
- 使用 `CHANGELOG.md` 记录每个版本的变更内容
- 遵循语义化版本规范
