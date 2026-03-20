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

**⚠️ 重要原则**：
- **完整性优先**：PRD 中描述的每个功能界面都必须生成独立页面
- **禁止偷懒**：不得用文字弹窗（alert）代替实际界面
- **独立页面**：新增、编辑、详情、删除确认等都需要独立 UI

**页面规划示例**：
```
页面规划：
1. 登录页 (index.html)
   - 功能：用户登录
   - 跳转：登录成功 → 仪表盘
   - 元素：表单（用户名、密码、登录按钮）

2. 仪表盘 (dashboard.html)
   - 功能：数据概览、快捷入口
   - 跳转：各功能模块入口
   - 元素：统计卡片、快捷操作按钮

3. 用户管理 (pages/user-management.html)
   - 功能：用户列表、新增、编辑、删除
   - 跳转：返回列表、查看详情
   - 元素：表格、搜索框、操作按钮

4. 用户新增 (pages/user-add.html) ← 独立页面，不是弹窗
   - 功能：新增用户
   - 跳转：提交后返回列表
   - 元素：完整表单（所有必填字段）

5. 用户编辑 (pages/user-edit.html) ← 独立页面，不是弹窗
   - 功能：编辑用户信息
   - 跳转：提交后返回列表
   - 元素：完整表单（带默认值）

6. 用户详情 (pages/user-detail.html) ← 独立页面，不是弹窗
   - 功能：查看用户详细信息
   - 跳转：返回列表
   - 元素：信息展示卡片、操作按钮

7. 删除确认 (pages/user-delete.html) ← 独立确认页，不是 alert
   - 功能：确认删除操作
   - 跳转：确认后返回列表
   - 元素：确认提示、取消/确定按钮
```

**必须生成独立页面的场景**：
| PRD 中的界面 | 必须生成页面 | 禁止做法 |
|-------------|------------|---------|
| 新增 XX | 独立表单页 | ❌ 不能用 alert 代替 |
| 编辑 XX | 独立表单页 | ❌ 不能用 alert 代替 |
| 详情/查看 | 独立详情页 | ❌ 不能用 alert 代替 |
| 确认删除 | 独立确认页 | ❌ 不能用 confirm() 代替 |
| 设置/配置 | 独立设置页 | ❌ 不能用 alert 代替 |
| 筛选/过滤 | 独立筛选 UI | ❌ 不能用 prompt 代替 |

### 步骤 4：选择技术栈

询问用户选择原型技术栈：

| 选项 | 技术栈 | 特点 |
|------|--------|------|
| 1 | **HTML + Tailwind CSS** | 快速、轻量、无需构建 |
| 2 | **React + shadcn/ui** | 现代化、组件丰富 |
| 3 | **Vue + Element Plus** | 企业级、后台友好 |
| 4 | **原生 HTML/CSS** | 无依赖、兼容性好 |

### 步骤 5：选择 UI 规范（可选）

询问用户是否应用 UI 规范：

| 选项 | 规范 | 说明 |
|------|------|------|
| 1 | **众诚 UI 规范** | 应用中后台设计规范（颜色、间距、组件样式） |
| 2 | **不使用** | 使用技术栈默认样式 |

