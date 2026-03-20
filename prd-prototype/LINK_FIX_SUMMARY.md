# prd-prototype 链接路径修复优化

## 🐛 问题描述

用户在试验中发现：生成的原型页面中，登录页（index.html）和仪表盘（dashboard.html）位于根目录，其他功能页面位于 `pages/` 子目录中，导致页面间的跳转链接出现 404 错误。

**典型问题**：
1. 从 index.html 跳转到 pages 内的页面，路径错误
2. 从 pages 内的页面返回根目录页面，路径错误
3. 导航栏链接在所有页面中相同，但跨目录时失效

---

## ✅ 解决方案

### 1. 新增链接检查步骤

在 `commands/generate.md` 中新增 **步骤 9：检查和修复链接**

```markdown
### 步骤 9：检查和修复链接

生成完所有页面后，遍历检查每个 HTML 文件中的链接：

**检查清单**：
1. 导航栏链接路径是否正确
2. 按钮跳转链接是否正确
3. 表单提交后跳转链接是否正确
4. 返回列表/详情链接是否正确

**修复规则**：
| 当前页面位置 | 目标页面 | 正确链接 |
|-------------|---------|---------|
| 根目录 (index.html) | dashboard.html | `dashboard.html` |
| 根目录 (index.html) | pages/*.html | `pages/xxx.html` |
| pages/*.html | 根目录页面 | `../dashboard.html` |
| pages/*.html | pages/*.html | `xxx.html` (同级) |
```

### 2. 创建链接检查脚本

**文件**: `scripts/link_checker.js`

功能：
- 自动遍历所有 HTML 文件
- 提取 href 和 window.location 链接
- 根据目录结构自动修复路径
- 生成检查报告

使用方法：
```bash
node scripts/link_checker.js {prototype-dir}
```

### 3. 明确路径规则

在 `commands/generate.md` 中增加 **路径规则** 说明：

```markdown
**路径规则**：
```
根目录页面：index.html, dashboard.html
子目录页面：pages/*.html

链接规则：
- 根目录 → 根目录：直接文件名 (e.g., "dashboard.html")
- 根目录 → 子目录：加路径前缀 (e.g., "pages/user-management.html")
- 子目录 → 根目录：返回上层 (e.g., "../dashboard.html")
- 子目录 → 子目录：直接文件名 (e.g., "user-management.html")
```
```

### 4. 更新完成输出

在确认完成时，增加链接检查报告：

```
✅ 原型已成功生成在：{项目名称}-prototype/

目录结构：
├── index.html          # 登录页
├── dashboard.html      # 仪表盘
├── pages/              # 功能页面
│   ├── user-management.html
│   └── ...
├── styles/             # 样式
├── ui-config/          # UI 配置（如应用）
└── README.md           # 说明

链接检查：
✅ 已检查所有页面的链接跳转
✅ 已修复 X 处路径错误

下一步：
使用 /prd-prototype preview 命令在浏览器中打开原型
```

---

## 📝 修改的文件

| 文件 | 修改内容 |
|------|----------|
| `commands/generate.md` | 新增步骤 9：检查和修复链接、路径规则说明、常见问题 |
| `SKILL.md` | 添加 `scripts/link_checker.js` 到资源导航、执行流程增加链接检查步骤 |
| `UI_INTEGRATION.md` | 更新流程图为版本 2、新增链接检查说明 |
| `scripts/link_checker.js` | **新建** 链接检查脚本 |
| `LINK_FIX_SUMMARY.md` | **新建** 本总结文档 |

---

## 🎯 链接规则速查

### 目录结构
```
prototype/
├── index.html              # 根目录
├── dashboard.html          # 根目录
└── pages/                  # 子目录
    ├── user-management.html
    └── order-list.html
```

### 链接写法
| 从 | 到 | 链接写法 | 示例 |
|---|---|---------|------|
| 根目录 | 根目录 | 文件名 | `href="dashboard.html"` |
| 根目录 | 子目录 | `pages/` + 文件名 | `href="pages/user-management.html"` |
| 子目录 | 根目录 | `../` + 文件名 | `href="../dashboard.html"` |
| 子目录 | 子目录 | 文件名 | `href="order-list.html"` |

---

## 🧪 测试用例

### 测试场景 1：登录页跳转
```html
<!-- index.html (根目录) -->
<!-- 登录成功后跳转到仪表盘 -->
✅ 正确：window.location = 'dashboard.html'
❌ 错误：window.location = 'pages/dashboard.html'
```

### 测试场景 2：导航栏链接
```html
<!-- 在 pages/user-management.html 中 -->
<!-- 导航栏返回仪表盘 -->
✅ 正确：<a href="../dashboard.html">仪表盘</a>
❌ 错误：<a href="dashboard.html">仪表盘</a>
```

### 测试场景 3：返回列表
```html
<!-- 在 pages/order-detail.html 中 -->
<!-- 返回列表 -->
✅ 正确：<a href="order-list.html">返回列表</a>
❌ 错误：<a href="../pages/order-list.html">返回列表</a>
```

---

## 📊 修复效果

### 修复前
```
index.html → pages/user-management.html  ❌ 404
pages/user-management.html → dashboard.html  ❌ 404
```

### 修复后
```
index.html → pages/user-management.html  ✅ 正常
pages/user-management.html → ../dashboard.html  ✅ 正常
```

---

## 🔮 后续优化建议

1. **生成时直接修复**：在生成页面内容时就应用正确的路径规则，而不是生成后再修复
2. **配置化路径**：允许用户配置页面目录结构（如是否使用 pages/ 子目录）
3. **增强检查**：检查外部链接、图片资源路径等

---

*文档创建时间：2026-03-20*
