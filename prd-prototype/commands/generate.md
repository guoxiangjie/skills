# generate 命令 - 生成交互原型

## 功能说明

从 PRD 文档生成交互式多页面原型。

## 工作流程

### 步骤 1：检查 PRD 文档

检查项目目录下是否存在 PRD 文档：
- `prd/main_prd.md` - 主 PRD 文档
- `prd/modules/` - 模块 PRD 目录

**如果没有 PRD 文档**：
> ⚠️ 未找到 PRD 文档。请先使用 `/prd-suite` 技能创建 PRD 文档。

### 步骤 2：读取并分析 PRD

读取主 PRD 和相关模块 PRD，提取以下信息：

1. **功能模块清单** → 主要页面列表
2. **业务流程** → 页面跳转关系
3. **用户角色** → 权限和导航菜单
4. **详细功能需求** → 页面元素

### 步骤 3：生成页面规划

基于 PRD 分析，生成页面规划文档：

```
页面规划：
1. 登录页 (index.html)
   - 功能：用户登录
   - 跳转：登录成功 → 仪表盘

2. 仪表盘 (dashboard.html)
   - 功能：数据概览、快捷入口
   - 跳转：各功能模块入口

3. 用户管理 (pages/user-management.html)
   - 功能：用户列表、新增、编辑、删除
   - 跳转：返回列表、查看详情

4. ...（根据 PRD 功能模块生成）
```

### 步骤 4：选择技术栈

询问用户选择原型技术栈：

| 选项 | 技术栈 | 特点 |
|------|--------|------|
| 1 | **HTML + Tailwind CSS** | 快速、轻量、无需构建 |
| 2 | **React + shadcn/ui** | 现代化、组件丰富 |
| 3 | **Vue + Element Plus** | 企业级、后台友好 |
| 4 | **原生 HTML/CSS** | 无依赖、兼容性好 |

### 步骤 5：创建项目目录

创建原型项目目录结构：

```
{项目名称}-prototype/
├── index.html              # 首页/登录页
├── dashboard.html          # 仪表盘
├── pages/                  # 功能页面目录
├── styles/                 # 样式文件
├── router.js               # 路由逻辑
└── README.md               # 使用说明
```

### 步骤 6：生成页面内容

按页面规划逐个生成：

**每个页面包含**：
- 页面标题和头部
- 导航栏（支持页面跳转）
- 侧边栏菜单（如有）
- 主要内容区域
- 底部信息

**页面元素根据 PRD 功能生成**：
- 表格（数据列表）
- 表单（新增/编辑）
- 卡片（信息展示）
- 按钮（操作入口）
- 弹窗（确认/详情）

### 步骤 7：生成路由和导航

**导航栏**：
- 包含所有主要页面的链接
- 当前页面高亮

**页面跳转**：
- 按钮点击跳转
- 表单提交后跳转
- 返回列表/详情跳转

### 步骤 8：确认完成

输出完成信息：

```
✅ 原型已成功生成在：{项目名称}-prototype/

目录结构：
├── index.html          # 登录页
├── dashboard.html      # 仪表盘
├── pages/              # 功能页面
│   ├── user-management.html
│   └── ...
├── styles/             # 样式
└── README.md           # 说明

下一步：
使用 /prd-prototype preview 命令在浏览器中打开原型
```

## ⚠️ 格式要求

- 所有 HTML 文件使用 UTF-8 编码
- 页面之间跳转使用相对路径
- 外部资源使用 CDN 链接（如 Tailwind、Bootstrap）
- 确保所有链接有效，无 404 错误

## 技术栈模板选择

根据用户选择的技术栈，使用对应模板：

| 技术栈 | 模板文件 |
|--------|----------|
| HTML + Tailwind | `templates/html_tailwind.html` |
| React + shadcn/ui | `templates/react_shadcn.html` |
| Vue + Element Plus | `templates/vue_element.html` |
| 原生 HTML/CSS | `templates/native_html.html` |

## 注意事项

- 生成前先分析 PRD，确保页面覆盖所有功能模块
- 页面命名使用英文（kebab-case）
- 保持页面风格一致性
- 确保所有页面可以正常跳转