**众诚 UI 规范内容包括**：
- 颜色体系：品牌色 (#246FE5)、中性色、功能色
- 字体规范：6 级字阶、字重规范
- 间距规则：4px 倍数、预设间距
- 布局规范：顶部导航 47px、侧边栏 216px、页签 44px
- 组件样式：按钮、表格、表单、弹窗、卡片等
- 交互规范：加载、空状态、消息提示

> 💡 推荐选择：如果需要与企业级设计系统保持一致，选择众诚 UI 规范；如果是快速原型演示，可使用默认样式。

### 步骤 6：创建项目目录

创建原型项目目录结构：

```
{项目名称}-prototype/
├── index.html              # 首页/登录页
├── dashboard.html          # 仪表盘
├── pages/                  # 功能页面目录
├── styles/                 # 样式文件
├── router.js               # 路由逻辑
├── ui-config/              # UI 配置文件（如应用 UI 规范）
│   └── ui-preset.json      # UI 规范配置
└── README.md               # 使用说明
```

### 步骤 7：生成页面内容

按页面规划逐个生成：

**⚠️ 完整性要求（重要）**：
- **必须生成完整 UI**：每个页面必须有完整的 HTML 结构和视觉元素
- **禁止文字弹窗**：不得使用 alert()、confirm()、prompt() 代替界面
- **禁止占位文字**：不得使用"此处为表格"、"这里是表单"等占位描述
- **必须实际渲染**：所有元素必须实际渲染为 HTML，不能仅用文字说明

**每个页面必须包含**：
- 页面标题和头部
- 导航栏（支持页面跳转）
- 侧边栏菜单（如有）
- 主要内容区域（**完整 UI，不是占位文字**）
- 底部信息

**页面元素必须实际生成**：
| PRD 功能 | 必须生成的 UI | 禁止做法 |
|---------|-------------|---------|
| 数据列表 | 完整表格（表头 + 数据行 + 操作列） | ❌ 不能用文字"此处显示列表" |
| 搜索筛选 | 完整搜索框和筛选条件 | ❌ 不能用文字"此处可搜索" |
| 新增功能 | 完整表单（所有字段） | ❌ 不能用 alert("新增成功") |
| 编辑功能 | 完整表单（带默认值） | ❌ 不能用 prompt() |
| 删除功能 | 独立确认页面 | ❌ 不能用 confirm() |
| 详情查看 | 完整详情展示卡片 | ❌ 不能用 alert() 显示 |
| 数据统计 | 实际统计卡片/图表 | ❌ 不能用文字"统计数据显示" |
| 分页功能 | 完整分页控件 | ❌ 不能用文字"共 X 条" |

**表格必须包含的列**：
```html
<!-- 必须生成实际表格，包含示例数据 -->
<table>
  <thead>
    <tr>
      <th>序号</th>
      <th>名称</th>
      <th>状态</th>
      <th>操作</th>  <!-- 必须包含操作列 -->
    </tr>
  </thead>
  <tbody>
    <!-- 至少生成 3-5 条示例数据 -->
    <tr>
      <td>1</td>
      <td>示例数据 1</td>
      <td><span class="tag-success">正常</span></td>
      <td>
        <a href="xxx-edit.html">编辑</a>
        <a href="xxx-detail.html">查看</a>
        <a href="xxx-delete.html">删除</a>
      </td>
    </tr>
  </tbody>
</table>
```

**表单必须包含的元素**：
```html
<!-- 必须生成完整表单 -->
<form>
  <!-- 每个字段都必须有 label 和 input -->
  <div class="form-item">
    <label>字段名称 <span class="required">*</span></label>
    <input type="text" placeholder="请输入..." />
  </div>
  <!-- 至少 3-5 个字段（根据 PRD） -->
  <!-- 必须有提交和取消按钮 -->
  <div class="form-actions">
    <button type="submit">提交</button>
    <button type="reset">取消</button>
  </div>
</form>
```

**如应用了 UI 规范**：
- 使用规范中的颜色、字体、间距
- 组件样式遵循规范要求
- 布局尺寸符合要求（导航 47px、侧边栏 216px 等）

### 步骤 8：生成路由和导航

**导航栏**：
- 包含所有主要页面的链接
- 当前页面高亮

**页面跳转**：
- 按钮点击跳转
- 表单提交后跳转
- 返回列表/详情跳转

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

### 步骤 9：检查和修复链接

生成完所有页面后，遍历检查每个 HTML 文件中的链接：

**检查清单**：
1. 导航栏链接路径是否正确
2. 按钮跳转链接是否正确
3. 表单提交后跳转链接是否正确
4. 返回列表/详情链接是否正确

**修复规则**：
| 当前页面位置 | 目标页面 | 正确链接 |
|-------------|----------|---------|
| 根目录 (index.html) | dashboard.html | `dashboard.html` |
| 根目录 (index.html) | pages/*.html | `pages/xxx.html` |
| pages/*.html | 根目录页面 | `../dashboard.html` |
| pages/*.html | pages/*.html | `xxx.html` (同级) |

**检查方法**：
1. 遍历生成的所有 HTML 文件
2. 提取所有 `href` 和 `onclick`跳转链接
3. 验证目标文件是否存在
4. 修复路径错误的链接

### 步骤 10：检查界面完整性

**⚠️ 重要检查（必须执行）**：遍历所有 HTML 文件，检查是否有用弹窗代替界面的情况

**检查清单 - 禁止使用的内容**：
```javascript
// 发现以下代码需要修复为独立页面
❌ alert("新增成功")      → 应改为：跳转到新增成功页面或显示成功状态
❌ alert("删除成功")      → 应改为：跳转到列表页或显示成功消息
❌ confirm("确定删除？")  → 应改为：独立确认删除页面
❌ prompt("请输入")       → 应改为：独立表单页面
❌ window.location = "待开发.html" → 应改为：实际功能页面
```

**检查清单 - 必须有的内容**：
```html
// 每个功能页面必须有实际 UI
✅ 完整的表格结构（thead + tbody）
✅ 表格中至少有 3 条示例数据
✅ 表单必须有完整的 input 元素
✅ 操作按钮必须有实际跳转链接
✅ 状态必须用实际 UI 组件（标签、徽章等）
```

**检查清单 - 禁止的占位文字**：
```
❌ "此处显示表格数据"
❌ "这里是表单区域"
❌ "点击按钮跳转"
❌ "待开发/coming soon"
❌ "页面生成中..."
```

**修复方法**：
1. 发现 alert/confirm/prompt → 创建独立页面替换
2. 发现占位文字 → 生成实际 UI 组件
3. 发现"待开发"→ 生成完整功能页面
4. 发现示例数据不足 → 补充到至少 3 条

**完整性评分**：
- 每个 PRD 描述的功能都有对应页面：✅
- 每个页面都有完整 UI（不是占位文字）：✅
- 每个操作都有实际跳转（不是 alert）：✅
- 每个表格都有示例数据（至少 3 条）：✅

### 步骤 11：确认完成

输出完成信息：

```
✅ 原型已成功生成在：{项目名称}-prototype/

目录结构：
├── index.html          # 登录页
├── dashboard.html      # 仪表盘
├── pages/              # 功能页面
│   ├── user-management.html
│   ├── user-add.html       # 新增页面（独立页面，非 alert）
│   ├── user-edit.html      # 编辑页面（独立页面，非 prompt）
│   ├── user-detail.html    # 详情页面（独立页面，非 alert）
│   └── ...
├── styles/             # 样式
├── ui-config/          # UI 配置（如应用）
└── README.md           # 说明

质量检查：
✅ 已检查所有页面的链接跳转
✅ 已修复 X 处路径错误
✅ 已检查界面完整性（无 alert/confirm/prompt 代替界面）
✅ 已检查所有页面有完整 UI（无占位文字）
✅ 所有表格有示例数据（至少 3 条）

下一步：
使用 /prd-prototype preview 命令在浏览器中打开原型
```

## ⚠️ 格式要求

- 所有 HTML 文件使用 UTF-8 编码
- 页面之间跳转使用相对路径
- 外部资源使用 CDN 链接（如 Tailwind、Bootstrap）
- 确保所有链接有效，无 404 错误

## 技术栈模板选择

根据用户选择的技术栈和 UI 规范选项，使用对应模板：

### HTML + Tailwind CSS

| UI 规范选项 | 模板文件 | 说明 |
|------------|----------|------|
| 不使用 | `templates/html_tailwind.html` | 基础 Tailwind 样式 |
| 众诚 UI 规范 | `templates/html_tailwind_zhongcheng.html` | 应用众诚 UI 规范的设计 Token |

### 其他技术栈

| 技术栈 | 模板文件 | UI 规范支持 |
|--------|----------|------------|
| React + shadcn/ui | `templates/react_shadcn.html` | 待支持 |
| Vue + Element Plus | `templates/vue_element.html` | 待支持 |
| 原生 HTML/CSS | `templates/native_html.html` | 待支持 |

## UI 规范配置

如用户选择应用众诚 UI 规范：

### 配置步骤

1. 复制 `ui-presets/zhongcheng-ui.json` 到项目的 `ui-config/` 目录
2. 在生成页面时，读取配置文件，应用以下设计 Token：
   - 颜色变量（Tailwind config 扩展）
   - 字体大小和行高
   - 间距预设
   - 组件尺寸和样式

### Tailwind 配置示例

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#246FE5', hover: '#1F5CC1' },
        gray: {
          50: '#F7F9FA',
          100: '#F1F4F6',
          // ... 完整中性色板
        },
        success: { DEFAULT: '#3FBE72', bg: '#EBFFEB' },
        warning: { DEFAULT: '#FFB800', bg: '#FFFBE6' },
        error: { DEFAULT: '#F55047', bg: '#FFF5F5' }
      },
      height: {
        'top-nav': '47px',
        'sidebar-item': '56px',
        'table-row': '47px',
        'dialog-header': '56px',
        'dialog-footer': '56px'
      }
    }
  }
}
```

### 组件样式类（已预定义在模板中）

```css
/* 按钮 */
.btn-primary    - 主按钮
.btn-secondary  - 次要按钮
.btn-text       - 文字按钮
.btn-danger     - 警示按钮

/* 输入框 */
.input-base     - 基础输入框
.input-error    - 错误状态输入框

/* 表格 */
.table-zc       - 众诚风格表格

/* 卡片 */
.card-zc        - 众诚风格卡片

/* 标签 */
.tag-high       - 高优先级标签
.tag-success    - 成功标签
.tag-warning    - 警告标签
.tag-error      - 错误标签
.tag-low        - 低优先级标签
```

## 注意事项

### 页面路径规范

**目录结构**：
```
{项目名称}-prototype/
├── index.html              # 首页/登录页（根目录）
├── dashboard.html          # 仪表盘（根目录）
├── pages/                  # 功能页面目录
│   ├── user-management.html
│   ├── order-list.html
│   └── ...
```

**链接路径规则**：
| 当前页面 | 目标页面 | 链接写法 | 示例 |
|---------|---------|---------|------|
| 根目录 | 根目录 | 直接文件名 | `dashboard.html` |
| 根目录 | 子目录 | `pages/文件名` | `pages/user-management.html` |
| 子目录 | 根目录 | `../文件名` | `../dashboard.html` |
| 子目录 | 子目录 | 直接文件名 | `order-detail.html` |

### 生成后检查

- 生成前先分析 PRD，确保页面覆盖所有功能模块
- 页面命名使用英文（kebab-case）
- 保持页面风格一致性
- 确保所有页面可以正常跳转
- 应用 UI 规范时，确保设计 Token 正确注入到模板中
- **生成完成后检查所有链接路径，确保跨目录跳转正确**

### 常见问题

**问题：登录后跳转 404**
- 原因：index.html 在根目录，跳转到 pages/dashboard.html 应该是 dashboard.html
- 修复：根目录页面跳转不需要 `pages/` 前缀

**问题：pages 内页面返回按钮无效**
- 原因：从 pages/ 返回根目录需要用 `../`
- 修复：`href="../dashboard.html"` 而不是 `href="dashboard.html"`
